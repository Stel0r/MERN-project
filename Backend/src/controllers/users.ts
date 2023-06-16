import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user"
import bcrypt from 'bcrypt'



export const getAuthenticatedUser: RequestHandler = async (req,res,next) => {
    const authenticatedUser = req.session.userId

    try {
        if(!authenticatedUser){
            throw createHttpError(401,"user not authenticated")
        }
        const user = await userModel.findById(authenticatedUser).select("+email").exec()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}


interface signUpBody{
    username?:string,
    email?:string,
    password?:string
}

export const signUp:RequestHandler<unknown,unknown,signUpBody,unknown> = async (req,res,next) => {
    const {username,email,password:passwordRaw} = req.body

    try {
        if(!username || !email || !passwordRaw){
            throw createHttpError(400,"Paramenters Missing")
        }

        const existingUsername = await userModel.findOne({username: username}).exec()
        if(existingUsername){
            throw createHttpError(409,"Username Already Taken, use a different one")
        }
        
        const existingEmail = await userModel.findOne({email: email}).exec()
        if(existingEmail){
            throw createHttpError(409,"Account with Email Already in Use, use a different one")
        }

        const passwordHash = await bcrypt.hash(passwordRaw,10)

        const newUser = await userModel.create({
            username,
            email,
            password:passwordHash
        })

        req.session.userId = newUser._id

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

interface loginBody{
    username:string
    password:string
}

export const login:RequestHandler<unknown,unknown,loginBody,unknown> = async (req,res,next) => {
    const {username,password} = req.body

    try {
        if(!username||!password){
            throw createHttpError(400,"parameters missing")
        }

        const user = await userModel.findOne({username}).select("+password +email").exec()
        if(!user){
            throw createHttpError(401,"Invalid Credentials")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            throw createHttpError(401,"Invalid Credentials")
        }

        req.session.userId = user._id;
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

export const logout :RequestHandler = async(req,res,next) => {
    req.session.destroy(error => {
        if(error){
            next(error)
        }else{
            res.sendStatus(200)
        }
    })
}
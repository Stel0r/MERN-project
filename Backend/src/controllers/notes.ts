import { RequestHandler } from "express"
import NoteModel from "../models/note"
import createHttpError from "http-errors"
import mongoose from "mongoose"


export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec()
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

export const getNote: RequestHandler = async(req,res,next) =>{
    const id = req.params.noteId
    
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400,"el ID es invalido")
        }
        const note = await NoteModel.findById(id).exec();
        if(!note){
            throw createHttpError(404,"no se ha encontrado una nota con ese ID")
        }
        res.status(200).json(note)
    } catch (error) {
        next(error)
    }
}

interface CreateNoteBody{
    title?:string,
    description?:string,
}

export const createNote: RequestHandler<unknown,unknown,CreateNoteBody,unknown> = async (req, res, next) => {

    const title = req.body.title
    const description = req.body.description
    try {
        if(!title || title.trim() === ""){
            throw createHttpError(400,"No se ha proveido un Titulo")
        }
        const newNote = await NoteModel.create({
            title,
            description,
        })
        res.status(201).json(newNote)
    } catch (error) {   
        next(error)
    }
}

interface UpdateNoteParams{
    noteId:string
}

interface UpdateNoteBody{
    title?:string,
    description?:string
}

export const updateNote : RequestHandler<UpdateNoteParams,unknown,UpdateNoteBody,unknown> = async (req,res,next) =>{
    const id = req.params.noteId
    const title = req.body.title
    const description = req.body.description
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400,"el ID es invalido")
        }
        
        if(!title || title.trim() === ""){
            throw createHttpError(400,"No se ha proveido un Titulo")
        }

        const note = await NoteModel.findById(id).exec();
        if(!note){
            throw createHttpError(404,"no se ha encontrado una nota con ese ID")
        }
        
        note.title = title
        note.description = description
        const updatedNote = await note.save()
        res.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
}

export const deleteNote: RequestHandler = async (req,res,next) => {
    const id = req.params.noteId;
    try {
        if(!mongoose.isValidObjectId(id)){
            throw createHttpError(400,"el ID es invalido")
        }
        const note = await NoteModel.findById(id)
        if(!note){
            throw createHttpError(404,"Nota no Encontrada")
        }

        await note.deleteOne()
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}
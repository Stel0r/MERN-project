import { ConflictError, UnoathorizedError } from "../errors/http.errors"
import { Note } from "../models/note"
import { User } from "../models/user"

async function fetchData(input:RequestInfo,init?:RequestInit){
    const response = await fetch(input,init)
    if(response.ok){
        return response
    }else{
        const errorBody  = await response.json()
        const errorMessage = errorBody.error

        if(response.status === 401){
            throw new UnoathorizedError(errorMessage)
        }else if(response.status === 409){
            throw new ConflictError(errorMessage)
        }else{throw Error("request failed with status: "+response.status+ " message:"+errorMessage)}

        
    }
    
}

export async function getLoggedUser():Promise<User> {
    const user = await fetchData("/API/users",{method:"GET"})
    return user.json()
}

export interface SignUpCredentials{
    username:string,
    email:string,
    password:string,
}

export async function signUp(credentials:SignUpCredentials) : Promise<User> {
    const response = await fetchData("/API/users/signup",
    {
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(credentials)
    })
    return response.json()
}

export interface loginCredentials{
    username:string,
    password:string,
}

export async function login(credentials:loginCredentials) {
    const response = await fetchData("/API/users/login",
    {
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(credentials)
    })
    return response.json()
}

export async function logout() {
    await fetchData("/API/users/logout",{method:"POST"})
}

export async function fetchNotes():Promise<Note[]> {
    const notesResponse = await fetchData("/API/notes", { method: "GET" })
    return notesResponse.json()
}

export interface NoteImport{
    title:string,
    description?:string
}

export async function createNote(note:NoteImport) : Promise<Note>{
    const response = await fetchData("API/notes", 
    {
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(note)
    })
    return response.json()
}

export async function updateNote(noteId:string, noteInput:NoteImport):Promise<Note> {
    const response = await fetchData("/API/notes/"+noteId,
    {
        method:"PATCH",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(noteInput)
    })
    return response.json()
}

export async function deleteNote(noteId:string){
    await fetchData("/API/notes/"+noteId,{method:"DELETE"});
}
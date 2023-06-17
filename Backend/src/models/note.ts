import { ObjectId } from "bson";
import { InferSchemaType, Schema, model } from "mongoose";

const noteSchema = new Schema({
    userId:{type:ObjectId,required:true},
    title:{type:String,required:true},
    description:{type:String},
},{timestamps:true})

type Note = InferSchemaType<typeof noteSchema>

export default model<Note>("Note",noteSchema)
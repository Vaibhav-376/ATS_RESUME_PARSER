import { timeStamp } from "console";
import mongoose from "mongoose";
const resumeSchema = mongoose.Schema({
    id: String,
    content: Object,
}, { timeStamp: true })

export const Resumes = mongoose.model('Resumes', resumeSchema);
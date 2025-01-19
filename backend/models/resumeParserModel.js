import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  id: { type: String, required: false },
  content: { type: Object, required: true },
  fullResponse: { type: Object, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }, 
});

export const Resumes = mongoose.model("Resume", resumeSchema);

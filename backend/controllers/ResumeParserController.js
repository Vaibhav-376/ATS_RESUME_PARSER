import FormData from 'form-data';
import { Resumes } from '../models/resumeParserModel.js';
import axios from 'axios';
import mongoose from 'mongoose';


export const uploadingResume = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedFile = req.files.file;
    const formData = new FormData();
    formData.append("file", uploadedFile.data, {
      filename: uploadedFile.name,
      contentType: uploadedFile.mimetype,
    });

    formData.append("providers", "affinda");

    const url = process.env.API_URL;
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        ...formData.getHeaders(),
      },
    });

    const apiResult = response.data;
    const userId = new mongoose.Types.ObjectId(req.user.id);  

    const savedResume = await Resumes.create({
      id: apiResult.affinda?.extracted_data?.id || null,
      content: apiResult.affinda?.extracted_data || null,
      fullResponse: apiResult,
      userId, 
    });

    return res.status(200).json({
      message: "File uploaded and processed successfully",
      savedResume,
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};



export const getResume = async (req, res) => {
  try {
    const resumes = await Resumes.find({ userId: req.user.id });  // Filter by userId

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({ error: "No resumes found for this user" });
    }

    res.status(200).json({
      message: "Resumes fetched successfully",
      data: resumes,
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
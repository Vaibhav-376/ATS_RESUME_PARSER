import fetch from 'node-fetch';
import FormData from 'form-data';
import { Resumes } from '../models/resumeParserModel.js';

export const uploadingResume = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const uploadedFile = req.files.file;

        const formData = new FormData();
        formData.append('Resume', uploadedFile.data, uploadedFile.name);

        const url = process.env.API_URL;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                ...formData.getHeaders(),
                "Authorization": process.env.API_KEY,
            },
            body: formData
        });

        const apiResult = await response.json();
        if (!response.ok) {
            throw new Error(apiResult.error || 'External API error');
        }

        const savedResume = await Resumes.create({
            id: apiResult.id,
            content: apiResult.content,
        });

        return res.status(200).json({
            message: 'File uploaded and processed successfully',
            savedResume,
        });
    } catch (error) {
        console.error('Error in uploadingResume:', error);
        return res.status(500).json({ error: error.message });
    }
};

export const getResume = async (req, res) => {
    try {
        const resumes = await Resumes.find({}, 'id');
        if (!resumes || resumes.length === 0) {
            return res.status(404).json({ error: "No resumes found in the database" });
        }

        const apiUrl = process.env.API_URL;
        const apiKey = process.env.API_KEY;

        const executionResults = await Promise.all(
            resumes.map(async (resume) => {
                const url = `${apiUrl}${resume.id}/`;
                try {
                    const response = await fetch(url, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": apiKey,
                        },
                    });

                    const result = await response.json();
                    return { id: resume._id, data: result };

                } catch (error) {
                    console.error(`Error fetching data for resume ID ${resume._id}:`, error);
                    return { id: resume._id, error: error.message };
                }
            })
        );

        const extractedData = executionResults.map((result) => {
            if (result.error) {
                return { id: result.id, error: result.error };
            }
            const extracted = result.data?.content?.results?.output?.results?.map(el => el.extracted_data.personal_infos);
            return { id: result.id, extractedData: extracted || [] };
        });

        res.status(200).json({ message: "Data fetched successfully", data: extractedData });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

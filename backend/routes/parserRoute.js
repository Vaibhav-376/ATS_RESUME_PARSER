import express from 'express';
const router = express.Router();
import { uploadingResume ,getResume } from '../controllers/ResumeParserController.js';

router.route('/upload').post(uploadingResume);
router.route('/resume').get(getResume);

export default router;
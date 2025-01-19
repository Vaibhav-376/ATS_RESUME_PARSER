import express from 'express';
const router = express.Router();
import { uploadingResume ,getResume } from '../controllers/ResumeParserController.js';
import { authenticateUser } from '../middleware/authenticate.js';

router.route('/upload').post(authenticateUser,uploadingResume);
router.route('/resume').get(authenticateUser,getResume);

export default router;
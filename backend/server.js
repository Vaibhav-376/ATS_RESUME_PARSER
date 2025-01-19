import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import parsingRoute from './routes/parserRoute.js';
import ConnectDB from './db/conn.js';
import path from 'path';
import dotenv from 'dotenv';
import UserRoute from "./routes/UserRoutes.js"
import cookieParser from 'cookie-parser';

dotenv.config();
ConnectDB()

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

app.use(cors({
    origin: "https://ats-resume-parser.onrender.com", 
    credentials: true, 
  })); 
app.use(express.json());
app.use(fileUpload()); 
app.use('/api',parsingRoute);
app.use('/api',UserRoute);

const dirPath = path.resolve();
app.use('/resume-data', express.static(path.join(dirPath, 'public')));

app.use(express.static(path.join(dirPath,'/frontend/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirPath,'frontend','dist','index.html'))
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

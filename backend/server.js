import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import parsingRoute from './routes/parserRoute.js';
import ConnectDB from './db/conn.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
ConnectDB()

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors()); 
app.use(express.json());
app.use(fileUpload()); 
app.use('/api',parsingRoute);

const dirPath = path.resolve();
app.use('/resume-data', express.static(path.join(dirPath, 'public')));

app.use(express.static(path.join(dirPath,'/frontend/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(dirPath,'frontend','dist','index.html'))
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

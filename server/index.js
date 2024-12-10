import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { apiRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express()
const port = 3000
connectDB();

app.use(express.json());
app.use(cors({

  origin:["http://localhost:5173",'https://foodorderwebsitedelicazy.netlify.app'],

 credentials:true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS','PATCH'],
  allowedHeaders: "Content-Type, Authorization",
   
}));
 
 app.options('*', cors({
  origin: ["http://localhost:5173", "https://foodorderwebsitedelicazy.netlify.app"],
  credentials: true
})); 



app.use(cookieParser());
app.get('/', (req, res,next) => {
  res.send('Hello World!');
 })

app.use('/api',apiRouter);



 app.use((err, req, res, next) => {
 res.setHeader("Access-Control-Allow-Origin", "https://foodorderwebsitedelicazy.netlify.app");

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
}); 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

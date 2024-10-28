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

 // origin:["http://localhost:5173",'https://foodorderwebsitedelicazy.netlify.app'],

  origin: 'https://foodorderwebsitedelicazy.netlify.app',

  credentials:true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization']
}));
 
/* app.options('*', (req, res) => {
    res.sendStatus(200);
}); */



app.use(cookieParser());
app.get('/', (req, res,next) => {
  res.send('Hello World!');
 })

app.use('/api',apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { apiRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express()
const port = 3000
connectDB();

app.get('/', (req, res,next) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use(cors({
  origin:["http://localhost:5173",'https://fooddeliveryclient-kw4hu6epr-sreelekshmi-unnikrishnans-projects.vercel'],
  methods: ['GET','POST','PUT','DELETE'],
  credentials:true
}));
app.use(cookieParser());

app.use('/api',apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
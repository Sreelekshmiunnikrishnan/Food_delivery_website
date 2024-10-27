import express from 'express';
import mongoose, { trusted } from 'mongoose';
import { connectDB } from './config/db.js';
import { apiRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express()
const port = 3000
connectDB();

app.use(express.json());
app.use(cors({
  origin:["https://food-delivery-website-client.vercel.app","http://localhost:5173",],
  credentials:true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
}));




app.use(cookieParser());
app.get('/', (req, res,next) => {
  res.send('Hello World!');
 })

app.use('/api',apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

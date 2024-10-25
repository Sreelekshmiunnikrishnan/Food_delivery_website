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
  origin:["http://localhost:5173",'https://food-delivery-website-client.vercel.app'],
  methods: ['GET','POST','PUT','DELETE'],
  credentials:true,
  allowedHeaders:['Content-type'],
}));
app.use(cookieParser());
app.get('/', (req, res,next) => {
  res.send('Hello World!');
  res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
 
})


app.use('/api',apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

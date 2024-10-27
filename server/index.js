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
  origin:["http://localhost:5173",'https://food-delivery-website-client.vercel.app'],
   credentials:true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
}));

app.use((req, res, next) => {
  const allowedOrigins = ['https://food-delivery-website-client.vercel.app']; // Add allowed origins here
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
  }
  
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use(cookieParser());
app.get('/', (req, res,next) => {
  res.send('Hello World!');
 })

app.use('/api',apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

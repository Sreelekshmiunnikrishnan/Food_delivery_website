import express from 'express';
import mongoose from 'mongoose';
//import { connectDB } from './config/db.js';
const app = express()
const port = 3000
//connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import cors from 'cors'
import morgan from 'morgan';
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import 'express-async-errors';
import jobRoutes from './routes/job.js'
import authRoutes from './routes/auth.js'

import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleWare from "./middleware/not-found.js";
import authenticateUser from './middleware/auth.js'
import connectDb from "./db/connect.js";

app.use(express.json())
app.use(cors())
console.log('hello');
console.log('hello');
console.log('hello');
console.log('hello');
console.log('hello');
app.get('/', (req,res) => {
  res.json({msg: 'hello world'})
})
app.use('/api/v1/auth' ,authRoutes)
app.use('/api/v1/jobs', authenticateUser , jobRoutes)
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleWare);

if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(5000 || process.env.PORT);
  } catch (err) {
    console.log(err);
  }
};
start()
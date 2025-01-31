import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import { ApiError } from './utils/ApiError.js'
import { ApiResponse } from './utils/ApiResponse.js'
const app = express();
const corsOptions = {
    credentials: true,
    origin: process.env.CORS_ORIGIN, // Replace with your client app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
  };
app.use(cors(corsOptions))
app.use(express.json({limit: '50kb'}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

import userRouter from './routes/user.routes.js'
//routes declaration
app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
      res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
  } else {
      res.status(500).json(new ApiResponse(500, null, 'Internal Server Error'));
  }
});


export {app}
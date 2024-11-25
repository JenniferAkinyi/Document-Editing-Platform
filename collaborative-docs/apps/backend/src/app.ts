import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import dotenv from 'dotenv';
import userRouter from './routes/user.router'
import documentRouter from './routes/document.router'
import commentRouter from './routes/comment.router';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || "defaultSecretKey"));

app.use("/users", userRouter)
app.use("/documents", documentRouter)
app.use("/comments", commentRouter)

export default app;
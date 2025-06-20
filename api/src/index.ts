// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http'
import cookieParser from 'cookie-parser';
import { startJobs } from './jobs/startJobs';
import appRoutes from './routes';
import { connectDB } from './config/mongoose';
import initSocket from './sockets'
import { auth } from './middleware/auth';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

app.use(cookieParser());

app.use(auth)

app.use('/api', appRoutes);

const startServer = async () => {
  try {
    await connectDB();
    startJobs();

    const httpServer = http.createServer(app)
    initSocket(httpServer)
 
    httpServer.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err);
  }
};

startServer();

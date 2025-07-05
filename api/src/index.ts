// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http'
import cookieParser from 'cookie-parser';
import cluster from 'cluster';
import os from 'os'
import { rateLimit } from 'express-rate-limit'
import appRoutes from './routes';
import { connectDB } from './config/mongoose';
import initSocket from './sockets'
import { auth } from './middleware/auth';

const NUM_CPUS = os.cpus().length;

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

app.use(cookieParser());

app.use(auth)

app.use('/api', appRoutes);

const startServer = async () => {
  try {
    await connectDB();
    // startJobs();

    const httpServer = http.createServer(app)
    initSocket(httpServer)
 
    httpServer.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err);
  }
};


if (cluster.isPrimary && false) {
  // ── MASTER PROCESS ──────────────────────────────────────
  console.log('Master PID', process.pid, '| forking', NUM_CPUS, 'workers');

  for (let i = 0; i < NUM_CPUS; i++) cluster.fork();

  // optional: log when a worker exits
  cluster.on('exit', (worker, code) =>
    console.log(`Worker ${worker.process.pid} died (code ${code})`)
  );

} else {
  // ── WORKER PROCESS ──────────────────────────────────────
  startServer().catch(err => {
    console.error('❌ Worker failed to start:', err);
    process.exit(1);
  });
}
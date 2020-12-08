import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Express } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import ormConfig from './ormConfig';
import trim from './middleware/trim';
import auth from './middleware/auth';
import userRoutes from './routes/user';
import momentRoutes from './routes/moment';
import likeRoutes from './routes/like';

const app: Express = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(trim);
app.use('/api/auth', userRoutes);
app.use('/api/snapshots', auth, momentRoutes, likeRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Server running on ${process.env.PORT}.`);
  try {
    await createConnection(ormConfig);
    console.log('DB connected.');
  } catch (err) {
    console.log(err);
  }
});

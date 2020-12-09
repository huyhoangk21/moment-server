import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Express } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import ormConfig from './ormConfig';
import trim from './middleware/trim';
import auth from './middleware/auth';
import userRoutes from './routes/user';
import momentRoutes from './routes/moment';
import likeRoutes from './routes/like';
import { Server } from 'http';

const app: Express = express();

const http: Server = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('socketio', io);
app.use(trim);
app.use('/api/auth', userRoutes);
app.use('/api/moments', auth, momentRoutes, likeRoutes);

http.listen(process.env.PORT, async () => {
  console.log(`Server running on ${process.env.PORT}.`);
  try {
    await createConnection(ormConfig);
    console.log('DB connected.');
  } catch (err) {
    console.log(err);
  }
});

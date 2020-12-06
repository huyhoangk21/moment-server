import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Express } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import ormConfig from './ormConfig';
import trim from './middleware/trim';
import creatorRoutes from './routes/creator';

const app: Express = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(trim);
app.use('/api/auth', creatorRoutes);

app.listen(process.env.PORT, async () => {
  console.log(`Server running on ${process.env.PORT}.`);
  try {
    await createConnection(ormConfig);
    console.log('DB connected.');
  } catch (err) {
    console.log(err);
  }
});

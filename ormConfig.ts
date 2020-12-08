import { ConnectionOptions } from 'typeorm';
import { User } from './entity/User';
import { Moment } from './entity/Moment';
import { Like } from './entity/Like';

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'moment',
  synchronize: true,
  logging: false,
  entities: [User, Moment, Like],
  migrations: ['../migration/*.ts'],
  cli: {
    entitiesDir: '../entity',
    migrationsDir: '../migration',
  },
} as ConnectionOptions;

import { ConnectionOptions } from 'typeorm';
import { Creator } from './entity/Creator';
import { Snapshot } from './entity/Snapshot';

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'snapshot',
  synchronize: true,
  logging: false,
  entities: [Creator, Snapshot],
  migrations: ['../migration/*.ts'],
  cli: {
    entitiesDir: '../entity',
    migrationsDir: '../migration',
  },
} as ConnectionOptions;

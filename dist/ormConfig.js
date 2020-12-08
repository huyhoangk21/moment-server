"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./entity/User");
const Moment_1 = require("./entity/Moment");
const Like_1 = require("./entity/Like");
exports.default = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'moment',
    synchronize: true,
    logging: false,
    entities: [User_1.User, Moment_1.Moment, Like_1.Like],
    migrations: ['../migration/*.ts'],
    cli: {
        entitiesDir: '../entity',
        migrationsDir: '../migration',
    },
};
//# sourceMappingURL=ormConfig.js.map
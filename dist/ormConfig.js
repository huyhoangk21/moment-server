"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Creator_1 = require("./entity/Creator");
const Snapshot_1 = require("./entity/Snapshot");
exports.default = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'snapshot',
    synchronize: true,
    logging: false,
    entities: [Creator_1.Creator, Snapshot_1.Snapshot],
    migrations: ['../migration/*.ts'],
    cli: {
        entitiesDir: '../entity',
        migrationsDir: '../migration',
    },
};
//# sourceMappingURL=ormConfig.js.map
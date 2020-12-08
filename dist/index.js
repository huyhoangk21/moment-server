"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const ormConfig_1 = __importDefault(require("./ormConfig"));
const trim_1 = __importDefault(require("./middleware/trim"));
const auth_1 = __importDefault(require("./middleware/auth"));
const user_1 = __importDefault(require("./routes/user"));
const moment_1 = __importDefault(require("./routes/moment"));
const like_1 = __importDefault(require("./routes/like"));
const app = express_1.default();
app.use(cors_1.default({ origin: 'http://localhost:3000', credentials: true }));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use(trim_1.default);
app.use('/api/auth', user_1.default);
app.use('/api/snapshots', auth_1.default, moment_1.default, like_1.default);
app.listen(process.env.PORT, async () => {
    console.log(`Server running on ${process.env.PORT}.`);
    try {
        await typeorm_1.createConnection(ormConfig_1.default);
        console.log('DB connected.');
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=index.js.map
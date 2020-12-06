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
require("dotenv/config");
const ormConfig_1 = __importDefault(require("./ormConfig"));
const trim_1 = __importDefault(require("./middleware/trim"));
const creator_1 = __importDefault(require("./routes/creator"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use(trim_1.default);
app.use('/api/auth', creator_1.default);
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
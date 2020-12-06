"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Creator_1 = require("../entity/Creator");
exports.default = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            throw new Error('Unauthenticated');
        const { creator_name } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const creator = await Creator_1.Creator.findOne({
            creator_name,
        });
        if (!creator)
            throw new Error('Unauthenticated');
        res.locals.creator = creator;
        next();
    }
    catch (err) {
        return res.status(401).json({ errors: err.message });
    }
};
//# sourceMappingURL=auth.js.map
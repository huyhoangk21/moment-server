"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entity/User");
exports.default = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            throw new Error('Unauthenticated');
        const { username } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findOne({
            username,
        });
        if (!user)
            throw new Error('Unauthenticated');
        res.locals.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ errors: err.message });
    }
};
//# sourceMappingURL=auth.js.map
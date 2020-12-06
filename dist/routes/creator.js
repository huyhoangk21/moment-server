"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const class_validator_1 = require("class-validator");
const auth_1 = __importDefault(require("../middleware/auth"));
const Creator_1 = require("../entity/Creator");
const register = async (req, res) => {
    try {
        let errors = {};
        const { creator_name, email, password } = req.body;
        const creatorByName = await Creator_1.Creator.findOne({
            creator_name,
        });
        const creatorByEmail = await Creator_1.Creator.findOne({
            email,
        });
        if (creatorByName)
            errors.creator_name = 'Creator name is already taken';
        if (creatorByEmail)
            errors.email = 'Email is already taken';
        if (Object.keys(errors).length > 0)
            return res.status(400).json({ errors });
        const creator = new Creator_1.Creator({ creator_name, email, password });
        errors = await class_validator_1.validate(creator);
        if (errors.length > 0)
            return res.status(400).json({ errors });
        await creator.save();
        return res.status(200).json({ creator });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: err });
    }
};
const login = async (req, res) => {
    try {
        const { creator_name, email, password } = req.body;
        let creator;
        if (creator_name) {
            creator = await Creator_1.Creator.findOne({ creator_name });
        }
        if (email) {
            creator = await Creator_1.Creator.findOne({ email });
        }
        if (!creator)
            return res.status(400).json({ errors: 'Incorrect username or password' });
        if (!creator.matchPassword(password))
            return res.status(400).json({ errors: 'Incorrect username or password' });
        const token = jsonwebtoken_1.default.sign({ creator_name: creator.creator_name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            path: '/',
        };
        res.set('Set-Cookie', cookie_1.default.serialize('token', token, cookieOptions));
        return res.status(200).json(creator);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const me = (_, res) => {
    return res.status(200).json(res.locals.creator);
};
const logout = async (_, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        expires: new Date(0),
        path: '/',
    };
    res.set('Set-Cookie', cookie_1.default.serialize('token', '', cookieOptions));
    return res.status(200).json({ success: true });
};
const router = express_1.default.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth_1.default, me);
router.get('/logout', auth_1.default, logout);
exports.default = router;
//# sourceMappingURL=creator.js.map
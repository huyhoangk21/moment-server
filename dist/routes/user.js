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
const User_1 = require("../entity/User");
const register = async (req, res) => {
    try {
        let errors = {};
        const { username, email, password } = req.body;
        const userByName = await User_1.User.findOne({
            username,
        });
        const userByEmail = await User_1.User.findOne({
            email,
        });
        if (userByName)
            errors.username = 'Username is already taken';
        if (userByEmail)
            errors.email = 'Email is already taken';
        if (Object.keys(errors).length > 0)
            return res.status(400).json({ errors });
        const user = new User_1.User({
            username,
            email,
            password,
        });
        errors = await class_validator_1.validate(user);
        if (errors.length > 0)
            return res.status(400).json({ errors });
        await user.save();
        return res.status(200).json({ user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user)
            return res.status(400).json({ errors: 'Incorrect username or password' });
        if (!user.matchPassword(password))
            return res.status(400).json({ errors: 'Incorrect username or password' });
        const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            path: '/',
        };
        res.set('Set-Cookie', cookie_1.default.serialize('token', token, cookieOptions));
        return res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const me = (_, res) => {
    return res.status(200).json(res.locals.user);
};
const logout = (_, res) => {
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
//# sourceMappingURL=user.js.map
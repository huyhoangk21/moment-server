"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const io_1 = __importDefault(require("../middleware/io"));
const User_1 = require("../entity/User");
const Moment_1 = require("../entity/Moment");
const typeorm_1 = require("typeorm");
const getAllMoments = async (req, res) => {
    try {
        const allMoments = await Moment_1.Moment.find({
            relations: ['user', 'likes', 'likes.user'],
        });
        return res.status(200).json(allMoments);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const getMomentsByUser = async (req, res) => {
    try {
        const { username } = req.params;
        const users = await User_1.User.find({
            where: {
                username: typeorm_1.Like(`%${username}%`),
            },
        });
        const userIds = users.map(user => user.user_id);
        if (!users)
            return res.status(400).json({ errors: 'User is not found' });
        const moments = await Moment_1.Moment.find({
            where: { user: typeorm_1.In(userIds) },
            relations: ['user', 'likes', 'likes.user'],
        });
        return res.status(200).json(moments);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const addMoment = async (req, res) => {
    try {
        let errors = {};
        const { title, description, selected_file } = req.body;
        if (!title)
            errors.title = 'Title must not be empty';
        if (!description)
            errors.description = 'Description must not be empty';
        if (!selected_file)
            errors.selected_file = 'Selected file must not be empty';
        if (Object.keys(errors).length > 0)
            return res.status(400).json({ errors });
        const user = res.locals.user;
        const moment = new Moment_1.Moment({
            title,
            description,
            selected_file,
            user,
        });
        await moment.save();
        return res.status(200).json(moment);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const deleteMoment = async (req, res) => {
    try {
        const { moment_id } = req.params;
        const moment = await Moment_1.Moment.findOne(moment_id, {
            relations: ['user'],
        });
        if (!moment)
            return res.status(400).json({ errors: 'Moment is not found' });
        const user = res.locals.user;
        if (moment.user.user_id !== user.user_id)
            return res.status(403).json({ errors: 'Unauthorized' });
        await Moment_1.Moment.delete(moment_id);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const router = express_1.default();
router.get('/', getAllMoments);
router.get('/users/:username', getMomentsByUser);
router.post('/', io_1.default, addMoment);
router.delete('/:moment_id', io_1.default, deleteMoment);
exports.default = router;
//# sourceMappingURL=moment.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const io_1 = __importDefault(require("../middleware/io"));
const Like_1 = require("../entity/Like");
const Moment_1 = require("../entity/Moment");
const like = async (req, res) => {
    try {
        const user = res.locals.user;
        const { moment_id } = req.params;
        const moment = await Moment_1.Moment.findOne(moment_id);
        if (!moment)
            return res.status(400).json({ errors: 'Moment is not found' });
        let like = await Like_1.Like.findOne({ user, moment }, { relations: ['user', 'moment'] });
        if (like)
            return res.status(400).json({ errors: 'Moment is already liked' });
        like = new Like_1.Like({ user, moment });
        await like.save();
        return res.status(200).json(like);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const unlike = async (req, res) => {
    try {
        const user = res.locals.user;
        const { moment_id } = req.params;
        const moment = await Moment_1.Moment.findOne(moment_id);
        if (!moment)
            return res.status(400).json({ errors: 'Moment is not found' });
        let like = await Like_1.Like.findOne({ user, moment }, { relations: ['user', 'moment'] });
        if (!like)
            return res.status(400).json({ errors: 'Moment has not been liked' });
        await Like_1.Like.delete(like.like_id);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const router = express_1.default.Router();
router.post('/:moment_id/like', io_1.default, like);
router.post('/:moment_id/unlike', io_1.default, unlike);
exports.default = router;
//# sourceMappingURL=like.js.map
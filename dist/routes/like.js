"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Like_1 = require("../entity/Like");
const Snapshot_1 = require("../entity/Snapshot");
const like = async (req, res) => {
    try {
        const creator = res.locals.creator;
        const { snapshot_id } = req.params;
        const snapshot = await Snapshot_1.Snapshot.findOne(snapshot_id);
        if (!snapshot)
            return res.status(400).json({ errors: 'Snapshot is not found' });
        let like = await Like_1.Like.findOne({ creator, snapshot }, { relations: ['creator', 'snapshot'] });
        if (like)
            return res.status(400).json({ errors: 'Snapshot is already liked' });
        like = new Like_1.Like({ creator, snapshot });
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
        const creator = res.locals.creator;
        const { snapshot_id } = req.params;
        const snapshot = await Snapshot_1.Snapshot.findOne(snapshot_id);
        if (!snapshot)
            return res.status(400).json({ errors: 'Snapshot is not found' });
        let like = await Like_1.Like.findOne({ creator, snapshot }, { relations: ['creator', 'snapshot'] });
        if (!like)
            return res.status(400).json({ errors: 'Snapshot has not been liked' });
        await Like_1.Like.delete(like.like_id);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const router = express_1.default.Router();
router.post('/:snapshot_id/like', like);
router.delete('/:snapshot_id/like', unlike);
exports.default = router;
//# sourceMappingURL=like.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Creator_1 = require("../entity/Creator");
const Snapshot_1 = require("../entity/Snapshot");
const getAllSnapshots = async (_, res) => {
    try {
        const allSnapshots = await Snapshot_1.Snapshot.find({
            relations: ['creator', 'likes', 'likes.creator'],
        });
        return res.status(200).json(allSnapshots);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const getSnapshotsByCreator = async (req, res) => {
    try {
        const { creator_id } = req.params;
        const creator = await Creator_1.Creator.findOne(creator_id);
        if (!creator)
            return res.status(400).json({ errors: 'Creator is not found' });
        const snapshots = await Snapshot_1.Snapshot.find({
            where: { creator },
            relations: ['creator', 'likes', 'likes.creator'],
        });
        return res.status(200).json(snapshots);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const addSnapshot = async (req, res) => {
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
        const creator = res.locals.creator;
        const snapshot = new Snapshot_1.Snapshot({
            title,
            description,
            selected_file,
            creator,
        });
        await snapshot.save();
        return res.status(200).json(snapshot);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const deleteSnapshot = async (req, res) => {
    try {
        const { snapshot_id } = req.params;
        const snapshot = await Snapshot_1.Snapshot.findOne(snapshot_id, {
            relations: ['creator'],
        });
        if (!snapshot)
            return res.status(400).json({ errors: 'Snapshot is not found' });
        const creator = res.locals.creator;
        if (snapshot.creator.creator_id !== creator.creator_id)
            return res.status(403).json({ errors: 'Unauthorized' });
        await Snapshot_1.Snapshot.delete(snapshot_id);
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: 'Server side error' });
    }
};
const router = express_1.default();
router.get('/', getAllSnapshots);
router.get('/creators/:creator_id', getSnapshotsByCreator);
router.post('/', addSnapshot);
router.delete('/:snapshot_id', deleteSnapshot);
exports.default = router;
//# sourceMappingURL=snapshot.js.map
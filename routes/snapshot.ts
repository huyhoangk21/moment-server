import express, { Router, Request, Response } from 'express';
import { Creator } from '../entity/Creator';
import { Snapshot } from '../entity/Snapshot';

const getAllSnapshots = async (_: Request, res: Response): Promise<any> => {
  try {
    const allSnapshots = await Snapshot.find();
    return res.status(200).json(allSnapshots);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const getSnapshotsByCreator = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { creator_id }: any = req.params;
    const creator: Creator | undefined = await Creator.findOne(creator_id);
    if (!creator)
      return res.status(400).json({ errors: 'Creator is not found' });
    const snapshots = await Snapshot.find({
      where: { creator },
      relations: ['creator'],
    });
    return res.status(200).json(snapshots);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const addSnapshot = async (req: Request, res: Response): Promise<any> => {
  try {
    let errors: any = {};
    const { title, description, selected_file }: Snapshot = req.body;
    if (!title) errors.title = 'Title must not be empty';
    if (!description) errors.description = 'Description must not be empty';
    if (!selected_file)
      errors.selected_file = 'Selected file must not be empty';

    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });
    const creator: Creator = res.locals.creator;
    const snapshot: Snapshot = new Snapshot({
      title,
      description,
      selected_file,
      creator,
    });
    await snapshot.save();
    return res.status(200).json(snapshot);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const deleteSnapshot = async (req: Request, res: Response): Promise<any> => {
  try {
    const { snapshot_id }: any = req.params;
    const snapshot: Snapshot | undefined = await Snapshot.findOne(snapshot_id, {
      relations: ['creator'],
    });
    if (!snapshot)
      return res.status(400).json({ errors: 'Snapshot is not found' });
    const creator: Creator = res.locals.creator;
    if (snapshot.creator.creator_id !== creator.creator_id)
      return res.status(403).json({ errors: 'Unauthorized' });
    await Snapshot.delete(snapshot_id);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const router: Router = express();
router.get('/', getAllSnapshots);
router.get('/creators/:creator_id', getSnapshotsByCreator);
router.post('/', addSnapshot);
router.delete('/:snapshot_id', deleteSnapshot);

export default router;

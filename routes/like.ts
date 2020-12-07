import express, { Router, Request, Response } from 'express';
import { Like } from '../entity/Like';
import { Creator } from '../entity/Creator';
import { Snapshot } from '../entity/Snapshot';

const like = async (req: Request, res: Response): Promise<any> => {
  try {
    const creator: Creator = res.locals.creator;
    const { snapshot_id }: any = req.params;
    const snapshot: Snapshot | undefined = await Snapshot.findOne(snapshot_id);
    if (!snapshot)
      return res.status(400).json({ errors: 'Snapshot is not found' });
    let like: Like | undefined = await Like.findOne(
      { creator, snapshot },
      { relations: ['creator', 'snapshot'] }
    );
    if (like)
      return res.status(400).json({ errors: 'Snapshot is already liked' });

    like = new Like({ creator, snapshot });
    await like.save();
    return res.status(200).json(like);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const unlike = async (req: Request, res: Response) => {
  try {
    const creator: Creator = res.locals.creator;
    const { snapshot_id }: any = req.params;
    const snapshot: Snapshot | undefined = await Snapshot.findOne(snapshot_id);
    if (!snapshot)
      return res.status(400).json({ errors: 'Snapshot is not found' });
    let like: Like | undefined = await Like.findOne(
      { creator, snapshot },
      { relations: ['creator', 'snapshot'] }
    );
    if (!like)
      return res.status(400).json({ errors: 'Snapshot has not been liked' });

    await Like.delete(like.like_id);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const router: Router = express.Router();
router.post('/:snapshot_id/like', like);
router.delete('/:snapshot_id/like', unlike);
export default router;

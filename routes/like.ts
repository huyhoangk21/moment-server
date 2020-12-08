import express, { Router, Request, Response } from 'express';
import { Like } from '../entity/Like';
import { User } from '../entity/User';
import { Moment } from '../entity/Moment';

const like = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: User = res.locals.user;
    const { moment_id }: any = req.params;
    const moment: Moment | undefined = await Moment.findOne(moment_id);
    if (!moment) return res.status(400).json({ errors: 'Moment is not found' });
    let like: Like | undefined = await Like.findOne(
      { user, moment },
      { relations: ['user', 'moment'] }
    );
    if (like)
      return res.status(400).json({ errors: 'Moment is already liked' });

    like = new Like({ user, moment });
    await like.save();
    return res.status(200).json(like);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const unlike = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: User = res.locals.user;
    const { moment_id }: any = req.params;
    const moment: Moment | undefined = await Moment.findOne(moment_id);
    if (!moment) return res.status(400).json({ errors: 'Moment is not found' });
    let like: Like | undefined = await Like.findOne(
      { user, moment },
      { relations: ['user', 'moment'] }
    );
    if (!like)
      return res.status(400).json({ errors: 'Moment has not been liked' });

    await Like.delete(like.like_id);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const router: Router = express.Router();
router.post('/:moment_id/like', like);
router.delete('/:moment_id/like', unlike);
export default router;

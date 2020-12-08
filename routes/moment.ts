import express, { Router, Request, Response } from 'express';
import { User } from '../entity/User';
import { Moment } from '../entity/Moment';

const getAllMoments = async (_: Request, res: Response): Promise<Response> => {
  try {
    const allMoments = await Moment.find({
      relations: ['user', 'likes', 'likes.user'],
    });
    return res.status(200).json(allMoments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const getMomentsByUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { user_id }: any = req.params;
    const user: User | undefined = await User.findOne(user_id);
    if (!user) return res.status(400).json({ errors: 'User is not found' });
    const moments = await Moment.find({
      where: { user },
      relations: ['user', 'likes', 'likes.user'],
    });
    return res.status(200).json(moments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const addMoment = async (req: Request, res: Response): Promise<Response> => {
  try {
    let errors: any = {};
    const { title, description, selected_file }: Moment = req.body;
    if (!title) errors.title = 'Title must not be empty';
    if (!description) errors.description = 'Description must not be empty';
    if (!selected_file)
      errors.selected_file = 'Selected file must not be empty';

    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });
    const user: User = res.locals.user;
    const moment: Moment = new Moment({
      title,
      description,
      selected_file,
      user,
    });
    await moment.save();
    return res.status(200).json(moment);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const deleteMoment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { moment_id }: any = req.params;
    const moment: Moment | undefined = await Moment.findOne(moment_id, {
      relations: ['user'],
    });
    if (!moment) return res.status(400).json({ errors: 'Moment is not found' });
    const user: User = res.locals.user;
    if (moment.user.user_id !== user.user_id)
      return res.status(403).json({ errors: 'Unauthorized' });
    await Moment.delete(moment_id);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const router: Router = express();
router.get('/', getAllMoments);
router.get('/users/:user_id', getMomentsByUser);
router.post('/', addMoment);
router.delete('/:moment_id', deleteMoment);

export default router;

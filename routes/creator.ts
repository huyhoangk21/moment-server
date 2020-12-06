import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookie, { CookieSerializeOptions } from 'cookie';
import { validate } from 'class-validator';
import auth from '../middleware/auth';
import { Creator } from '../entity/Creator';

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    let errors: any = {};
    const { creator_name, email, password }: Creator = req.body;
    const creatorByName: Creator | undefined = await Creator.findOne({
      creator_name,
    });
    const creatorByEmail: Creator | undefined = await Creator.findOne({
      email,
    });

    if (creatorByName) errors.creator_name = 'Creator name is already taken';
    if (creatorByEmail) errors.email = 'Email is already taken';

    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

    const creator: Creator = new Creator({ creator_name, email, password });
    errors = await validate(creator);
    if (errors.length > 0) return res.status(400).json({ errors });

    await creator.save();
    return res.status(200).json({ creator });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: err });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { creator_name, email, password }: Creator = req.body;
    let creator: Creator | undefined;
    if (creator_name) {
      creator = await Creator.findOne({ creator_name });
    }
    if (email) {
      creator = await Creator.findOne({ email });
    }

    if (!creator)
      return res.status(400).json({ errors: 'Incorrect username or password' });

    if (!creator.matchPassword(password))
      return res.status(400).json({ errors: 'Incorrect username or password' });

    const token: string = jwt.sign(
      { creator_name: creator.creator_name },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    const cookieOptions: CookieSerializeOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    };

    res.set('Set-Cookie', cookie.serialize('token', token, cookieOptions));
    return res.status(200).json(creator);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const me = (_: Request, res: Response): Response<any> => {
  return res.status(200).json(res.locals.creator);
};

const logout = async (_: Request, res: Response): Promise<any> => {
  const cookieOptions: CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    expires: new Date(0),
    path: '/',
  };

  res.set('Set-Cookie', cookie.serialize('token', '', cookieOptions));

  return res.status(200).json({ success: true });
};

const router: Router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.get('/logout', auth, logout);

export default router;

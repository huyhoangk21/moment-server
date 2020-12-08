import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cookie, { CookieSerializeOptions } from 'cookie';
import { validate } from 'class-validator';
import auth from '../middleware/auth';
import { User } from '../entity/User';

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    let errors: any = {};
    const { username, email, password }: User = req.body;
    const userByName: User | undefined = await User.findOne({
      username,
    });
    const userByEmail: User | undefined = await User.findOne({
      email,
    });

    if (userByName) errors.username = 'Username is already taken';
    if (userByEmail) errors.email = 'Email is already taken';

    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

    const user: User = new User({
      username,
      email,
      password,
    });
    errors = await validate(user);
    if (errors.length > 0) return res.status(400).json({ errors });

    await user.save();
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: User = req.body;

    const user: User | undefined = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ errors: 'Incorrect username or password' });

    if (!user.matchPassword(password))
      return res.status(400).json({ errors: 'Incorrect username or password' });

    const token: string = jwt.sign(
      { username: user.username },
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
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: 'Server side error' });
  }
};

const me = (_: Request, res: Response): Response => {
  return res.status(200).json(res.locals.user);
};

const logout = (_: Request, res: Response): Response => {
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

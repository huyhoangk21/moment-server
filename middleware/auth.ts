import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.cookies.token;
    if (!token) throw new Error('Unauthenticated');

    const { username }: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const user: User | undefined = await User.findOne({
      username,
    });
    if (!user) throw new Error('Unauthenticated');
    res.locals.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: err.message });
  }
};

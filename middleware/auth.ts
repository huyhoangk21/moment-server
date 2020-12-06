import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Creator } from '../entity/Creator';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.cookies.token;
    if (!token) throw new Error('Unauthenticated');

    const { creator_name }: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const creator: Creator | undefined = await Creator.findOne({
      creator_name,
    });
    if (!creator) throw new Error('Unauthenticated');
    res.locals.creator = creator;
    next();
  } catch (err) {
    return res.status(401).json({ errors: err.message });
  }
};

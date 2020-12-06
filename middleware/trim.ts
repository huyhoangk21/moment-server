import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  const exceptions = ['password'];
  Object.keys(req.body).forEach(key => {
    if (!exceptions.includes(key) && typeof key === 'string') {
      key = key.trim();
    }
  });
  next();
};

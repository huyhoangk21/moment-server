import { Request, Response, NextFunction } from 'express';

export default (req: Request, _: Response, next: NextFunction) => {
  const io = req.app.get('socketio');

  io.emit('New Change');

  next();
};

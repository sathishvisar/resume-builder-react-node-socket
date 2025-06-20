// src/middleware/auth.ts
import { RequestHandler } from 'express';
import Session from './../models/Session';

const PUBLIC_PATHS = new Set([
  '/api/auth/google',
  '/api/auth/login',
  '/api/auth/register'
]);

export const auth: RequestHandler = async (req, res, next) => {
  if (PUBLIC_PATHS.has(req.path)) {
    next();
    return;
  }

  const sid = req.cookies?.sid;
  if (!sid) {
    res.sendStatus(401);
    return;
  }

  const session = await Session.findById(sid).populate('user').lean();
  if (!session || session.expiresAt < new Date()) {
    if (session) await Session.deleteOne({ _id: sid });
    res.sendStatus(401);
    return;
  }
  const { _id, email, firstname, lastname, picture} = session.user as any;
  req.user = { _id, email, firstname, lastname, picture}
  next();
};

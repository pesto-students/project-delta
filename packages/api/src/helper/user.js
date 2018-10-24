import { User } from '../db';

// Given a user's email at req.decoded.email, extracts user document from DB
//   and makes it available at req.user
export async function extractUser(req, res, next) {
  if (req.decoded && req.decoded.email !== undefined) {
    try {
      req.user = await User.findOne({ email: req.decoded.email });
      next();
    } catch (e) {
      next(e);
    }
  } else {
    process.nextTick(next);
  }
}

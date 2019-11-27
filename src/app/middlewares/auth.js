import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConf from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];


  try {
    const decoded = await promisify(jwt.verify)(token, authConf.secret);
    req.userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: 'Token not found' });
  }

  return next();
};

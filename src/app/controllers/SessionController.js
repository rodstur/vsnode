import jwt from 'jsonwebtoken';
import models from '../models';
import { ErrorHandler } from '../middlewares/error';
import auth from '../../config/auth';


class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (!user) throw new ErrorHandler(400, 'User not found');
    if (!await user.checkPassword(password)) throw new ErrorHandler(400, 'Password does not match');

    const { id, name } = user;

    return res.json({
      user: { id, name, email },
      token: jwt.sign(
        { id },
        auth.secret, {
          expiresIn: auth.expiresIn,
        },
      ),
    });
  }
}


export default new SessionController();

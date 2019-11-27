import DefaultController from '.';

class UserController extends DefaultController {
  async create(req, res, next) {
    try {
      const {
        id, name, email, provider,
      } = await this.models[this.modelName].create(req.body);

      return res.status(200).json({
        id, name, email, provider,
      });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new UserController(__filename);

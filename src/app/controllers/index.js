import path from 'path';
import models from '../models';
import { ErrorHandler } from '../middlewares/error';

class DefaultController {
  constructor(controllerName) {
    this.modelName = this.getControllerName(controllerName);
    this.models = models;
  }

  async store(req, res, next) {
    try {
      const model = await this.models[this.modelName].store(req.body);
      res.status(200).json(model);
    } catch (error) {
      throw new ErrorHandler(400, error.message);
    }
  }

  async update(req, res, next) {
    return res.status(200).json();
  }

  getControllerName(controllerName) {
    const filename = path.basename(controllerName);
    const idx = filename.indexOf('Controller');

    if (idx > 0) {
      return filename.substring(0, idx);
    }

    throw new ErrorHandler(500, 'Controller not found');
  }
}

export default DefaultController;

import path from 'path';
import fs from 'fs';
import { Sequelize } from 'sequelize';
import connection from '../../database';


class Models {
  constructor() {
    this.loadModules(connection);
  }


  loadModules(sequelize) {
    const modelsPath = path.dirname(__filename);
    const currentFile = path.basename(__filename);

    this.models = Object.assign({},
      ...fs.readdirSync(modelsPath)
        .filter((name) => this.filterModel(modelsPath, name, currentFile))
        .map((model) => {
          model = this.getClassModel(modelsPath, model);
          model.init(sequelize);
          return { [model.name]: model };
        }));
  }

  getClassModel(modelsPath, modelName) {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(path.join(modelsPath, modelName)).default;
    return model;
  }

  filterModel(modelsPath, name, currentFile) {
    if (name !== currentFile && name.slice(-3) === '.js') {
      const classModel = this.getClassModel(modelsPath, name);
      return Object.getPrototypeOf(classModel) === Sequelize.Model;
    }

    return false;
  }
}


export default new Models().models;

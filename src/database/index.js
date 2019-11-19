import Sequelize from 'sequelize';
import dbConf from '../config/database';

class DataBase {
  constructor() {
    this.connection = new Sequelize(dbConf);
  }
}


export default new DataBase().connection;

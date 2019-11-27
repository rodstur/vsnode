import Sequelize from 'sequelize';
import bcryp from 'bcrypt';
import { ErrorHandler } from '../middlewares/error';


class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: { args: true, msg: 'E-mail already exist' },
        },
        password: Sequelize.STRING,
        password_plain: Sequelize.VIRTUAL,
        password_confirm: Sequelize.VIRTUAL,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) delete user.dataValues.password;

      if (user.password_plain) {
        user.password = await bcryp.hash(user.password_plain, 8);
      }
    });

    this.addHook('beforeCreate', async (user) => {
      const objUser = await this.findOne({ where: { email: user.email } });
      if (objUser) { throw new ErrorHandler(400, this.rawAttributes.email.unique.msg); }
    });


    return this;
  }

  checkPassword(password) {
    return bcryp.compare(password, this.password);
  }
}

export default User;

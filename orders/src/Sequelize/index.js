const { Sequelize, DataTypes } = require('sequelize');

class SequelizeModel {
  constructor() {
    this.database = null;
  }

  async connect(){
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite'
    });

    /*
      Order Model
      Fields: id, status (N: Created, C: Confirmed, D: Delivered, I: Canceled), remark
     */
    const Order = sequelize.define('Order', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'N'
      },
      remark: {
        type: DataTypes.TEXT
      }
    }, {
    });

    /* to sync all models to database */
    await sequelize.sync({force: true});

    this.database = sequelize;
  }
}

module.exports = SequelizeModel;

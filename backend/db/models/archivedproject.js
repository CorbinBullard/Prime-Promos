'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArchivedProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArchivedProject.init({
    name: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    customerPO: DataTypes.INTEGER,
    salesConfirmation: DataTypes.INTEGER,
    itemData: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'ArchivedProject',
  });
  return ArchivedProject;
};

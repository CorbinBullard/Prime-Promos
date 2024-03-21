"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsToMany(models.User, {
        through: "UserProject",
        foreignKey: "projectId",
        otherKey: "userId",
        unique: true,
        onDelete: "CASCADE",
      });
      Project.hasMany(models.Item, {
        foreignKey: "projectId",
        onDelete: "CASCADE",
      });
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      inHandsDate: DataTypes.DATE,
      eventDate: DataTypes.DATE,
      customerPO: DataTypes.INTEGER,
      salesConfirmation: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};

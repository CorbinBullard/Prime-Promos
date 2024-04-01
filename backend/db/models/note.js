"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.Item, {
        foreignKey: "itemId",
        onDelete: "CASCADE",
      });
    }
  }
  Note.init(
    {
      itemId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};

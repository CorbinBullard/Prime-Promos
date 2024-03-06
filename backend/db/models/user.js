"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      hashedPassword: DataTypes.STRING,
      role: DataTypes.ENUM("owner", "admin", "user"),
      validated: DataTypes.BOOLEAN,
      invitationToken: DataTypes.STRING,
      tokenExpiration: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: [
            "hashedPassword",
            "createdAt",
            "updatedAt",
            "invitationToken",
            "tokenExpiration",
          ],
        },
      },
    }
  );
  return User;
};

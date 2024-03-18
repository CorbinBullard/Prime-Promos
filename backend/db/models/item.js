"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Project, {
        foreignKey: "projectId",
        onDelete: "CASCADE",
      });
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
      itemNumber: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      sellUnitPrice: DataTypes.DECIMAL,
      itemColor: DataTypes.STRING,
      logo: DataTypes.STRING,
      logoColor: DataTypes.STRING,
      inHandsDate: DataTypes.DATE,
      eventDate: DataTypes.DATE,
      quoteNotes: DataTypes.TEXT,
      stockCheck: DataTypes.STRING,
      netUnitPrice: DataTypes.DECIMAL,
      netSetup: DataTypes.DECIMAL,
      proofCharge: DataTypes.DECIMAL,
      pmsCharge: DataTypes.DECIMAL,
      decorationMethod: DataTypes.STRING,
      numberOfImprintColors: DataTypes.INTEGER,
      productionTime: DataTypes.STRING,
      shippingEstimate: DataTypes.DECIMAL,
      factoryNotes: DataTypes.TEXT,
      factory: DataTypes.STRING,
      primePO: DataTypes.STRING,
      orderSent: DataTypes.DATE,
      preVirtual: DataTypes.BOOLEAN,
      shipDate: DataTypes.DATE,
      tracking: DataTypes.STRING,
      delivered: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: ["quote", "order","shipped", "delivered"],
        defaultValue: "quote",
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};

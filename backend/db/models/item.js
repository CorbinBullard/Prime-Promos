"use strict";
const { Model } = require("sequelize");
const { ItemStatusFields } = require("../../utils/utilFunctions");

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

    // Adding a static method to advance the status of an item
    static async advanceStatus(itemId) {
      const item = await this.findByPk(itemId);
      if (!item) throw new Error("Item not found");

      const statusOrder = [
        "quote",
        "order",
        "isProduction",
        "shipped",
        "delivered",
      ];

      const currentIndex = statusOrder.indexOf(item.status);
      const currentPercentage = item.getCurrentStatusPercentage(item);

      // If the item is not already in the last status, advance it
      if (currentPercentage === 100 && currentIndex < statusOrder.length - 1) {
        item.status = statusOrder[currentIndex + 1];
        await item.save();
        return item;
      } else {
        throw new Error("Item is already in the last status");
      }
    }

    getCurrentStatusPercentage(item) {
      let total = 0;
      console.log("\n\nITEM", item);
      const list = ItemStatusFields[item.status];
      list.forEach((key) => {
        if (item[key]) {
          total += 1;
        }
      });
      console.log("\n\nTOTAL", total);
      return Math.floor((total / list.length) * 100);
    }
  }

  Item.init(
    {
      // Model attributes
      name: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
      itemNumber: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      sellUnitPrice: DataTypes.DECIMAL,
      itemColor: DataTypes.STRING,
      logo: DataTypes.STRING,
      logoColor: DataTypes.STRING,
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
      recieveOrderAcknowledge: DataTypes.DATE,
      proofForAprovalFile: DataTypes.STRING,
      proofForAprovalDate: DataTypes.DATE,
      invoice: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["quote", "order", "isProduction", "shipped", "delivered"],
        defaultValue: "quote",
      },
      prepaymentConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );

  return Item;
};

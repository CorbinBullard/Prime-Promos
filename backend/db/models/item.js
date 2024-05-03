"use strict";
const { Model } = require("sequelize");
const { ItemStatusFields } = require("../../utils/ItemStatusFields");
const { s3 } = require("../../utils/aws");
const {
  DeleteObjectsCommand,
  ListObjectsCommand,
} = require("@aws-sdk/client-s3");
require("dotenv").config();

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

      Item.hasMany(models.Note, {
        foreignKey: "itemId",
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
      if (item.status === "delivered") return 100;

      const list = ItemStatusFields[item.status];
      list.forEach((key) => {
        if (item[key] !== null && item[key] !== "") {
          total += 1;
        }
      });
      return Math.floor((total / list.length) * 100);
    }
  }

  Item.init(
    {
      // Model attributes
      name: DataTypes.STRING,
      projectId: DataTypes.INTEGER,
      itemNumber: DataTypes.STRING,
      spcNumber: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      sellUnitPrice: DataTypes.DECIMAL,
      itemColor: DataTypes.STRING,
      logo: DataTypes.STRING,
      logoColor: DataTypes.STRING,
      stockCheck: DataTypes.STRING,
      netUnitPrice: DataTypes.DECIMAL,
      unitPriceCode: {
        type: DataTypes.ENUM,
        values: ["A/P", "B/Q", "C/R", "D/S", "E/T", "F/U", "G/V"],
        defaultValue: "C/R",
      },
      setupPriceCode: {
        type: DataTypes.ENUM,
        values: ["A/P", "B/Q", "C/R", "D/S", "E/T", "F/U", "G/V"],
        defaultValue: "G/V",
      },
      sellSetup: DataTypes.DECIMAL,
      netSetup: DataTypes.DECIMAL,
      proofCharge: DataTypes.DECIMAL,
      pmsCharge: DataTypes.DECIMAL,
      decorationMethod: DataTypes.STRING,
      numberOfImprintColors: DataTypes.INTEGER,
      productionTime: DataTypes.STRING,
      shippingEstimate: DataTypes.DECIMAL,
      factory: DataTypes.STRING,
      primePO: DataTypes.STRING,
      orderSent: DataTypes.DATE,
      preVirtual: DataTypes.STRING,
      shipDate: DataTypes.DATE,
      tracking: DataTypes.STRING,
      delivered: DataTypes.DATE,
      receivedOrder: DataTypes.DATE,
      proofApprovalFileUrl: DataTypes.STRING,
      proofApprovalDate: DataTypes.DATE,
      invoice: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["quote", "order", "production", "shipped", "delivered"],
        defaultValue: "quote",
      },
      prepaymentConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sentEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Item",
      hooks: {
        afterDestroy: async (item, options) => {
          const itemJSON = await item.toJSON();
          const bucketName = process.env.AWS_BUCKET_NAME; // Ensure you have this in your .env
          const logoKey = itemJSON.logo?.split("/").pop(); // Get the key of the image from the URL
          const invoiceKey = itemJSON.invoice?.split("/").pop(); // Get the key of the invoice from the URL
          const ObjectArr = [];
          if (logoKey) ObjectArr.push({ Key: `uploads/${logoKey}` });
          if (invoiceKey) ObjectArr.push({ Key: `uploads/${invoiceKey}` });
          const input = {
            Bucket: bucketName,
            Delete: {
              // Structure required by DeleteObjectsCommand
              Objects: ObjectArr,
              Quiet: false, // Can set to true if you don't need information about each delete in the response
            },
          };

          try {
            await s3.send(new DeleteObjectsCommand(input));
            console.log("Image successfully deleted from S3");
          } catch (error) {
            console.error("Failed to delete image from S3:", error);
          }
        },
      },
    }
  );

  return Item;
};

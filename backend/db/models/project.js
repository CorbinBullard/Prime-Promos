"use strict";
const { Model } = require("sequelize");
const { uploadFileToDropbox } = require("../../utils/dropbox");
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
    async isComplete() {
      const items = await this.getItems();
      for (let item of items) {
        const itemJSON = await item.toJSON();
        if (itemJSON.status !== "delivered") {
          return false; // As soon as one item is not delivered, return false
        }
      }
      return true; // If all items are delivered, return true
    }
    async archive({ buffer, fileName }) {
      const project = await this.toJSON();
      if (project.status !== "completed") {
        throw new Error("Project must be completed before archiving");
      }
      console.log("Archiving project", project);
      
      uploadFileToDropbox(buffer, fileName, "Archived")
        .then(() => {
          console.log("File uploaded to Dropbox");
          // this.destroy();
        })
        .catch((error) => {
          console.error("Error uploading file to Dropbox:", error);
        });

      // delete project
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      organizationName: DataTypes.STRING,
      contactName: DataTypes.STRING,
      contactEmail: DataTypes.STRING,
      contactPhone: DataTypes.STRING,
      inHandsDate: DataTypes.DATE,
      eventDate: DataTypes.DATE,
      customerPO: DataTypes.INTEGER,
      salesConfirmation: DataTypes.INTEGER,
      status: DataTypes.ENUM("active", "completed"),
      billToName: DataTypes.STRING,
      billToAddress: DataTypes.STRING,
      billToCity: DataTypes.STRING,
      billToState: DataTypes.STRING,
      billToZip: DataTypes.STRING,
      shipToName: DataTypes.STRING,
      shipToAddress: DataTypes.STRING,
      shipToCity: DataTypes.STRING,
      shipToState: DataTypes.STRING,
      shipToZip: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};

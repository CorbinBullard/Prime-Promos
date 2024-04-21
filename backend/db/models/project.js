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
    async archive() {
      const project = await this.toJSON();
      if (project.status !== "completed") {
        throw new Error("Project must be completed before archiving");
      }
      console.log("Archiving project", project);
      const NewArchivedProject = await this.sequelize.models.ArchivedProject.create(
        {
          name: project.name,
          eventDate: project.eventDate,
          customerPO: project.customerPO,
          salesConfirmation: project.salesConfirmation,
          itemData: JSON.stringify(project.Items),
        }
      );
      // delete project
      await this.destroy();
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      collegeName: DataTypes.STRING,
      contactName: DataTypes.STRING,
      inHandsDate: DataTypes.DATE,
      eventDate: DataTypes.DATE,
      customerPO: DataTypes.INTEGER,
      salesConfirmation: DataTypes.INTEGER,
      status: DataTypes.ENUM("active", "completed"),
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};

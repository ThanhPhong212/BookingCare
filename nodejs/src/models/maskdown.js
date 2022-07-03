"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Maskdowns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Maskdowns.belongsTo(models.User, {
        foreignKey: "doctorId",
      });
    }
  }
  Maskdowns.init(
    {
      contentHTML: DataTypes.TEXT("long"),
      contentMaskdown: DataTypes.TEXT("long"),
      descripttion: DataTypes.TEXT("long"),
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Maskdowns",
    }
  );
  return Maskdowns;
};

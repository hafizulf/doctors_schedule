'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
      Doctor.hasMany(models.Schedule, { 
        foreignKey: 'doctor_id',
        as: 'schedules',
      });
    }
  }
  Doctor.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'doctors',
    modelName: 'Doctor',
    underscored: true,
    paranoid: true,
    timestamps: true,
  });
  return Doctor;
};
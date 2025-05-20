'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.Doctor, {
        foreignKey: 'doctor_id',
        as: 'doctor',
      })
    }
  }
  Schedule.init({
    day: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'schedules',
    modelName: 'Schedule',
    underscored: true,
    paranoid: true,
  });
  return Schedule;
};
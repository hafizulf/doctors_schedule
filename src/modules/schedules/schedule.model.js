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
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'doctors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    day: DataTypes.STRING,
    time_start: DataTypes.TIME,
    time_finish: DataTypes.TIME,
    quota: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
  }, {
    sequelize,
    tableName: 'schedules',
    modelName: 'Schedule',
    underscored: true,
    paranoid: true,
    timestamps: true,
  });
  return Schedule;
};
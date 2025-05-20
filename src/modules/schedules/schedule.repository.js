const { Schedule } = require("../../models");

const create = (data) => {
  return Schedule.create(data);
}

module.exports = {
  create
}

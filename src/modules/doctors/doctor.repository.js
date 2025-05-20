const { Doctor } = require("../../models");

const findOne = async (id) => {
  const data = await Doctor.findByPk(id);

  return data;
};

module.exports = {
  findOne
}

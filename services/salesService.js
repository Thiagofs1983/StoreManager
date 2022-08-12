const salesModel = require('../models/salesModel');

const addSale = async () => {
  const id = await salesModel.addSale();
  return id;
};

module.exports = {
  addSale,
};
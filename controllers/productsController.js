const productsService = require('../services/productsService');

const getAll = (req, res) => {
  const products = productsService.getAll();
  res.status(200).json(products);
};

module.exports = {
  getAll,
};
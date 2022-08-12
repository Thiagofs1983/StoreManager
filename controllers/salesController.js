const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const sales = await salesService.getAll();
  res.status(200).json(sales);
};

module.exports = {
  getAll,
};
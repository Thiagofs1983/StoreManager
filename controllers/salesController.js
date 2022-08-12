const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const sales = await salesService.getAll();
  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSaleById(id);
  res.status(200).json(sales);
};

module.exports = {
  getAll,
  getSaleById,
};
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

const removeSaleById = async (req, res) => {
  const { id } = req.params;
  await salesService.removeSaleById(id);
  res.status(204).end();
};

module.exports = {
  getAll,
  getSaleById,
  removeSaleById,
};
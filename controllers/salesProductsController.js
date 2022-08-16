const salesProductsService = require('../services/salesProductsService');

const addSale = async (req, res) => {
  const arrSale = req.body;
  const sale = await salesProductsService.addSaleProduct(arrSale);
  const newSale = {
    id: sale,
    itemsSold: arrSale,
  };
  res.status(201).json(newSale);
};

const updateSaleById = async (req, res) => {
  const updateSale = req.body;
  const { id } = req.params;
  const result = await salesProductsService.updateSaleById(id, updateSale);
  res.status(200).json(result);
};

module.exports = {
  addSale,
  updateSaleById,
};
const salesProductsService = require('../services/salesProductsService');
const validate = require('../middlewares/validate');

const addSale = async (req, res) => {
  const arrSale = req.body;
  await validate.validateProductSale(arrSale);
  const sale = await salesProductsService.addSaleProduct(arrSale);
  const newSale = {
    id: sale,
    itemsSold: arrSale,
  };
  res.status(201).json(newSale);
};

module.exports = {
  addSale,
};
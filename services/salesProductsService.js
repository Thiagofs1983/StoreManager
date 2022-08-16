const salesProductModel = require('../models/salesProductsModel');
const productsService = require('./productsService');
const salesService = require('./salesService');
const validate = require('../middlewares/validate');

const addSaleProduct = async (sale) => {
  await validate.validateProductSale(sale);
  await Promise.all(sale.map((prod) => productsService.findProductById(prod.productId)));
  const id = await salesProductModel.addSaleProduct(sale);
  return id;
};

const updateSaleById = async (id, sale) => {
  await validate.validateProductSale(sale);
  await salesService.getSaleById(id);
  await Promise.all(sale.map((prod) => productsService.findProductById(prod.productId)));
  const result = await salesProductModel.updateSaleById(id, sale);
  return result;
};

module.exports = {
  addSaleProduct,
  updateSaleById,
};
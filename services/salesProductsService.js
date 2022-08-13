const salesProductModel = require('../models/salesProductsModel');
const productsService = require('./productsService');

const addSaleProduct = async (sale) => {
  await Promise.all(sale.map((prod) => productsService.findProductById(prod.productId)));
  const id = await salesProductModel.addSaleProduct(sale);
  return id;
};

module.exports = {
  addSaleProduct,
};
const salesProductModel = require('../models/salesProductsModel');
const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const addSaleProduct = async (sale) => {
  const id = await salesModel.addSale();
  await Promise.all(sale.map((prod) => productsService.findProductById(prod.productId)));
  await Promise.all(sale.map((prod) => salesProductModel
    .addSaleProduct(id, prod.productId, prod.quantity)));
  return id;
};

module.exports = {
  addSaleProduct,
};
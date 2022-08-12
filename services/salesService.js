const salesModel = require('../models/salesModel');

const addSale = async () => {
  const id = await salesModel.addSale();
  return id;
};

const getAll = async () => {
  const result = await salesModel.getAll();
  const sales = result.map((sale) => ({
    saleId: sale.sale_id,
    productId: sale.product_id,
    quantity: sale.quantity,
    date: sale.date,
  }));
  return sales;
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  const sales = result.map((sale) => ({
    productId: sale.product_id,
    quantity: sale.quantity,
    date: sale.date,
  }));
  return sales;
};

module.exports = {
  addSale,
  getAll,
  getSaleById,
};
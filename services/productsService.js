const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const findProductById = async (id) => {
  const product = await productsModel.findProductById(id);
  if (product.length === 0) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  return product;
};

const create = async (name) => {
  const id = await productsModel.create(name);
  return id;
};

module.exports = {
  getAll,
  findProductById,
  create,
};

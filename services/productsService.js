const productsModel = require('../models/productsModel');
const validate = require('../middlewares/validate');

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
  const validateProduct = validate.validateProduct({ name });
  const id = await productsModel.create(validateProduct);
  console.log(id);
  return id;
};

const updatePruductById = async (name, id) => {
  const product = await productsModel.updatePruductById(name, id);
  if (product.affectedRows === 0) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  return product;
};

const removeProductById = async (id) => {
  const product = await productsModel.removeProductById(id);
  if (product.affectedRows === 0) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  return product;
};

module.exports = {
  getAll,
  findProductById,
  create,
  updatePruductById,
  removeProductById,
};

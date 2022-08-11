const Joi = require('joi');
const productsModel = require('../models/productsModel');

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  const { error, value } = schema.validate(product);
  if (error) {
    const err = error;
    if (err.message.includes('required')) {
      err.status = 400;
    }
    if (err.message.includes('length')) {
      err.status = 422;
    }
    throw err;
  }
  return value;
};

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
  validateProduct,
};

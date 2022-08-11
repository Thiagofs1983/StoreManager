const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const [product] = await productsService.findProductById(id);
  res.status(200).json(product);
};

const create = async (req, res) => {
  const { name } = req.body;
  productsService.validateProduct(req.body);
  const id = await productsService.create(name);
  const newProduct = { id, name };
  res.status(201).json(newProduct);
};

module.exports = {
  getAll,
  findProductById,
  create,
};
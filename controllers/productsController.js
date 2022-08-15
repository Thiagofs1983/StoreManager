const productsService = require('../services/productsService');
const validate = require('../middlewares/validate');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
};

const findProductById = async (req, res) => {
  // const { id } = req.params;
  const [product] = await productsService.findProductById(req.params.id);
  // console.log(product);
  res.status(200).json(product);
};

const create = async (req, res) => {
  const { name } = req.body;
  validate.validateProduct(req.body);
  const id = await productsService.create(name);
  const newProduct = { id, name };
  res.status(201).json(newProduct);
};

const updatePruductById = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  validate.validateProduct(req.body);
  await productsService.updatePruductById(name, id);
  res.status(200).json({ id, name });
};

const removeProductById = async (req, res) => {
  const { id } = req.params;
  await productsService.removeProductById(id);
  res.status(204).end();
};

module.exports = {
  getAll,
  findProductById,
  create,
  updatePruductById,
  removeProductById,
};
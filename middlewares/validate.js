const Joi = require('joi');

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

const validateProductSale = (sale) => {
  sale.map((prod) => {
  const schema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  });
  const { error, value } = schema.validate(prod);
  if (error) {
    const err = error;
    if (err.message.includes('required')) {
      err.status = 400;
    }
    if (err.message.includes('must be greater')) {
      err.status = 422;
    }
    throw err;
  }
  return value;
});
};

module.exports = {
  validateProduct,
  validateProductSale,
};
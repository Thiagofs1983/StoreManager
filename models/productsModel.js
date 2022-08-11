const connection = require('./connection');

const getAll = async () => {
  const sql = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(sql);
  return products;
};

const findProductById = async (id) => {
  const sql = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(sql, [id]);
  return product;
};

module.exports = {
  getAll,
  findProductById,
};

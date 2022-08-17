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

const create = async (name) => {
  const sql = 'INSERT INTO StoreManager.products (name) VALUES (?);';
  const [{ insertId }] = await connection.execute(sql, [name]);
  return insertId;
};

const updatePruductById = async (name, id) => {
  const sql = `UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?`;
  const [result] = await connection.execute(sql, [name, id]);
  return result;
};

const removeProductById = async (id) => {
  const sql = 'DELETE FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(sql, [id]);
  return result;
};

module.exports = {
  getAll,
  findProductById,
  create,
  updatePruductById,
  removeProductById,
};

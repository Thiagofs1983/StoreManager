const connection = require('./connection');

const addSale = async () => {
  const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(sql);
  return insertId;
};

const getAll = async () => {
  const sql = `SELECT SP.*, S.date FROM StoreManager.sales_products AS SP
  INNER JOIN StoreManager.sales AS S ON S.id = SP.sale_id
  ORDER BY SP.sale_id, SP.product_id;`;
  const [result] = await connection.execute(sql);
  return result;
};

const getSaleById = async (id) => {
  const sql = `SELECT SP.*, S.date FROM StoreManager.sales_products AS SP
  INNER JOIN StoreManager.sales AS S ON S.id = SP.sale_id
  WHERE SP.sale_id = ?
  ORDER BY SP.sale_id, SP.product_id;`;
  const [result] = await connection.execute(sql, [id]);
  return result;
};

const removeSaleById = async (id) => {
  const sql = 'DELETE FROM StoreManager.sales WHERE id = ?;';
  const [result] = await connection.execute(sql, [id]);
  return result;
};

module.exports = {
  addSale,
  getAll,
  getSaleById,
  removeSaleById,
};
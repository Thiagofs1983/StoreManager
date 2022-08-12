const connection = require('./connection');

const addSale = async () => {
  const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(sql);
  return insertId;
};

module.exports = {
  addSale,
};
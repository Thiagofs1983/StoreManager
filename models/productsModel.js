const connection = require('./connection');

const getAll = async () => {
  const sql = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(sql);
  return products;
};

module.exports = {
  getAll,
};

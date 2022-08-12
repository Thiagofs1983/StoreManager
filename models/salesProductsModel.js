const connection = require('./connection');

const addSaleProduct = async (saleId, productId, quantity) => {
  const sql = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?);`;
  const [result] = await connection.execute(sql, [saleId, productId, quantity]);
  return result;
};

module.exports = {
  addSaleProduct,
};
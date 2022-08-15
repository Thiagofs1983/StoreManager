const connection = require('./connection');

const addSaleProduct = async (sale) => {
  const sql = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?);`;

  const sqlSale = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [{ insertId }] = await connection.execute(sqlSale);

  await Promise.all(sale.map((prod) => connection
    .execute(sql, [insertId, prod.productId, prod.quantity])));
  return insertId;
};

module.exports = {
  addSaleProduct,
};
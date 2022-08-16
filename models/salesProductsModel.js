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

const updateSaleById = async (id, sale) => {
  const sql = `
  UPDATE StoreManager.sales_products
  SET quantity = ?
  WHERE sale_id = ? AND product_id = ?`;
  await Promise.all(sale.map(({ productId, quantity }) => connection
  .execute(sql, [quantity, id, productId])));
  return { saleId: id, itemsUpdated: sale };
};

module.exports = {
  addSaleProduct,
  updateSaleById,
};
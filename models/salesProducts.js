const connection = require('./connection');

const createSalesProducts = async (saleId, productId, quantity) => {
  const [salesProducts] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return salesProducts;
};
 
module.exports = { createSalesProducts };
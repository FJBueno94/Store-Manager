const connection = require('./connection');

const createSale = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return sale;
};

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
      sp.sale_id,
      s.date,
      sp.product_id,
      sp.quantity
    FROM StoreManager.sales as s
    INNER JOIN StoreManager.sales_products as sp
    ON s.id = sp.sale_id`,
  );
  return sales;
};

const findByIdSale = async (id) => {
  const [sale] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id,
      sp.quantity
    FROM StoreManager.sales as s
    INNER JOIN StoreManager.sales_products as sp
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ${id}`,
  );
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
};
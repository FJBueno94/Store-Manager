const connection = require('./connection');

const createSale = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return sale;
};

module.exports = { createSale };
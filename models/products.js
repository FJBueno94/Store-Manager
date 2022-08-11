const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id;',
  );
  return products;
};

const findById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );
  return product;
};

module.exports = {
  getAll,
  findById,
};

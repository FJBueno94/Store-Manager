const products = require('../models/products');

const getAll = async () => products.getAll();
const findById = async (id) => {
  const product = await products.findById(id);
  if (!product.length) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  return product;
};

module.exports = {
  getAll,
  findById,
};

const products = require('../models/products');

const getAll = async () => products.getAll();

const findById = async (id) => {
  const product = await products.findById(id);
  if (product.length === 0) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  return product;
};

const createProduct = async (name) => products.createProduct(name);

const updateProduct = async (id, name) => {
  const find = await products.findById(id);
  console.log(find);
  if (find.length === 0) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  await products.updateProduct(id, name);
  return {
    id,
    name,
  };
};

const deleteProduct = async (id) => {
  const find = await products.findById(id);
  if (find.length === 0) {
    return {
      error: {
        code: 'notFound',
        message: 'Product not found',
      },
    };
  }
  const product = await products.deleteProduct(id);
  return product;
};

module.exports = {
  getAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};

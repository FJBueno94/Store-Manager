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
  // const existingProduct = await products.findByName(name);

  // if (existingProduct) {
  //   return {
  //     error: {
  //       code: 'alreadyExists',
  //       message: 'Uma pessoa autora já existe com esse nome completo',
  //     },
  //   };
  // }
//   return products.createProduct(name);
// };

module.exports = {
  getAll,
  findById,
  createProduct,
};

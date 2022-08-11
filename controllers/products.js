const products = require('../services/products');

const getAll = async (_req, res) => {
  const allProducts = await products.getAll();

  return res.status(200).json(allProducts);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const product = await products.findById(id);
  if (product.error) return next(product.error);

  return res.status(200).json(product[0]);
};

module.exports = {
  getAll,
  findById,
};

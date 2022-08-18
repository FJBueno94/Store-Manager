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

const createProduct = async (req, res) => {
  const { name } = req.body;

  const product = await products.createProduct(name);

  return res.status(201).json(product);
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await products.updateProduct(id, name);
  if (product.error) return next(product.error);
  return res.status(200).json(product);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await products.deleteProduct(id);
  if (product.error) return next(product.error);
  return res.status(204).json();
};

module.exports = {
  getAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};

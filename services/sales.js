const sales = require('../models/sales');
const salesProducts = require('../models/salesProducts');
const products = require('./products');

const createSale = async (vendas) => {
  const find = await Promise.all(vendas.map((prod) => products.findById(prod.productId)));
  const findSome = find.some((prod) => prod.error);
  const error = { code: 'notFound', message: 'Product not found' };
  if (findSome) throw error;
  const { insertId } = await sales.createSale();
  const venda = [];
  const [result] = await Promise.all(vendas.map((product) => {
    const { productId, quantity } = product;
    salesProducts.createSalesProducts(insertId, productId, quantity);
    venda.push({ productId, quantity });
    return venda;
  }));
  const object = {
    id: insertId,
    itemsSold: result,
  };
  return object;
};

module.exports = { createSale };
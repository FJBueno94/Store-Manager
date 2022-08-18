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

const getAllSales = async () => {
  const Allsales = await sales.getAllSales();
  if (Allsales.length === 0) {
    return {
      error: { code: 'notFound', message: 'Sale not found' },
    };
  }
  const result = Allsales.map((sale) => {
    const { date, quantity } = sale;
    return {
      saleId: sale.sale_id,
      date,
      productId: sale.product_id,
      quantity,
    };
  });
  return result;
};

const findByIdSale = async (id) => {
  const salesProduct = await sales.findByIdSale(id);
  if (salesProduct.length === 0) {
    return {
      error: { code: 'notFound', message: 'Sale not found' },
    };
  }
  const result = salesProduct.map((sale) => {
    const { date, quantity } = sale;
    const saleReturn = {
      date,
      productId: sale.product_id,
      quantity,
    };
    return saleReturn;
  });
  return result;
};

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
};

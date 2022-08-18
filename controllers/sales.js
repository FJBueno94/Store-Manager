const sales = require('../services/sales');

const createSale = async (req, res, next) => {
  const vendas = req.body;
  const newSale = await sales.createSale(vendas);
  if (newSale.error) return next(newSale.error);
  return res.status(201).json(newSale);
};

const getAllSales = async (req, res, next) => {
  const allSales = await sales.getAllSales();
  if (allSales.error) return next(allSales.error);
  return res.status(200).json(allSales);
};

const findByIdSale = async (req, res, next) => {
  const { id } = req.params;
  const sale = await sales.findByIdSale(id);
  if (sale.error) return next(sale.error);
  console.log(sale);
  return res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAllSales,
  findByIdSale,
};
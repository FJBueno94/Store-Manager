const sales = require('../services/sales');

const createSale = async (req, res, next) => {
  const vendas = req.body;
  const newSale = await sales.createSale(vendas);
  if (newSale.error) return next(newSale.error);
  return res.status(201).json(newSale);
};

module.exports = { createSale };
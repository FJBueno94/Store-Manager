const Joi = require('joi');

  const validName = Joi.object({
    name: Joi.string()
      .min(5)
      .required()
      .messages({
        'any.required': '400|"name" is required',
        'string.min': '422|"name" length must be at least 5 characters long',
      }),
  });

const validSale = Joi.object({
  productId: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '400|"productId" is required',
    }),
  quantity: Joi.number()
    .integer()
    .required()
    .greater(0)
    .messages({
      'any.required': '400|"quantity" is required',
      'number.greater': '422|"quantity" must be greater than or equal to 1',
    }),
});

const validateProduct = (req, _res, next) => {
  const name = req.body;
  const { error } = validName.validate(name);
  if (error) {
    throw error;
  }
  return next();
};

const validateSale = (req, _res, next) => {
  const venda = req.body;
  venda.map((v) => {
    const { productId, quantity } = v;
    const { error } = validSale.validate({ productId, quantity });
    if (error) {
      throw error;
    }
    return venda;
  });
  return next();
};

module.exports = {
  validateProduct,
  validateSale,
};
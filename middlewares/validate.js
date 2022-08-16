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

const validateProduct = (req, _res, next) => {
  const name = req.body;
console.log(name, 'name', req.body);
  const { error } = validName.validate(name);
  if (error) {
    throw error;
  }
  return next();
};

module.exports = validateProduct;
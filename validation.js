const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    role: Joi.string()
  };
  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, schema);
};

const postValidation = data => {
  const schema = {
    title: Joi.string()
      .min(6)
      .max(200)
      .required(),
    description: Joi.string()
      .min(20)
      .required()
  };
  return Joi.validate(data, schema);
};

const categoryValidation = data => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(200)
      .required()
  };
  return Joi.validate(data, schema);
};

const productValidation = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .max(200)
      .required(),
    description: Joi.string()
      .min(20)
      .required(),
    image: Joi.string()
      .min(20)
      .required(),
    price: Joi.number()
      .min(20)
      .required(),
    category: Joi.string()
      .min(20)
      .required()
  };
  return Joi.validate(data, schema);
};

const orderValidation = data => {
  const productItem = Joi.object().keys({
    product: Joi.string().required(),
    quantity: Joi.number()
      .min(1)
      .required()
  });

  const schema = {
    items: Joi.array()
      .items(productItem)
      .required()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.productValidation = productValidation;
module.exports.categoryValidation = categoryValidation;
module.exports.orderValidation = orderValidation;

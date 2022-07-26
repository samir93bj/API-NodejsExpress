//Schema o DTO (Data Transfer objects)
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15).messages({
  'string.base': `" nombre "debe ser un tipo de 'texto'`,
  'string.empty': `"nombre "no puede ser un campo vacío`,
  'string.min': `"nombre" debe tener una longitud mínima de {#limit}`,
  'string.max': `"nombre" debe tener una longitud máxima de {#limit}`
});
const categoryId = Joi.number().integer();
const price = Joi.number().integer().min(10);
const priceMin = Joi.number().integer();
const priceMax = Joi.number().integer();
const image = Joi.string().uri();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

/////////////////////////////////////////////////
const createProductSchema = Joi.object({
    name : name.required(),
    price : price.required(),
    image : image.required(),
    categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name : name,
  price : price,
  image: image,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id : id.required()
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: priceMax.when('priceMin', {
    is: Joi.number().integer(),
    then: Joi.required()
  })
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
}

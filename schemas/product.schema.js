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
const price = Joi.number().integer().min(10).strict();
const image = Joi.string().uri();

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

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}

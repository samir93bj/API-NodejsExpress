//Schema o DTO (Data Transfer objects)
const Joi = require('joi');
//ID
const id = Joi.number().integer();
//NAME
const name = Joi.string().min(3).max(15).messages();
//IMAGE
const image = Joi.string().uri();

//CREATE CATEGORY
const createCategorySchema = Joi.object({
    name : name.required(),
    image : image.required()
});

//UPDATE CATEGORY
const updateCategorySchema = Joi.object({
  name : name,
  image: image
});

//OBTENER CATEGORY
const getCategorySchema = Joi.object({
  id : id.required()
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
}

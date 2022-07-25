//Schema o DTO (Data Transfer objects)
const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();

const createOrderSchema = Joi.object({
  customerId : customerId.required()
});

const updateOrderSchema = Joi.object({
  customerId
});

const getOrderSchema = Joi.object({
  id : id.required()
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema
}

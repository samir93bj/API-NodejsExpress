//Schema o DTO (Data Transfer objects)
const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password =  Joi.string();

const createCustomerSchema = Joi.object({

    name : name.required(),
    lastName : lastName.required(),
    phone : phone.required(),
    user: Joi.object({
      email: email.required(),
      password: password.required()
    })
});

const updateCustomerSchema = Joi.object({
  id : id.required(),
  name,
  lastName,
  phone,
  userId
});

const getCustomerchema = Joi.object({
  id : id.required(),

});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerchema
}

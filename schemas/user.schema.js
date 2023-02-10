const Joi = require('joi')

const id = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string().min(8)
const role = Joi.string().min(5)
const newPassword = Joi.string().min(8)
const token = Joi.string().min(60)

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role
})

const updateUserSchema = Joi.object({
  email,
  password,
  role
})

const changePassword = Joi.object({
  newPassword,
  token
})

const getUserSchema = Joi.object({
  id: id.required(),
  role
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema, changePassword }

const Joi = require('joi')
const email = Joi.string().email()
const password = Joi.string().min(8)

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

module.exports = { loginUserSchema }

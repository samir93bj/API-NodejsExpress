const boom = require('@hapi/boom')

function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })// abortEarly: false Entrega todos los errores en un solo resp

    if (error) {
      next(boom.badRequest(error))
    }

    next()
  }
}

module.exports = validatorHandler

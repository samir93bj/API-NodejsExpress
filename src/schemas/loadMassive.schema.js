/* eslint-disable no-undef */
const Joi = require('joi')
const boom = require('@hapi/boom')
const { v4: uuidv4 } = require('uuid')

const collection = Joi.string().valid('users', 'categories', 'products', 'orders')

// VALIDATORS EXTENSIONS
function validateExtension (file) {
  extensionesValidas = ['xlsx', 'csv']

  // GET EXTENSION FILE
  const nombreCortado = file.name.split('.')
  const extensionArchivo = nombreCortado[nombreCortado.length - 1]

  // VALIDAMOS EXTENSION RECIBIDA
  if (!extensionesValidas.includes(extensionArchivo)) {
    throw boom.notFound(`File not found - valid extensions ${extensionesValidas}`)
  }

  const nameTemp = uuidv4() + '.' + extensionArchivo
  return nameTemp
};

// VALIDATORS COLLECTIONS
const updateCollectionSchema = Joi.object({
  collection: collection.required()
})

module.exports = {
  updateCollectionSchema,
  validateExtension
}

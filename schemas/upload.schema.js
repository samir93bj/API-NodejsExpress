const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');
const Joi = require('joi');

const id = Joi.number().integer();
const collection = Joi.string().valid('categories','products');

//VALIDATORS EXTENSIONS
function validateExtension(file) {
    extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    //GET EXTENSION FILE
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //VALIDAMOS EXTENSION RECIBIDA
    if (!extensionesValidas.includes(extensionArchivo)){
        throw boom.notFound(`File not found - valid extensions ${extensionesValidas}`);
    }

    const nameTemp = uuidv4()+'.'+extensionArchivo;
    return nameTemp;
};

//VALIDATORS COLLECTIONS
const updateCollectionSchema = Joi.object({
  collection: collection.required(),
  id : id.required()
});

module.exports = { validateExtension, updateCollectionSchema };

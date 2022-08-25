const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');


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


module.exports = { validateExtension };

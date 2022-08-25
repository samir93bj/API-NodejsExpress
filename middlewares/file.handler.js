const boom = require('@hapi/boom');

function validateFileUpload (req, res, next){

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
      throw boom.badRequest('file not found - is empty');
    }
      next();
}

module.exports = { validateFileUpload };

const boom = require('@hapi/boom');
const { config } = require('../config/config')

//CHECK API KEY
function checkApiKey(req, res, next){
  const apiKey = req.headers['api'];

  if(apiKey === config.apiKey){
    next();
  }else{
    next(boom.unauthorized());
  }
}

//CHECK ADMIN ROLE
function checkAdminRole(req, res, next){
  const user = req.user;
  if(user.role === 'admin'){
    next();
  }else{
    next(boom.forbidden('Se requieren permisos de administrador'));
  };
}

//CHECK ROLES
function checkRoles(...roles){
  return (req, res, next) => {

    const user = req.user;

    if(roles.includes(user.role)){
      next();
    }else{
      next(boom.forbidden('Se requieren permisos de administrador'));
    };

  }
}

module.exports = { checkApiKey,checkAdminRole,checkRoles };

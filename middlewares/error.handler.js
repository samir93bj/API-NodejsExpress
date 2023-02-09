const { ValidationError } = require("sequelize");

function logErrors(err, req, res, next){
    console.log("logErrors");
    console.log(err);
    next(err);
}

function errorHandler(err, req, res, next){
  console.log("errorHandler");
  res.status(500).json({
      message : err.message,
      stack: err.stack
    });
}

function boomErrorHandler(err, req, res, next){

  if(err.isBoom){
    const { output } = err;

    console.log("boomErrorHandler: "+output.payload.message);
    res.status(output.statusCode).json(output.payload);
  }
  else{
    next(err);
  }
}

function ormErrorHandler(err, req, res , next){
  if(err instanceof ValidationError){
    res.status(409).json({
      message: err.name,
      error: err.errors
    })

  }else{
      next();
  }
}



module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
};

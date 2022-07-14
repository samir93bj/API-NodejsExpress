require('dotenv').config();
const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();

app.use(express.json());

routerApi(app);

//Asignamos los middleware para manejo de errores
//app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(process.env.PUERTO, () => {
    console.log('Aplicacion corriendo en: http://'+process.env.IP+':'+process.env.PUERTO+'/api/'+process.env.VERSION);
});



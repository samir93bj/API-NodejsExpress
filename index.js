require('dotenv').config();
const cors = require('cors')
const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PUERTO || 3000;

app.use(express.json());

//LISTADO DE ORIGINES ACEPTADOS
const whiteList = ["http://192.168.100.5:3000", "http://localhost:3000", "https://myapp.co"];
const options = {
    origin: (origin, callback) =>{

        if(whiteList.includes(origin) || !origin){
          callback(null,true);
        }
        else{
          callback(new Error('Access denied'));
        }
    }
};
app.use(cors(options));

app.get('/',(req, res) => {
  res.send('Server on');
});

routerApi(app);

//Asignamos los middleware para manejo de errores
//app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Aplicacion corriendo en: http://'+process.env.IP+':'+port+'/api/'+process.env.VERSION);
});



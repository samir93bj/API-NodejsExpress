const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const userService = require('../../../services/user.service');

const service = new userService();

const localStrategy = new Strategy({
  usernameField:'email',
  passwordField:'password'
},
  async (username, password, done)=>{

    try{

      const user = await service.findByEmail(username);

      if(!user){
        done(boom.unauthorized(), false);
      };

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        done(boom.unauthorized(), false);
      };

      //Eliminamos el password del user obtenido
      delete user.dataValues.password;

      done(null, user);
    }catch{
      done(error, false);
    }

});

module.exports = localStrategy;

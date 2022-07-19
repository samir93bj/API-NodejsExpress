const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize =  new Sequelize (URI, {
      dialect: 'postgres',
      logging: true
    });

  sequelize.sync()
        .then(function(){
        console.log('DB connection sucessful.');
  },
  function(err){
      console.log(err);
  });

module.exports = sequelize;

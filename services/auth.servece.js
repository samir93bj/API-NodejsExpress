const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const userService = require('./user.service');
const { config } = require('./../config/config');

const service = new userService();

class AuthService{
  constructor(){

  }

//GET USER - LOGIN
async getUser(email, password){

    const user = await service.findByEmail(email);

    if(!user){
      throw boom.unauthorized();
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      throw boom.unauthorized();
    };

    //Eliminamos el password del user obtenido
    delete user.dataValues.password;

    return user;
}

//FIRMAMOS Y BRINDAMOS TOKEN A RESPECTIVO USER
singToken(user){
    const jwtConfig = {
      expiresIn: 60 * 60,
    };

    const payload = {
      sub : user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.JWT_SECRET, jwtConfig);

    return { user ,token };
  }

//Servicio de Mails
async sendMail(email) {

  const user = await service.findByEmail(email);

  if(!user){
    throw boom.unauthorized();
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure:true, //true for 465, false for other ports
    port: 465,
    auth: {
        user: config.emailUser,
        pass: config.emailPassword
    }
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: config.emailUser,
    to: `${user.email}`,
    subject: "Reset Password",
    text: "Reset Password",
    html: "<b>Reset Password</b>",
  });

  return `Email sent subject ${user.email}`;
}

}

module.exports = AuthService;

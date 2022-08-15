const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models }  = require('../libs/sequalize');

class usersService {

  constructor(){

  }

  //GET USER
  async find(){

    const users = await models.User.findAll({
      include:['customer']
    });

    return users;
  }

  //GET USER
  async findOne(id){

    const user = await models.User.findByPk(id);

      if(!user){
        throw boom.notFound('User not found');
      }

    return user;
  }

 //GET USER-EMAIL
 async findByEmail(email){

  //const user = await models.User.findOne({ where: { email } });
  const user = await models.User.scope("withPassword").findOne({ where : { email }});

    if(!user){
      throw boom.notFound('User not found');
    }

  return user;
}

  //CREATE USER
  async create(data){

    const email = data.email;
    const password = data.password;

    const user = {
      email,
      password
    }

    const newUser = await models.User.create(user);

    //Quitar del return el password del user => zequelize
    delete newUser.dataValues.password;

    return newUser;
  }

  //UPDATE USER
  async update(id, data){

    const getUser = await this.findOne(id);

    if(!getUser){
        throw boom.notFound('User not found');
      }
    const user = await getUser.update(data);

    return user;
  }

  //DELETE USER
  async delete(id){

    const getUser = await this.findOne(id);

    if(!getUser){
      throw boom.notFound('User not found');
    }

    await getUser.destroy(id);
    return  id;
  }
}

module.exports = usersService;

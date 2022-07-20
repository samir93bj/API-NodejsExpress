const boom = require('@hapi/boom');
const { models }  = require('../libs/sequalize');

class usersService {

  constructor(){

  }


  //GET USER
  async find(){
    const users = await models.User.findAll();
    return users;
  }

  //GET USER
  async findOne(id){

    return id;
  }

  //CREATE USER
  async create(data){

    return data;

  }

  //UPDATE USER
  async update(id, data){

      return id, data;
  }

  //DELETE USER
  async delete(id){

    return  id ;
  }
}

module.exports = usersService;

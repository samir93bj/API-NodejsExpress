const boom = require('@hapi/boom');

class usersService {

  constructor(){
  }


  //GET USER
  async find(){

    return [];

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

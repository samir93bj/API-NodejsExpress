const boom = require('@hapi/boom');

class orderService {

  constructor(){
  }


  //GET ORDERS
  async find(){

    return [];

  }

  //GET ORDER
  async findOne(id){

    return id;
  }

  //CREATE ORDER
  async create(data){

    return data;

  }

  //UPDATE ORDER
  async update(id, data){

      return id, data;
  }

  //DELETE ORDER
  async delete(id){

    return  id ;
  }
}

module.exports = orderService;

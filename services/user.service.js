const boom = require('@hapi/boom');
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

  //CREATE USER
  async create(data){
    const newUser = await models.User.create(data);
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

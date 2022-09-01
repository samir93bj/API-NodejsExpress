const { models } = require('./../libs/sequalize');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

class CustomerService {
  constructor (){

  }

  //GET CUSTOMERS
  async find(){
    const customers = await models.Customer.findAll({
      include:['user']
    });
    return customers;
  }

  //GET CUSTOMER
  async findOne(id){
    const customer = await models.Customer.findByPk(id);

    if(!customer){
      throw boom.notFound('Customer not found');
    };

    return customer;
  }

  //CREATE CUSTOMER
  async create(data){

    const passwordHash = await bcrypt.hash(data.user.password , 10);

    const newData ={
      ...data,
      user: {
        ...data.user,
        password : passwordHash
      }
    }

    const customer = await models.Customer.create(newData, {
      include:['user']
    });

    delete customer.user.dataValues.password

    return customer;
  }

  //CRETE MASSIVE
  async bulkCreate(data){

    const bulkData = await models.Customer.bulkCreate(data);
    return bulkData;

  }

  //PATCH CUSTOMER
  async patch(id, data){

    const customer = await this.findOne(id);

    if(data.userId){
      const user = await models.User.findByPk(data.userId);

        if(!user){
          throw boom.notFound('user not found');
        }

    }

    const customerUpdate = await customer.update(data);

    return customerUpdate;
  }

  //DELETE CUSTOMER
  async delete(id){

    const customer = await this.findOne(id);
    await customer.destroy();
    return {id};
  }
}

module.exports = CustomerService;

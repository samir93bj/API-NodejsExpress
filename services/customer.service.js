const { models } = require('./../libs/sequalize');
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
    const customer = await models.Customer.findByPk(id, {
      include:['user','orders']
    });

    if(!customer){
      throw boom.notFound('Customer not found');
    };

    return customer;
  }

  //CREATE CUSTOMER
  async create(data){

    const customer = await models.Customer.create(data, {
      include:['user']
    });

    return customer;
  }

  //PATCH CUSTOMER
  async patch(id, data){

    const customer = await this.findOne(id);
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

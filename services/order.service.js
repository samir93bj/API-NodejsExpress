const boom = require('@hapi/boom');
const { models } = require('./../libs/sequalize');

class orderService {

  constructor(){
  }


  //GET ORDERS
  async find(){

    const orders = await models.Order.findAll({
      include:['customer']
    });
    return orders;

  }

  //GET ORDER
  async findOne(id){

    const order = await models.Order.findByPk(id,{
      include:[{
        association: 'customer',
        include:['user']}]
    })

    if(!order){
      throw boom.notFound('Customer not found');
    };

    return order;
  }

  //CREATE ORDER
  async create(data){

    const newOrder = models.Order.create(data);

    if(!order){
      throw boom.notFound('Customer not found');
    };

    return newOrder;

  }

  //UPDATE ORDER
  async patch(id, data){

      const order = await this.findOne(id);
      const orderUpdate = await order.update(data);

      return orderUpdate;
  }

  //DELETE ORDER
  async delete(id){

    const order = await this.findOne(id);
    await order.destroy();
    return { id } ;
  }
}

module.exports = orderService;

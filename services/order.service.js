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
        include:['user']},
        'items'
      ]
    })

    if(!order){
      throw boom.notFound('Customer not found');
    };

    return order;
  }

  //GET MY-ORDER
  async findByUser(user){

    const orders = models.Order.findAll({
      where:{'$customer.user.id$':user},
      include:[{
      association: 'customer',
      include:['user']},
      'items'
    ]});

    return orders;
  }

  //CREATE ORDER
  async create(data){

    const customer = await models.Customer.findOne({ where: {'$user.id$' : data.userId },include: ['user']});

    if (!customer) {
      throw boom.badRequest('Customer not found');
    }

    const newOrder = await models.Order.create({customerId: customer.id});

    return newOrder;

  }

  //ADD ITEM
  async addItem(data){

    const newItem = await models.OrderProduct.create(data);
    return newItem;

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

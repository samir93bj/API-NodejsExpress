const { UserSchemna, User } = require('./user.model');
const { ProductSchema, Product } = require('./product.model');
const { CategorySchema, Category } = require('./category.model');
const { CustomerSchema, Customer } = require('./customer.model');
const { OrderSchema, Order } = require('./order.model');
const { OrderProductSchema, OrderProduct } = require('./order-product.model');

function setupModels(sequalize){
  User.init(UserSchemna, User.config(sequalize));
  Product.init(ProductSchema, Product.config(sequalize));
  Category.init(CategorySchema, Category.config(sequalize));
  Customer.init(CustomerSchema, Customer.config(sequalize));
  Order.init(OrderSchema, Order.config(sequalize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequalize));

  User.associate(sequalize.models);
  Customer.associate(sequalize.models);

  Category.associate(sequalize.models);
  Product.associate(sequalize.models);

  Order.associate(sequalize.models);

}


module.exports = setupModels;

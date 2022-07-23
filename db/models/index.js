const { UserSchemna, User } = require('./user.model');
const { ProductSchema, Product } = require('./product.model');
const { CategorySchema, Category } = require('./category.model');
const { CustomerSchema, Customer } = require('./customer.model');

function setupModels(sequalize){
  User.init(UserSchemna, User.config(sequalize));
  Product.init(ProductSchema, Product.config(sequalize));
  Category.init(CategorySchema, Category.config(sequalize));
  Customer.init(CustomerSchema, Customer.config(sequalize));

  User.associate(sequalize.models);
  Customer.associate(sequalize.models);

  Category.associate(sequalize.models);
  Product.associate(sequalize.models);
}


module.exports = setupModels;

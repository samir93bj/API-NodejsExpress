const { UserSchemna, User } = require('./user.model');
const { ProductSchema, Product } = require('./product.model');
const { CategorySchema, Category } = require('./category.model');

function setupModels(sequalize){
  User.init(UserSchemna, User.config(sequalize));
  Product.init(ProductSchema, Product.config(sequalize));
  Category.init(CategorySchema, Category.config(sequalize));
}


module.exports = setupModels;

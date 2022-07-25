'use strict';
const {ProductSchema , PRODUCT_TABLE} = require('../models/product.model');
const {CategorySchema , CATEGORY_TABLE} = require('../models/category.model');

module.exports = {
  async up (queryInterface) {

    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);

  },

  async down (queryInterface) {

    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);

  }
};

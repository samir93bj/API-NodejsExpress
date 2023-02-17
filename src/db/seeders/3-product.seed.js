const { PRODUCT_TABLE } = require('../models/product.model')

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: 'Jean Naranja',
        price: 2500,
        image: 'http://image.com',
        category_id: 1,
        created_at: new Date()
      },
      {
        name: 'Jean Azul',
        price: 2500,
        image: 'http://image.com',
        category_id: 1,
        created_at: new Date()
      },
      {
        name: 'Jean Verde',
        price: 2500,
        image: 'http://image.com',
        category_id: 1,
        created_at: new Date()
      },
      {
        name: 'Remera Negra',
        price: 1000,
        image: 'http://image.com',
        category_id: 2,
        created_at: new Date()
      },
      {
        name: 'Remera Azul',
        price: 1000,
        image: 'http://image.com',
        category_id: 2,
        created_at: new Date()
      },
      {
        name: 'Remera Verde',
        price: 1000,
        image: 'http://image.com',
        category_id: 2,
        created_at: new Date()
      },
      {
        name: 'Chomba Azul',
        price: 3000,
        image: 'http://image.com',
        category_id: 3,
        created_at: new Date()
      },
      {
        name: 'Chomba Verde',
        price: 3000,
        image: 'http://image.com',
        category_id: 3,
        created_at: new Date()
      },
      {
        name: 'Chomba Negra',
        price: 3000,
        image: 'http://image.com',
        category_id: 3,
        created_at: new Date()
      },
      {
        name: 'Camisa Gris',
        price: 4000,
        image: 'http://image.com',
        category_id: 4,
        created_at: new Date()
      },
      {
        name: 'Camisa Azul',
        price: 4000,
        image: 'http://image.com',
        category_id: 4,
        created_at: new Date()
      },
      {
        name: 'Camisa Negra',
        price: 4000,
        image: 'http://image.com',
        category_id: 4,
        created_at: new Date()
      }
    ])
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {})
  }
}

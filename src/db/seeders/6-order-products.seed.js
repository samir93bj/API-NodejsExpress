const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model')

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkInsert(ORDER_PRODUCT_TABLE, [{
      order_id: 1,
      product_id: 9,
      amount: 2,
      created_at: new Date()
    },
    {
      order_id: 1,
      product_id: 8,
      amount: 2,
      created_at: new Date()
    },
    {
      order_id: 2,
      product_id: 6,
      amount: 2,
      created_at: new Date()
    },
    {
      order_id: 3,
      product_id: 1,
      amount: 2,
      created_at: new Date()
    },
    {
      order_id: 3,
      product_id: 7,
      amount: 1,
      created_at: new Date()
    },
    {
      order_id: 3,
      product_id: 3,
      amount: 2,
      created_at: new Date()
    },
    {
      order_id: 4,
      product_id: 9,
      amount: 5,
      created_at: new Date()
    },
    {
      order_id: 4,
      product_id: 12,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 4,
      product_id: 11,
      amount: 1,
      created_at: new Date()
    },
    {
      order_id: 4,
      product_id: 10,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 5,
      product_id: 4,
      amount: 2,
      created_at: new Date()
    },
    {
      order_id: 5,
      product_id: 5,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 5,
      product_id: 5,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 6,
      product_id: 5,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 7,
      product_id: 5,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 7,
      product_id: 5,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 7,
      product_id: 5,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 8,
      product_id: 5,
      amount: 3,
      created_at: new Date()
    },
    {
      order_id: 8,
      product_id: 5,
      amount: 3,
      created_at: new Date()
    }
    ])
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkDelete(ORDER_PRODUCT_TABLE, null, {})
  }
}

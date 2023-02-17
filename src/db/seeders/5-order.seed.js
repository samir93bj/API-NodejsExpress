const { ORDER_TABLE } = require('../models/order.model')

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkInsert(ORDER_TABLE, [{
      customer_id: 1,
      created_at: new Date()
    },
    {
      customer_id: 1,
      created_at: new Date()
    },
    {
      customer_id: 2,
      created_at: new Date()
    },
    {
      customer_id: 3,
      created_at: new Date()
    },
    {
      customer_id: 3,
      created_at: new Date()
    },
    {
      customer_id: 4,
      created_at: new Date()
    },
    {
      customer_id: 4,
      created_at: new Date()
    },
    {
      customer_id: 4,
      created_at: new Date()
    }
    ])
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkDelete(ORDER_TABLE, null, {})
  }
}

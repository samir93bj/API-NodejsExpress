const { CUSTOMER_TABLE } = require('../models/customer.model')

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkInsert(CUSTOMER_TABLE, [{
      name: 'Samir',
      last_name: 'Mahmud',
      phone: '+549223366581',
      created_at: new Date(),
      user_id: 3
    },
    {
      name: 'Pablo Martin',
      last_name: 'Mahmud',
      phone: '+549222222256',
      created_at: new Date(),
      user_id: 4
    },
    {
      name: 'Javier Elias',
      last_name: 'Mahmud',
      phone: '+65332159998',
      created_at: new Date(),
      user_id: 5
    },
    {
      name: 'Marcos Francisco',
      last_name: 'Mahmud',
      phone: '+549223366665',
      created_at: new Date(),
      user_id: 6
    }
    ])
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkDelete(CUSTOMER_TABLE, null, {})
  }
}

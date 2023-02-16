const CATEGORY_TABLE = require('../models/category.model')

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(CATEGORY_TABLE, [{
      name: 'Jeans',
      image: 'https://image.com/jeans.png',
      created_at: new Date()
    },
    {
      name: 'Remeras',
      image: 'https://image.com/remeras.png',
      created_at: new Date()
    },
    {
      name: 'Chombas',
      image: 'https://image.com/chombas.png',
      created_at: new Date()
    },
    {
      name: 'Camisas',
      image: 'https://image.com/camisas.png',
      created_at: new Date()
    }])
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {})
  }
}

const { USER_TABLE } = require('../models/user.model')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    const passwordPlain = 'adminadmin'
    const passwordEncrypt = await bcrypt.hash(passwordPlain, 10)

    return queryInterface.bulkInsert(USER_TABLE, [{
      email: 'admin@domain.com',
      password: passwordEncrypt,
      role: 'admin',
      created_at: new Date()
    }])
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context
    }

    return queryInterface.bulkDelete(USER_TABLE, null, {})
  }
}

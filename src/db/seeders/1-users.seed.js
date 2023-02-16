const USER_TABLE = require('../models/user.model')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface) => {
    const passwordPlain = 'UserExample'
    const passwordEncrypt = await bcrypt.hash(passwordPlain, 10)

    return queryInterface.bulkInsert(USER_TABLE, [{
      email: 'admin@domain.com',
      password: passwordEncrypt,
      role: 'admin',
      created_at: new Date()
    }])
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(USER_TABLE, null, {})
  }
}

const { models } = require('../../../src/libs/sequalize')

const UserSeed = async () => {
  return await models.User.create({
    email: 'admin@domain.com',
    password: 'adminadmin',
    role: 'admin'
  })
}

module.exports = UserSeed

const sequelize = require('../../../src/libs/sequalize')
const CategorySeed = require('./category.seed')
const ProductSeed = require('./product.seed')
const UserSeed = require('./user.seed')

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true })
    await UserSeed()
    await CategorySeed()
    await ProductSeed()
  } catch (err) {
    console.error(err)
  }
}

const downSeed = async () => {
  await sequelize.drop()
}

module.exports = { upSeed, downSeed }

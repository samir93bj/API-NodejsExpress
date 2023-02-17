const sequelize = require('../../../src/libs/sequalize')
const { Umzug, SequelizeStorage } = require('umzug')

const umzug = new Umzug({
  migrations: { glob: './src/db/seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: undefined
})

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true })
    await umzug.up()
  } catch (err) {
    console.log(err)
  }
}

const downSeed = async () => {
  await sequelize.drop()
}

module.exports = { upSeed, downSeed }

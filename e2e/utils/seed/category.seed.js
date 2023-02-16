const { models } = require('../../../src/libs/sequalize')

const CategorySeed = async () => {
  return await models.Category.bulkCreate([
    {
      name: 'Jeans',
      image: 'https://image.com/jeans.png'
    },
    {
      name: 'Remeras',
      image: 'https://image.com/remeras.png'
    },
    {
      name: 'Chombas',
      image: 'https://image.com/chombas.png'
    },
    {
      name: 'Camisas',
      image: 'https://image.com/camisas.png'
    }
  ])
}

module.exports = CategorySeed

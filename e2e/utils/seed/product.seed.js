const { models } = require('../../../src/libs/sequalize')

const ProductSeed = async () => {
  return await models.Product.bulkCreate([
    {
      name: 'Jean Naranja',
      price: 2500,
      image: 'http://image.com',
      categoryId: 1
    },
    {
      name: 'Remera Negra',
      price: 1000,
      image: 'http://image.com',
      categoryId: 2
    },
    {
      name: 'Chomba Azul',
      price: 1000,
      image: 'http://image.com',
      categoryId: 2
    },
    {
      name: 'Camisa Gris',
      price: 1000,
      image: 'http://image.com',
      categoryId: 2
    }
  ])
}

module.exports = ProductSeed

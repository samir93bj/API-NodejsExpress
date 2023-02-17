const request = require('supertest')
const createApp = require('../../src/app')
const { models } = require('../../src/libs/sequalize')
const { upSeed, downSeed } = require('../utils/umzug/umzug')

/*
  TODO: Agragar los test faltantes de productos
*/

describe('test for /product path', () => {
  let app
  let api
  let server

  beforeAll(async () => {
    app = createApp()
    api = request(app)
    server = app.listen(3005)

    await upSeed()
  })

  describe('GET /product', () => {
    test('should return a products', async () => {
      const products = await models.Product.findAll()

      const { statusCode, body } = await api.get('/api/v1/products')

      expect(statusCode).toEqual(200)
      expect(body.products.length).toEqual(products.length)
      expect(body.products[0].category).toBeTruthy()
    })

    test('should return 2 products with limit = 2 and offset = 0', async () => {
      const limit = 2
      const offset = 0

      const { statusCode, body } = await api.get(`/api/v1/products?limit=${limit}&offset=${offset}`)

      expect(statusCode).toEqual(200)
      expect(body.products.length).toEqual(2)
    })

    test('should return 2 products with limit = 2 and offset = 2', async () => {
      const limit = 2
      const offset = 2

      const { statusCode, body } = await api.get(`/api/v1/products?limit=${limit}&offset=${offset}`)

      expect(statusCode).toEqual(200)
      expect(body.products.length).toEqual(2)
    })
  })

  afterAll(async () => {
    await downSeed()
    server.close()
  })
})

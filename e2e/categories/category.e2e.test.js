const request = require('supertest')
const createApp = require('../../src/app')
const { models } = require('../../src/libs/sequalize')
const { upSeed, downSeed } = require('../utils/umzug/umzug')

describe('test for /categories path', () => {
  let app
  let api
  let server
  let getAuthToken
  let user

  beforeAll(async () => {
    app = createApp()
    api = request(app)
    server = app.listen(3005)
    await upSeed()

    user = await models.User.findByPk(1)
    const inputData = {
      email: user.email,
      password: 'adminadmin'
    }

    getAuthToken = await api.post('/api/v1/auth/login').send(inputData)
  })

  describe('POST /categories', () => {
    test('should return 401 with token null', async () => {
      const newCategory = {
        name: 'Chomba',
        image: 'https://www.test.com/jeans'
      }

      const response = await api.post('/api/v1/categories').send(newCategory)
      expect(response.statusCode).toEqual(401)
    })

    test('should return 200 with create category', async () => {
      const token = getAuthToken.body.token

      const newCategory = {
        name: 'Chomba',
        image: 'https://www.test.com/jeans'
      }

      const { body, statusCode } = await api.post('/api/v1/categories').set({ Authorization: `Bearer ${token}` }).send(newCategory)
      const categoryCreated = await models.Category.findOne({ where: { name: 'Chomba' } })

      expect(statusCode).toEqual(201)
      expect(categoryCreated.id).toBe(body.category.id)
    })
  })

  describe('GET /categories', () => {
    test('should return a 200, list categories', async () => {
      const response = await api.get('/api/v1/categories')

      expect(response.statusCode).toEqual(200)
      expect(response.body.message).toBe('Categories List')
      expect(Array.isArray([response.body.categories])).toBe(true)
    })
  })

  afterAll(async () => {
    await downSeed()
    server.close()
  })
})

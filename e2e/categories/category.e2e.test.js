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
    test('should return 401', async () => {
      const user = await models.User.findByPk(1)
      const response = await api.get(`/api/v1/users/${user.id}`)
      expect(response.statusCode).toEqual(401)
    })
  })

  describe('GET /categories', () => {
    test('should return a 200, list categories', async () => {
      const token = getAuthToken.body.token

      const response = await api.get('/api/v1/categories').set({ Authorization: `Bearer ${token}` })

      expect(response.statusCode).toEqual(200)
      expect(response.body.message).toBe('Categories List')
    })
  })

  afterAll(async () => {
    await downSeed()
    server.close()
  })
})

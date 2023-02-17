const request = require('supertest')
const createApp = require('../../src/app')
const { models } = require('../../src/libs/sequalize')
const { upSeed, downSeed } = require('../utils/umzug/umzug')

let app
let api
let server
let getAuthToken
let user

beforeAll(async () => {
  await upSeed()

  app = createApp()
  api = request(app)
  server = app.listen(3005)

  user = await models.User.findByPk(1)
  const inputData = {
    email: user.email,
    password: 'adminadmin'
  }

  getAuthToken = await api.post('/api/v1/auth/login').send(inputData)
})

afterAll(async () => {
  await downSeed()

  server.close()
})

describe('GET /users/{id}', () => {
  test('should return a 400 Bad Request with invalid type value id', async () => {
    const token = getAuthToken.body.token
    const input = 'a'
    // eslint-disable-next-line quote-props
    const response = await api.get(`/api/v1/users/${input}`).set({ 'Authorization': `Bearer ${token}` })

    expect(response.statusCode).toEqual(400)
    expect(response.body.message).toMatch('must be a number')
  })

  test('should return a 400 Bad Request with user id inexistent', async () => {
    const token = getAuthToken.body.token
    const input = 250
    const response = await api.get(`/api/v1/users/${input}`).set({ Authorization: `Bearer ${token}` })

    expect(response.statusCode).toEqual(404)
    expect(response.body.message).toMatch('User not found')
  })

  test('should return a 200, User by id', async () => {
    const token = getAuthToken.body.token

    const response = await api.get(`/api/v1/users/${user.id}`).set({ Authorization: `Bearer ${token}` })

    expect(response.statusCode).toEqual(200)
    expect(response.body.user.id).toEqual(user.id)
    expect(response.body.user.email).toEqual(user.email)
    expect(response.body.user.role).toEqual(user.role)
  })
})

describe('POST /users', () => {
  test('Should return a 400 Bad Request with invalid password', async () => {
    const token = getAuthToken.body.token
    const inputData = {
      email: 'test@example.com',
      password: '-----'
    }

    const response = await api.post('/api/v1/users').send(inputData).set({ Authorization: `Bearer ${token}` })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toMatch('pass')
  })

  test('Should return a 400 Bad Request to create user with invalid email', async () => {
    const token = getAuthToken.body.token
    const inputData = {
      email: '----------',
      password: 'testtest'
    }

    const response = await api.post('/api/v1/users').send(inputData).set({ Authorization: `Bearer ${token}` })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toMatch('email')
  })

  test('Should return a 200 success creation user', async () => {
    const token = getAuthToken.body.token
    const inputData = {
      email: 'test@example.com',
      password: 'testtest'
    }

    const response = await api.post('/api/v1/users').send(inputData).set({ Authorization: `Bearer ${token}` })
    expect(response.statusCode).toBe(200)

    const newUser = await models.User.findByPk(response.body.user.id)
    expect(newUser).toBeTruthy()
    expect(newUser.email).toEqual(inputData.email)
    expect(newUser.role).toEqual('customer')
  })
})

describe('DELETE /users', () => {
  test('Should delete by id', async () => {
    const token = getAuthToken.body.token
    const user = await models.User.findByPk(1)

    const response = await api.delete(`/api/v1/users/${user.id}`).set({ Authorization: `Bearer ${token}` })
    expect(response.statusCode).toBe(200)
  })
})

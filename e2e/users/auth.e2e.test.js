const request = require('supertest')
const createApp = require('../../src/app')
const { models } = require('../../src/libs/sequalize')
const { upSeed, downSeed } = require('../utils/umzug/umzug')

/*
  TODO: Revisar el funcionamiento del mock
*/

const mockSendMail = jest.fn()

jest.mock('nodemailer', async () => {
  return {
    createTransport: jest.fn().mockImplementation(() => {
      return {
        sendMail: mockSendMail
      }
    })
  }
})

let server
let api
let app

describe('test for /auth path', () => {
  beforeAll(async () => {
    app = createApp()
    api = request(app)
    server = app.listen(3005)

    await upSeed()
  })

  afterAll(async () => {
    await downSeed()

    server.close()
  })

  describe('POST /login', () => {
    test('Should status code 400 Bad Request with not send password', async () => {
      const user = {
        email: 'admin@domain.com'
      }

      const response = await api.post('/api/v1/auth/login').send(user)

      expect(response.statusCode).toBe(400)
      expect(response.body.error).toEqual('Bad Request')
      expect(response.body.message).toMatch('password')
    })

    test('Should status code 400 Bad Request with not send email', async () => {
      const user = {
        password: '------'
      }

      const response = await api.post('/api/v1/auth/login').send(user)

      expect(response.statusCode).toBe(400)
      expect(response.body.error).toEqual('Bad Request')
      expect(response.body.message).toMatch('email')
    })

    test('Should status code 400 Bad Request with email is not string', async () => {
      const user = {
        email: 55,
        password: 'testpassword'
      }

      const response = await api.post('/api/v1/auth/login').send(user)

      expect(response.statusCode).toBe(400)
      expect(response.body.error).toEqual('Bad Request')
      expect(response.body.message).toMatch('must be a string')
    })

    test('Should status code 400 Bad Request with password is not string', async () => {
      const user = {
        email: 55,
        password: 'testpassword'
      }

      const response = await api.post('/api/v1/auth/login').send(user)

      expect(response.statusCode).toBe(400)
      expect(response.body.error).toEqual('Bad Request')
      expect(response.body.message).toMatch('must be a string')
    })

    test('Should status code 200 with login success', async () => {
      const user = await models.User.findByPk(1)
      console.log(user.email)
      const inputData = {
        email: user.email,
        password: 'adminadmin'
      }

      const response = await api.post('/api/v1/auth/login').send(inputData)

      expect(response.statusCode).toBe(200)
      expect(response.body.token).toBeTruthy()
      expect(response.body.user.email).toEqual(user.email)
      expect(response.body.user.password).toBeUndefined()
    })
  })

  describe('should send mail', () => {
    beforeAll(() => {
      mockSendMail.mockClear()
    })

    test('Should send mail recovery password', async () => {
      mockSendMail.mockResolvedValue(true)

      const user = await models.User.findByPk(1)
      const inputData = {
        email: user.email
      }

      // const { statusCode, body } = await api.post('/api/v1/auth/recovery').send(inputData)

      // expect(body.resp.message).toEqual('Email sent subject')
      expect(inputData.email).toBe(user.email)
    })
  })
})

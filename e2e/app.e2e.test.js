const request = require('supertest')
const createApp = require('../src/app')
const { upSeed, downSeed } = require('./utils/umzug/umzug')

let app
let api
let server

describe('test for app', () => {
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

  test('should GET /products', async () => {
    const response = await api.get('/api/v1/products?priceMin=0&priceMax=15000')
    expect(response).toBeTruthy()
    expect(response.headers['content-type']).toMatch('/json')
    expect(response.status).toBe(200)
  })
})

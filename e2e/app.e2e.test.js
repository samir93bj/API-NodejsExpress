const request = require('supertest')
const express = require('express')

const app = express()
const api = request(app)
let server

app.get('/hello', (req, res) => {
  res.status(200).json({ name: 'Samir Mahmud' })
})

beforeAll(() => {
  server = app.listen(3000)
})

afterAll(done => {
  server.close()
  done()
})

describe('test for app', () => {
  test('should GET /hello', async () => {
    const response = await api.get('/hello')
    expect(response).toBeTruthy()
    expect(response.headers['content-type']).toMatch('/json')
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Samir Mahmud')
  })
})

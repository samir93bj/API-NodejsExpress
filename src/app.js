const cors = require('cors')
const express = require('express')
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')
const fileUpload = require('express-fileupload')
const passport = require('passport')

const createApp = () => {
  const app = express()

  app.use(express.json())

  const whiteList = ['http://192.168.100.5:3000', 'http://localhost:3000', 'https://myapp.co']
  const options = {
    origin: (origin, callback) => {
      if (whiteList.includes(origin) || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Access denied'))
      }
    }
  }
  app.use(cors(options))

  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
  }))

  app.get('/', (req, res) => {
    res.send('Server on')
  })

  require('./utils/auth')
  app.use(passport.initialize())

  routerApi(app)

  app.use(logErrors)
  app.use(boomErrorHandler)
  app.use(ormErrorHandler)
  app.use(errorHandler)

  return app
}

module.exports = createApp

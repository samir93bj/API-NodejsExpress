const createApp = require('./app')
const port = process.env.PORT || 3000
const app = createApp()

app.listen(port, () => {
  console.log('Aplicacion corriendo en: http://' + process.env.IP + ':' + port + '/api/' + process.env.VERSION)
})

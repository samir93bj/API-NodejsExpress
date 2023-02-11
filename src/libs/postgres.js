const { Client } = require('pg')

async function getConnection () {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'platzi',
    password: 'admin123'
  })

  await client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })

  return client
}

module.exports = getConnection

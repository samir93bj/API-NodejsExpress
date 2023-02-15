const env = process.env.NODE_ENV || 'dev'
const envs = {
  dev: '.env',
  e2e: '.env.e2e'
}

const options = {}

if (envs[env]) {
  options.path = envs[env]
}

require('dotenv').config(options)

const config = {
  env,
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  cloudinaryUrl: process.env.CLOUDINARY_URL
}

console.log(config)

module.exports = { config }

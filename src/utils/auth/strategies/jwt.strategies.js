const { Strategy, ExtractJwt } = require('passport-jwt')
const { config } = require('./../../../config/config')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extraemos el token bearer
  secretOrKey: config.JWT_SECRET
}

const jwtStrategy = new Strategy(options, (payload, done) => { // seteamos options + payload
  return done(null, payload)
})

module.exports = jwtStrategy

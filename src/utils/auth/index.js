const passport = require('passport')

const localStrategy = require('../auth/strategies/local.strategies')
const jwtStrategy = require('../auth/strategies/jwt.strategies')

passport.use(localStrategy)
passport.use(jwtStrategy)

const passport = require('passport');

const localStrategy = require('../auth/strategies/local.strategies');

passport.use(localStrategy);


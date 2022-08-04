const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('./../../../config/config');

const options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : config.JWT_SECRET
};

const jwtStrategy = new Strategy(options, (payload,done) => {
    return done(null, payload);
});

module.exports = jwtStrategy;

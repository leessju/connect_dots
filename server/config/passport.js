const JwtStrategy    = require('passport-jwt').Strategy;
const ExtractJwt     = require('passport-jwt').ExtractJwt;
const mongoose       = require('mongoose');
const User           = mongoose.model('User');
const { JWT_SECRET } = require('./keys');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey    = JWT_SECRET;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user)
          return done(null, jwt_payload);
        return done(null, false);
      })
      .catch(err =>  {
        console.log(err);
      });
  }));
}
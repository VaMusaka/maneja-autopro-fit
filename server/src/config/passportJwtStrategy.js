const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const { models } = require('mongoose')
const fs = require('fs')
const path = require("path");

const { User } = models
const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'), 'utf8')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = publicKey

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, ({ _id }, done) => {
      User.findById(_id)
        .then(user => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => done(null, err))
    })
  )
}

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../routes/user/user-model');

module.exports = function(passport,app){
    let opts = {};
    
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
    opts.secretOrKey = "openjwtkey";
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        let User = new UserModel(app)
        User.findById(jwt_payload._id, (err, user) => {
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
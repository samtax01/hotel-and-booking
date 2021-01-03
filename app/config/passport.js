const passport = require('passport');
const user = require('../models/user');

const jwt = require('jwt-simple');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const AuthRepository = require('../repositories/AuthRepository');
const config = require(__base +  'config');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        const response = await (new AuthRepository()).login(email, password);
        if (("error" in response)) return done(null, response);
        done(null, {token: jwt.encode(response.user, config.authSecret), user: response.user});
    }));

passport.use(new BearerStrategy((token, done) => {
    try {
        const {email} = jwt.decode(token, config.authSecret);

        const {phone_number} = jwt.decode(token, config.authSecret);
        if(phone_number){
        user.findOne({phone_number: phone_number})
            .then((user) => {
                (!user) ? done(null, false) : done(null, user);
            }).catch(done);
        }else{
            user.findOne({email: email})
            .then((user) => {
                (!user) ? done(null, false) : done(null, user);
            }).catch(done);

        }
        
    } catch (error) {
        done(null, false);
    }
}));

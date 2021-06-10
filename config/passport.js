const mongoose = require('mongoose');
//const passport = require('passport');
//const LocalStrategy = require('passport-local');
//const userModel = require('./models/Users')

const userModel = mongoose.model('Users');
const LocalStrategy = require('passport-local').Strategy
const sanitize = require('mongo-sanitize')


const initalize = passport => {
    const authenticateUser = (email, password, done) => {

        /**
         * Sanitize user input first
         */
        email = sanitize(email)
        password = sanitize(password)

        /**
         * Check if user exists and get user data from database
         */
        userModel.findOne({email}, async (err, user) => {
            if(user === null){
                return done(null, false, {message: 'email or password incorrect'})
            }
    
            try{
                /**
                 * decrypt stored password and compare it with the login password 
                 */
                if(await user.validatePassword(password)){
                    return done(null, user)
                }
                else{
                    return done(null, false, {message: 'email or password incorrect'})
                }
            }
            catch (e) {
                return done(e)
            }
        })
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))

    /**
     * Get User ID and set it in session cookie
     */
    passport.serializeUser((user, done) => done(null, user._id))

    /**
     * Get User data from ID in the session cookie
     */
    passport.deserializeUser((_id, done) => {
        userModel.findById(_id, (err, user) => {
            done(null, user)
        })
    })
}

module.exports = initalize;


// passport.use(new LocalStrategy({
//   usernameField: 'user[email]',
//   passwordField: 'user[password]',
// }, (email, password, done) => {
//   Users.findOne({ email })
//     .then((user) => {
//       if(!user || !user.validatePassword(password)) {
//         return done(null, false, { errors: { 'email or password': 'is invalid' } });
//       }

//       return done(null, user);
//     }).catch(done);
// }));
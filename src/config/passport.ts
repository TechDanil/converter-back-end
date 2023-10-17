import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/User';
import { IUser } from '../shared/user.type';

passport.use('byUsernameAndPassword', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,    
}, (username, password, done) => {
    User.verifyByUsernameAndPassword(username, password)
        .then(user => done(null, user as IUser))
        .catch(err => done(err, false, err.message));
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_SECRET, 
}, ({ username }, done) => {
    User.findOne({ phoneNumber: username })
        .then(user => {
            if (!user) return done(null, false, 'This user has been deleted or changed. Please, login again.');
            return done(null, user);
        })
        .catch(err => done(err));
}));
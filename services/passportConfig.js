    const   passport =         require("passport");
    const   LocalStrategy =    require("passport-local").Strategy;
    const   User =             require("../models/User");
    const   FacebookStrategy = require('passport-facebook').Strategy;

// PASSPORT LOCAL Strategy configuration.

       passport.serializeUser((user, done)=>{
          done(null, user.id);
        });
        passport.deserializeUser((id, done)=>{
          User.getUserById(id, function(err, user) {
            done(err, user);
          });
        });
      passport.use(new LocalStrategy(
        async (username, password, done) => {
          await User.getUserByUsername(username, (err, user) => {
            if(err) throw err;
            if(!user){ console.log('Unknown User')
              return done(null, false, {message: 'Unknown User'});
            }
            User.comparePassword(password, user.password, function(err, isMatch){
              if(err) throw err;
           	  if(isMatch){
           	    return done(null, user);
           	  } else {
             	  console.log('Invalid password')
             	  return done(null, false, {message: 'Invalid password'});
           	}
           });
         });
        }
      ));

    // //  PASSPORT FACEBOOK LOGIN CONFIGURATION
    //
    // passport.use(new FacebookStrategy({
    // 	clientID: process.env.FB_ID,
    // 	clientSecret: process.env.FB_SECRET,
    // 	callbackURL: 'api/auth/facebook/callback',
    // 	profileFields: ['id', 'emails', 'name'],
    // 	proxy:true
    // }, async (accessToken, refreshToken, profile, done) => {
    // 	// console.log(accessToken, refreshToken, profile)
    // 	const existingUser = await User.findOne({fbId: profile.id});
    // 		if (existingUser) {
    // 			console.log('User exist with following FBID: ' + existingUser)
    // 			done(null, existingUser)
    // 		} else {
    // 			console.log('User was created with following FBID: ' + profile.id)
    // 			const user = await new User({fbId: profile.id}).save()
    // 			done(null, user)
    // 		}
    // }));

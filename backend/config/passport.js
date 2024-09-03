const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, emails, displayName, photos } = profile;

      try {
        let user = await User.findOne({ googleId: id });

        if (!user) {
          user = await User.create({
            googleId: id,
            email: emails[0].value,
            username: displayName,
            image: photos[0].value,
          });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });

        // Return the user and token separately
        return done(null, user); // Serialize only the user

      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize the user ID into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session using the ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Attach the user object to req.user
  } catch (err) {
    done(err, null);
  }
});

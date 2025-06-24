import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/UserModel.js";


passport.use(
  new GoogleStrategy(
    {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://cleanngreen.onrender.com/api/auth/google/callback", // Hardcode HTTPS
  // callbackURL: "http://localhost:5000/api/auth/google/callback",
  proxy: true, // Required for Render/Heroku
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log("in passport")

        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            googleId: profile.id,
          });
        }
        return done(null, user);
      } catch (error) {
        throw new Error("Failed to Login with Google");
      }
    }
  )
);

// FILENAME: auth
// PURPOSE: Defines the authentication for users.
// 
// DATE: 04/08/2023
// AUTHOR: Kaleb Chisholm
// ----------------------------------------------------------------------------
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/userSchema.js");

// Maps the passport fields to the names of fields in database
const localOpt = {
  usernameField: "email",
  passwordField: "password",
};

// Define the strategy for validating login
const strategy = new LocalStrategy(localOpt, async (email, password, done) => {
  try {
    // Find the user in the DB associated with this email
    const userChosen = await UserModel.findOne({ email: email });

    if (!userChosen) {
      return done(null, false, { message: "Email not found" });
    }

    const validate = await userChosen.isValidPassword(password);

    if (!validate) {
      return done(null, false, { message: "Wrong Password" });
    }

    // Send the user information to the next middleware
    return done(null, userChosen, { message: "Logged in Successfully" });
  } catch (error) {
    return done(error);
  }
});

passport.use("localLogin", strategy);

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser((email, done) => {
  UserModel.findOne({ email: email })
    .then((user) => done(null, user));
});

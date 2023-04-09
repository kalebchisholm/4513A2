// FILENAME: index
// PURPOSE: Defines the main logic for the app. It's main purpose is to 
//          have a login page and a home page. The home page is accessed
//          by logging in as a valid and authenticated user. 
// 
// DATE: 04/08/2023
// AUTHOR: Kaleb Chisholm
// ----------------------------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
const movieRouter = require("./routers/movieRouter");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const passport = require("passport");
const helper = require("./scripts/helpers.js");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const opt = { useNewUrlParser: true, useUnifiedTopology: true };

// set up the passport authentication
require("./scripts/auth.js");

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_CONNECTION, opt).then(() => {
  const app = express();

	app.set('view engine', 'ejs');

  app.use(express.static(__dirname + '/public'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
  
	// Express session
	app.use(cookieParser("oreos"));
	app.use(
		session({
			secret: process.env.SECRET,
			resave: true,
			saveUninitialized: true,
		})
	);

	// Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// use express flash, which will be used for passing messages
	app.use(flash());

  app.use("/api", movieRouter);

  app.get("/", helper.ensureAuthenticated, (req, res) => {
    res.render("home.ejs", { user: req.user });
  });

  app.get("/api", helper.ensureAuthenticated, (req, res) => {
    res.render("home.ejs", { user: req.user });
  });

  app.get("/login", (req, res) => {
    res.render("login.ejs", { message: req.flash("error") });
  });

  app.post("/login", async (req, resp, next) => {
    // use passport authentication to see if valid login
    passport.authenticate("localLogin", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, resp, next);
  });

  app.get("/logout", (req, resp) => {
    req.logout((err) => {
			if (err) { 
				console.log(err);
			}
		});
    req.flash("info", "You were logged out");
    resp.render("login.ejs", { message: req.flash("info") });
  });

  app.listen(8080, () => {
    console.log("Server has started!");
  });
});

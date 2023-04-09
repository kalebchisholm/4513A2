// FILENAME: movieRouter
// PURPOSE: Defines the routes for the API
// 
// DATE: 04/08/2023
// AUTHOR: Kaleb Chisholm
// ----------------------------------------------------------------------------
const express = require("express");
const movieRouter = express.Router();
const MovieSchema = require('../models/movieSchema');
const helper = require('../scripts/helpers');

// Get all movies
movieRouter.get("/movies", helper.ensureAuthenticated, async (req, res) => {
	const movies = await MovieSchema.find();
  console.log(movies);
  if (movies.length != 0) {
    res.json(movies);
  } else {
    res.json("No movies available");
  }
});

// Get movies up to limit
movieRouter.get("/movies/limit/:num", helper.ensureAuthenticated, async (req, res) => {
  const limit = req.params.num;

  if (limit < 1 || limit > 200) {
    res.json("Invalid limit: Use values between 1 and 200");
  } else {
    const movies = await MovieSchema.find().limit(limit);
    console.log(movies);

    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.json("No movies available");
    }

  }
});

// Get movie by ID
movieRouter.get("/movies/:id", helper.ensureAuthenticated, async (req, res) => {
	const movies = await MovieSchema.find({ id: req.params.id });
  console.log(movies);
  console.log([]);
  if (movies.length != 0) {
    res.json(movies);
  } else {
    res.json("No movie available");
  }
});

// Get movie by tmdb ID
movieRouter.get("/movies/tmdb/:id", helper.ensureAuthenticated, async (req, res) => {
	const movies = await MovieSchema.find({ tmdb_id: req.params.id });
  console.log(movies);
  if (movies.length != 0) {
    res.json(movies);
  } else {
    res.json("No movies available");
  }
});

// Get movies by year
movieRouter.get("/movies/year/:min/:max", helper.ensureAuthenticated, async (req, res) => {
	const movies = await MovieSchema.find();

  const filtered = movies.filter(function (movie) {
    return (
      parseInt(req.params.max) >= parseInt(movie.release_date.slice(0, 4)) &&
      parseInt(movie.release_date.slice(0, 4)) >= parseInt(req.params.min)
    );
  });

  console.log(filtered);
  if (filtered.length != 0) {
    res.json(filtered);
  } else {
    res.json("No movies available");
  }
});

// Get movies by rating
movieRouter.get("/movies/ratings/:min/:max", helper.ensureAuthenticated, async (req, res) => {
	const movies = await MovieSchema.find({ "ratings.average": { $gt: req.params.min, $lt: req.params.max } });
  console.log(movies);
  if (movies.length != 0) {
    res.json(movies);
  } else {
    res.json("No movies available");
  }
});

// Get movies by title
movieRouter.get("/movies/title/:text", helper.ensureAuthenticated, async (req, res) => {
	const movies = await MovieSchema.find({ title: { $regex: req.params.text }});
  console.log(movies);
  if (movies.length != 0) {
    res.json(movies);
  } else {
    res.json("No movies available");
  }
});

// Get movies by genre
movieRouter.get("/movies/genre/:name", helper.ensureAuthenticated, async (req, res) => {
	const movies = await MovieSchema.find({ "details.genres.name": { $regex: req.params.name }});
  console.log(movies.length);
  if (movies.length != 0) {
    res.json(movies);
  } else {
    res.json("No movies available");
  }
});

module.exports = movieRouter;
const express = require("express");
const movieRouter = express.Router();
const MovieSchema = require('../models/movieSchema');

// Get all movies
movieRouter.get("/movies", async (req, res) => {
	const movies = await MovieSchema.find();
  console.log(movies);
	res.json(movies);
});

// Get movies up to limit
movieRouter.get("/movies/limit/:num", async (req, res) => {
  const limit = req.params.num;

  if (limit < 1 || limit > 200) {
    res.json("Invalid limit: Use values between 1 and 200");
  } else {
    const movies = await MovieSchema.find().limit(limit);
    console.log(movies);
    res.json(movies);
  }
});

// Get movie by ID
movieRouter.get("/movies/:id", async (req, res) => {
	const movies = await MovieSchema.find({ id: req.params.id });
  console.log(movies);
  res.json(movies);
});

// Get movie by tmdb ID
movieRouter.get("/movies/tmdb/:id", async (req, res) => {
	const movies = await MovieSchema.find({ tmdb_id: req.params.id });
  console.log(movies);
  res.json(movies);
});

// Get movies by year
movieRouter.get("/movies/year/:min/:max", async (req, res) => {
	const movies = await MovieSchema.find();

  const filtered = movies.filter(function (movie) {
    return (
      req.params.max >= movie.release_date.slice(0, 4) &&
      movie.release_date.slice(0, 4) >= req.params.min
    );
  });

  console.log(filtered);
  res.json(filtered);
});

// Get movies by rating
movieRouter.get("/movies/ratings/:min/:max", async (req, res) => {
	const movies = await MovieSchema.find({ "ratings.average": { $gt: req.params.min, $lt: req.params.max } });
  console.log(movies);
  res.json(movies);
});

// Get movies by title
movieRouter.get("/movies/title/:text", async (req, res) => {
	const movies = await MovieSchema.find({ title: { $regex: req.params.text }});
  console.log(movies);
  res.json(movies);
});

// Get movies by genre
movieRouter.get("/movies/genre/:name", async (req, res) => {
	const movies = await MovieSchema.find({ "details.genres.name": { $regex: req.params.name }});
  console.log(movies);
  res.json(movies);
});

module.exports = movieRouter;
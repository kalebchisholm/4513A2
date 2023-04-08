const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  "id": Number,
  "tmdb_id": Number,
  "imdb_id": String,
  "release_date": String,
  "title": String,
  "runtime": Number,
  "revenue": Number,
  "tagline": String,
  "poster": String,
  "backdrop": String,
  "ratings": { "popularity": mongoose.Schema.Types.Decimal128, "average": mongoose.Schema.Types.Decimal128, "count": Number },
  "details": {
    "overview": String,
    "genres": [{ "id": Number, "name": String }]
  }
});

module.exports = mongoose.model("movie", movieSchema);
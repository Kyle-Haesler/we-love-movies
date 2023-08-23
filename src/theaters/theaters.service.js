const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
// Movie Reduction
const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
});

// Functions
function listAllMoviesPerTheater() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .then(reduceMovies);
}

function listTheatersShowingSpecificMovie(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ "mt.movie_id": movieId });
}

// Exports
module.exports = {
  listAllMoviesPerTheater,
  listTheatersShowingSpecificMovie,
};

const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// add critic category for one review
const addCriticCategory = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});
// Functions
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .update(updatedReview, "*")
    .where({ "r.review_id": updatedReview.review_id });
}

function readReviewWithCritic(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": reviewId })
    .first()
    .then(addCriticCategory);
}

function listReviewsWithCriticForMovie(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId })
    .then((results) => results.map(addCriticCategory));
}
function list() {
  return knex("reviews").select("*");
}
// Exports
module.exports = {
  destroy,
  read,
  update,
  readReviewWithCritic,
  listReviewsWithCriticForMovie,
  list,
};

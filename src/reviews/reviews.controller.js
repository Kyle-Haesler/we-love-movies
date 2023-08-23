const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// Validation middleware
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const foundReview = await service.read(Number(reviewId));
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}
//Middleware Functions
async function destroy(req, res, next) {
  const { reviewId } = req.params;
  const data = await service.destroy(Number(reviewId));
  res.sendStatus(204);
}

async function update(req, res, next) {
  const time = new Date().toISOString();
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
    updated_at: time,
  };

  await service.update(updatedReview);
  const data = await service.readReviewWithCritic(res.locals.review.review_id);
  res.json({ data });
}

async function list(req, res, next) {
  const { movieId } = req.params;
  const data = movieId
    ? await service.listReviewsWithCriticForMovie(movieId)
    : await service.list();
  res.json({ data });
}
// Exports
module.exports = {
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  list: [asyncErrorBoundary(list)],
};

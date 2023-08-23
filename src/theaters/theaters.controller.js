const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
// Functions
async function list(req, res, next) {
  const { movieId } = req.params;
  const data = movieId
    ? await service.listTheatersShowingSpecificMovie(movieId)
    : await service.listAllMoviesPerTheater();

  res.json({ data });
}
// Exports
module.exports = {
  list: [asyncErrorBoundary(list)],
};

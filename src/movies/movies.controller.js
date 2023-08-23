const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// Validation middleware
async function movieExists(req, res, next){
    const {movieId} = req.params
    const foundMovie = await service.read(Number(movieId))
    if(foundMovie){
        res.locals.movie = foundMovie
        return next()
    }
    next({
        status: 404,
        message: "Movie cannot be found"
    })
}

function read(req, res, next){
    const {movie: data} = res.locals
    res.json({data})
}



async function list(req, res, next) {
    const showing = req.query.is_showing
    const data = showing ? await service.listAllShowingMovies(): await service.list();
    res.json({data})
  }


module.exports = {
list: [asyncErrorBoundary(list)],
read: [asyncErrorBoundary(movieExists), read],
movieExists,


}
const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function reviewExists(req, res, next){
    const {reviewId} = req.params
    const foundReview = await service.read(Number(reviewId))
    if(foundReview){
        return next()
    }
    next({
        status: 404,
        message: "Review cannot be found."
    })
}

async function destroy(req, res, next){
    const {reviewId} = req.params
    const data = await service.destroy(Number(reviewId))
    res.sendStatus(204)
}






module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]

}
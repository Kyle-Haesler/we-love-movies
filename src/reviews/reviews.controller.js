const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function reviewExists(req, res, next){
    const {reviewId} = req.params
    const foundReview = await service.read(Number(reviewId))
    if(foundReview){
        res.locals.review = foundReview
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

async function update(req, res, next){
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
      };
      const data = await service.update(updatedReview)
      res.json({data})
      
}

async function getAllCriticsData(req, res, next){
    const data = await service.getAllCriticsData()
    res.json({data})
}





module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    getAll: [asyncErrorBoundary(getAllCriticsData)]

}
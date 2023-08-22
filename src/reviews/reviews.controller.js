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
    const time = new Date().toISOString()
    const updatedReview = {
        ...res.locals.review,
         ...req.body.data,
        review_id: res.locals.review.review_id,
        updated_at: time

      }
     
     
      
      await service.update(updatedReview);
      const data = await service.readUpdateWithCritic(res.locals.review.review_id)
      res.json({data})
}





module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    
    

}
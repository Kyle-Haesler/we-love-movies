const router = require("express").Router()
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")


router.route("/:reviewId").delete(controller.delete)


module.exports = router
const router = require("express").Router()
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")


router.route("/:movieId").get(controller.read)
router.route("/").get(controller.list)



module.exports = router
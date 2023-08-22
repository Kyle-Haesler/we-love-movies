if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const moviesRouter = require("./movies/movies.router")


app.use(cors())
app.use(express.json())
app.use("/movies", moviesRouter)


// Not Found Handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: `${req.originalUrl} does not exist`
    })
})
// Central Error Handler
app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong!'} = err
    res.status(status).json({error: message})
})

module.exports = app;

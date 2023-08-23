# we-love-movies

RESTful API located: https://we-love-movies-backend-dyav.onrender.com

Routes

GET
/movies : returns all movies
/movies?is_showing : returns all movies currently showing in theaters
/movies/:movieId : returns single movie by ID
/movies/:movieId/theaters : returns all theaters where movie is showing
/movies/:movieId/reviews : returns all reviews for that movie
/theaters : returns all theaters and movies playing at each theater

DELETE
/reviews/:reviewId : deletes a review

PUT
/reviews/:reviewId : updates review



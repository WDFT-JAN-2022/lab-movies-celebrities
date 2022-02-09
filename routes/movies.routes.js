// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res) => {
  Celebrity.find()
    .then((allCelebs) => {
      res.render("../views/movies/new-movie", {
        celebrities: allCelebs,
      });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/create", (req, res) => {
  const movie = req.body;
  Movie.create(movie)
    .then((newMovie) => {
      console.log("Creation was  succesful", newMovie);
      res.redirect("/movies/all-movies");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((results) => {
      res.render("movies/movies", { allMovies: results });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;

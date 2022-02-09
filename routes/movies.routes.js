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

router.get("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((results) => {
      res.render("movies/movie-details", { results });
    })
    .catch((err) => {
      console.log("something went wrong finding the movie", err);
      res.redirect("/movies");
    });
});

router.post("/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(res.redirect("/movies/movies"))
    .catch(error => console.error(error));
});

router.get("/:id/edit", async (req, res) => {

  const celebrity = await Celebrity.find()
  const movie = await Movie.findById(req.params.id)

  try { res.render('movies/edit-movie', { celebrity, movie }) }
  catch (error) { console.log(error) }

});

router.post("/:id/edit", (req, res) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(res.redirect("/movies"))
    .catch(err => console.error(err));
});

module.exports = router;

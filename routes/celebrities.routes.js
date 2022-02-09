// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
  .then((results) => {
    console.log("new celebrity wooo!", results)
    res.redirect('/celebrities/celebrities')
  })
  .catch(err => {
    console.log("error adding new celebrity", err)
    res.render('celebrities/new-celebrity')
  })
})

router.get("/celebrities", (req, res) => {
    console.log("Celebrities")
  Celebrity.find()
    .then((allCelebs) => {
      console.log("All Celebs", allCelebs);
      res.render("celebrities/celebrities", { celebs: allCelebs });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
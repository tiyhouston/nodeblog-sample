const express = require("express");
const app = express();
const mustache = require("mustache-express");
const models = require("./models");
const faker = require("faker");
const bodyParser = require("body-parser");
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.listen(3000, function(){
  console.log("YAY! http://0.0.0.0:3000")
})

// Insert some data
// // for (var i = 0; i < 5; i++) {
//   const article = models.Article.build({
//     title: faker.company.bs(),
//     text: faker.hacker.phrase(),
//     publishedAt: faker.date.past()
//   })
//   article.title = "Sup"
//   article.save()
// }


app.get('/', function(req, res){

  models.Article.findAll().then(function(articles){
    res.render("index", {
      articles: articles
    });
  })
})

app.get('/compose', function(req, res){
  res.render("compose")
})

app.get('/articles/:id', function(req, res){
  models.Article.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(article){
    res.render("article", {
      article: article
    })
  })
})

app.get('/articles/:id/edit', function(req, res){
  models.Article.findOne({
    where: {
      id: req.params.id
    }
  }).then( function(article){
    res.render("articleEdit", {
      article: article
    })
  })
})

app.post('/articles', function(req, res){

  const article = models.Article.build({
    title: req.body.title,
    text: req.body.text
  })
  article.save()
    .then(function(){
      res.redirect("/")
    })
    .catch(function(bigErrorThing){

      res.render("compose", {
        article: article,
        errors: bigErrorThing.errors
      })
    })
})

app.post("/articles/:id", function(req, res){
  models.Article.findOne({
    where: {
      id: req.params.id
    }
  }).then( function(article){
    // article.update(req.body)
    article.text = req.body.text;
    article.title = req.body.title;
    article.save()
    .then( function(){
      res.redirect(`/articles/${article.id}`)
    })
    .catch(function(bigErrorThing){
      res.render("articleEdit", {
        article: article,
        errors: bigErrorThing.errors
      })
    })
  })

})

app.post("/articles/:id/delete", function(req, res){
  models.Article.findOne({
    where: {
      id: req.params.id
    }
  }).then( function(article){
    article.destroy().then( function(){
      res.redirect("/")
    })
  })
})

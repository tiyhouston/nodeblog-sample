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
app.post('/articles', function(req, res){

  const article = models.Article.build({
    title: req.body.title,
    text: req.body.text
  })
  article.save().then(function(){
    res.redirect("/")
  })
})

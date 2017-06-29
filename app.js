const express = require("express");
const app = express();
const mustache = require("mustache-express");
const models = require("./models");
const faker = require("faker");
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static('public'))
app.listen(3000, function(){
  console.log("YAY! http://0.0.0.0:3000")
})

app.get('/', function(req, res){

  const articles = [];
  for (var i = 0; i < 5; i++) {

    const article = {
      title: faker.company.bs(),
      text: faker.hacker.phrase()
    }
    articles.push(article)
  }

  res.render("index", {
    articles: articles
  });
})

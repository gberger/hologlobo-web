require('dotenv').load();
var express = require('express');
var exphbs  = require('express-handlebars');
var cfenv = require('cfenv');
var _ = require('lodash');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var appEnv = cfenv.getAppEnv();

MongoClient.connect(process.env.MONGODB_URL, function(err, db) {
  if (err) console.log(err);

  var collection = db.collection('holograms');
});


var app = express();
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  var holograms = [
    {
      name: "Flamengo vs Fluminense",
      category: "Esportes"
    }, {
      name: "Angel",
      category: "Novelas"
    }
  ]
  res.render('home', {holograms: holograms});
})

app.listen(process.env.PORT || appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});

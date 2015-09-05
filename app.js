require('dotenv').load();
var express = require('express');
var cfenv = require('cfenv');
var _ = require('lodash');
var mongodb = require('mongodb')

var MongoClient = mongodb.MongoClient;
var appEnv = cfenv.getAppEnv();

MongoClient.connect(process.env.MONGODB_URL, function(err, db) {
  if (err) console.log(err);

  var collection = db.collection('test');
});


var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});

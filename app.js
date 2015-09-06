require('dotenv').load();
var express = require('express');
var exphbs  = require('express-handlebars');
var cfenv = require('cfenv');
var _ = require('lodash');
var mongoose = require('mongoose');
var morgan = require('morgan');

var appEnv = cfenv.getAppEnv();

var connect = function () {
  mongoose.connect(process.env.MONGODB_URL);
};
connect();
mongoose.connection.on('connected', console.log.bind(console, "connected to mongodb"));
mongoose.connection.on('error', console.log.bind(console));
mongoose.connection.on('disconnected', connect);

require('./models/hologram.js');


var app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var apiRouter = express.Router();
require('./routes/api/holograms.js')(apiRouter);
app.use('/api', apiRouter);

var staticRouter = express.Router();
require('./routes/holograms.js')(staticRouter);
app.use('/', staticRouter);


app.listen(process.env.PORT || appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
});


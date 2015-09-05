var express = require('express');
var cfenv = require('cfenv');
var _ = require('lodash');

var appEnv = cfenv.getAppEnv();

var environment = process.env.NODE_ENV;
if (appEnv.isLocal) {
  var envVars = require('./env.json');
  process.env.MONGODB_URI = envVars.VCAP_SERVICES['user-provided'][0].credentials.uri;
  process.env.MONGODB_PORT = envVars.VCAP_SERVICES['user-provided'][0].credentials.port;
  process.env.MONGODB_USER = envVars.VCAP_SERVICES['user-provided'][0].credentials.user;
  process.env.MONGODB_PASSWORD = envVars.VCAP_SERVICES['user-provided'][0].credentials.password;
} else {
  process.env.MONGODB_URI = appEnv.VCAP_SERVICES['user-provided'][0].credentials.uri;
  process.env.MONGODB_PORT = appEnv.VCAP_SERVICES['user-provided'][0].credentials.port;
  process.env.MONGODB_USER = appEnv.VCAP_SERVICES['user-provided'][0].credentials.user;
  process.env.MONGODB_PASSWORD = appEnv.VCAP_SERVICES['user-provided'][0].credentials.password;
}

var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(appEnv.port, function() {
  console.log("server starting on " + appEnv.url);
  console.log(process.env.MONGODB_USER);
});

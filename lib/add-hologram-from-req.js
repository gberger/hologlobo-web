var moment = require('moment');
var mongoose = require('mongoose');
var multiparty = require('multiparty');
var Hologram = mongoose.model('Hologram');

module.exports = function(req, cb) {
  var hologram = new Hologram();
  var form = new multiparty.Form();
  var m = moment();

  form.on('field', function(name, value) {
    if (name == "date") {
      var parts = value.split('-');
      m.set('year', parts[0]);
      m.set('month', parts[1]);
      m.set('day', parts[2]);
    } else if (name == "time") {
      var parts = value.split(':');
      m.set('hours', parts[0]);
      m.set('minutes', parts[1]);
    } else {
      hologram[name] = value;
    }
  });

  form.on('part', function(part) {
    hologram.addFile(part.name, part);
  });

  form.on('error', function(err) {
    res.send(err);
  });

  form.on('close', function() {
    hologram.save(function(err) {
      if (err)
        res.send(err);
      cb(hologram);
    });
  });

  form.parse(req);
}

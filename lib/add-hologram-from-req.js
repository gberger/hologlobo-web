var mongoose = require('mongoose');
var multiparty = require('multiparty');
var Hologram = mongoose.model('Hologram');

module.exports = function(req, cb) {
  var hologram = new Hologram();
  var form = new multiparty.Form();

  form.on('field', function(name, value) {
    hologram[name] = value;
  });

  form.on('part', function(part) {
    if (!part.filename) return;
    hologram.addFile(part.name, part);
  });

  form.on('error', function(err) {
    res.send(err);
  });

  form.on('close', function() {
    hologram.save(function(err) {
      if (err)
        res.send(err);
      cb();
    });
  });

  form.parse(req);
}

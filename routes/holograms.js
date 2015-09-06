var mongoose = require('mongoose');
var Hologram = mongoose.model('Hologram');

var addHologramFromReq = require('../lib/add-hologram-from-req.js');

module.exports = function(router) {
  router.route('/holograms')

  .get(function(req, res) {
    Hologram.find(function(err, holograms) {
      if (err)
        res.send(err);
      res.render('holograms', {holograms: holograms});
    });
  })

  .post(function(req, res) {
    addHologramFromReq(req, function() {
      res.redirect('/holograms');
    })
  });
}
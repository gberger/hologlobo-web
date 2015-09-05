var mongoose = require('mongoose');
var Hologram = mongoose.model('Hologram');

module.exports = function(router) {
  router.route('/holograms')

  .get(function(req, res) {
    Hologram.find(function(err, holograms) {
      if (err)
        res.send(err);
      res.json(holograms);
    });
  })

  .post(function(req, res) {    
    var hologram = new Hologram();
    hologram.name = req.body.name;
    hologram.category = req.body.category;

    hologram.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Hologram created' });
    });
  });

  router.route('/holograms/:hologram_id')

  .get(function(req, res) {
    Hologram.findById(req.params.hologram_id, function(err, hologram) {
      if (err)
        res.send(err);
      res.json(hologram);
    });
  })

  .put(function(req, res) {
    Hologram.findById(req.params.hologram_id, function(err, hologram) {

      if (err)
        res.send(err);

      hologram.name = req.body.name;
      hologram.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Hologram updated' });
      });
    });
  })

  .delete(function(req, res) {
    Hologram.remove({
      _id: req.params.hologram_id
    }, function(err, hologram) {
      if (err)
        res.send(err);

      res.json({ message: 'Hologram deleted' });
    });
  });

  return router;
};

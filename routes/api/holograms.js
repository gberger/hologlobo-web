var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var multiparty = require('multiparty');
var Hologram = mongoose.model('Hologram');

var addHologramFromReq = require('../../lib/add-hologram-from-req.js');

var gfs = Grid(mongoose.connection.db, mongoose.mongo);

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
    addHologramFromReq(req, function() {
      res.json({ message: 'Hologram created' });
    });
  });

  router.route('/holograms/:id')

  .get(function(req, res) {
    Hologram.findById(req.params.id, function(err, hologram) {
      if (err)
        res.send(err);
      res.json(hologram);
    });
  })

  .put(function(req, res) {
    var form = new multiparty.Form();

    Hologram.findById(req.params.id, function(err, hologram) {
      if (err)
        res.send(err);

      form.on('field', function(name, value) {
        hologram[name] = value;
      })

      form.on('error', function(err) {
        res.send(err);
      });

      form.on('close', function() {
        hologram.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'Hologram updated' });
        });
      });

      form.parse(req);
    });
  })

  .delete(function(req, res) {
    Hologram.remove({
      _id: req.params.id
    }, function(err, hologram) {
      if (err)
        res.send(err);

      res.json({ message: 'Hologram deleted' });
    });
  });

  router.route('/holograms/:id/model').get(function(req, res) {
    var gfsPath = Hologram.getGfsPathForId(req.params.id) + 'model';
    gfs.createReadStream(gfsPath).pipe(res);
  });

  router.route('/holograms/:id/texture').get(function(req, res) {
    var gfsPath = Hologram.getGfsPathForId(req.params.id) + 'texture';
    gfs.createReadStream(gfsPath).pipe(res);
  });

  return router;
};

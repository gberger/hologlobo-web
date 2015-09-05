var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gfs = Grid(mongoose.connection.db, mongoose.mongo);

var HologramSchema = new Schema({
  name: {type: String, default: '', trim: true},
  category: {type: String, default: '', trim: true},
  description: {type: String, default: '', trim: true},

  gfsModelFilename: {type: String},
  gfsTextureFilename: {type: String},

  timestamp: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}
});

HologramSchema.path('name').required(true, 'O nome não pode estar em branco');
HologramSchema.path('category').required(true, 'Uma categoria deve ser selecionada');

HologramSchema.methods = {
  addFile: function(key, stream) {
    console.log("adding file: " + key);
    var filename = HologramSchema.static.getGfsPathForId(this._id);
    if (key == 'model') {
      filename += 'model';
      this.gfsModelFilename = filename;
    } else if (key == 'texture') {
      filename += 'texture';
      this.gfsTextureFilename = filename;
    } else {
      throw new Error('Invalid key');
    }
    var ws = gfs.createWriteStream({filename: filename});
    stream.pipe(ws);
  }
};

HologramSchema.statics = {
  getGfsPathForId: function(id) {
    return '/hologramfiles/' + id + '/'
  }
}

mongoose.model('Hologram', HologramSchema);

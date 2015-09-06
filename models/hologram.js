var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gfs = Grid(mongoose.connection.db, mongoose.mongo);

var HologramSchema = new Schema({
  name: {type: String, default: '', trim: true},
  category: {type: String, default: '', trim: true},
  description: {type: String, default: '', trim: true},

  hasModel: {type: Boolean, default: false},
  hasMtl: {type: Boolean, default: false},
  hasTexture: {type: Boolean, default: false},

  timestamp: {type: Date, default: Date.now},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

HologramSchema.path('name').required(true, 'O nome não pode estar em branco');
HologramSchema.path('category').required(true, 'Uma categoria deve ser selecionada');

HologramSchema.methods = {
  addFile: function(key, stream) {
    var filename = HologramSchema.statics.getGfsPathForId(this._id);
    if (key == 'model') {
      filename += 'model';
      this.hasModel = true;
    } else if (key == 'mtl') {
      filename += 'mtl';
      this.hasMtl = true;
    } else if (key == 'texture') {
      filename += 'texture';
      this.hasTexture = true;
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
};

HologramSchema.pre('save', function(next){
  now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

mongoose.model('Hologram', HologramSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HologramSchema = new Schema({
  name: {type: String, default: '', trim: true},
  category: {type: String, default: '', trim: true},
  description: {type: String, default: '', trim: true},
  timestamp: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}
});

HologramSchema.path('name').required(true, 'O nome não pode estar em branco');
HologramSchema.path('category').required(true, 'Uma categoria deve ser selecionada');

mongoose.model('Hologram', HologramSchema);

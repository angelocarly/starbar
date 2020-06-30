let mongoose = require('mongoose'), Schema = mongoose.Schema;

let TabSchema = new mongoose.Schema({
  name: String,
  price: Number,
  created: { type: Date, default: Date.now }
});

mongoose.model('MenuEntry', TabSchema);

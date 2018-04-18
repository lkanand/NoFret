const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TabSchema = new Schema({
  title: {
    type: String
  },
  notes: {
  },
  bpm: {
    type: Number,
    min: 1,
    max: 300
  },
  timeSig: {
    type: Number,
    min: 1,
    max: 8
  }
});

const Tab = mongoose.model('Tab', TabSchema);

module.exports = Tab;
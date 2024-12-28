const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  visits: { type: Number, default: 0 },
});

module.exports = mongoose.model('Visit', visitSchema);


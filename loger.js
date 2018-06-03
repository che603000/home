require('./models/log');
const mongoose = require('mongoose');
const Log = mongoose.model('log');

module.exports = options => Log.create(options);
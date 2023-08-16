const mongoose = require('mongoose');


const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  numericData: [{
    type: Number,
    required: true
  }],
  dateData: [{
    type: Date,
    required: true
  }]
});


module.exports = mongoose.model('Sensor', sensorSchema);
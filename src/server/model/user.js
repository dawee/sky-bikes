const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: String,
  uuid: String,
  role: String,
  sessionID: String,
  lastRentStartDate: Date
});

schema.virtual('rentingHoursLeft').get(function() {
  if (!this.lastRentStartDate) {
    return null;
  }

  const realMillisecondsDiff = Date.now() - this.lastRentStartDate.getTime();
  const fakeHoursDiff = realMillisecondsDiff / 2000;

  return fakeHoursDiff >= 8 ? 0 : 8 - fakeHoursDiff;
});

const User = mongoose.model('user', schema);

module.exports = { User };

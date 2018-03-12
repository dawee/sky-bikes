const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/skybikes').then(() => {
  mongoose.connection.db.dropDatabase().then(() => console.log('dropped mongodb://localhost/skybikes'));
  mongoose.connection.close();
});

const mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.load();

  mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true
  });

  mongoose.connection.once('open', () => {
    console.log('MongoDB event open');

    mongoose.connection.on('connected', () => {
      console.log('MongoDB event connected');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB event disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB event reconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.log('MongoDB event error: ' + err);
    });
  });
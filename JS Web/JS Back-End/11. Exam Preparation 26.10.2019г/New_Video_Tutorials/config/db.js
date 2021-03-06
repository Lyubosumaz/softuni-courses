const mongoose = require('mongoose');
const config = require('./config');
const { seed } = require('../utils');

module.exports = () => {
    mongoose.connect(config.dbURL, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('***Database is connected successfully! Everything is ready..***');
    }).catch(err => {
        console.log('Something went terribly wrong');
        console.error(err.message);
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) throw err;
        seed.seedAdminUser()
    });
    db.on('error', reason => {
        console.log(reason);
    });
    return Promise.resolve(db);
};

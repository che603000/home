const mongoose = require('mongoose');
mongoose.Promise = Promise;
const {server: {ip}, db} = require('../config');

//register models
require('./log');

module.exports = () => {
    return mongoose.connect(db, {useMongoClient: true})
        .then(() => {
            const {host, port, name} = mongoose.connections[0];
            console.log(`Connect mongodb server => ${host}:${port}/${name}`);
        })
        .catch(err => console.log("Error connect  mongodb server =>", err.message));
};
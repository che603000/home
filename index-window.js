//pm2 start index.js  --max-memory-restart 35M


const server = require('./server-app');
const db = require('./models');
require('./models/task');

const mongoose = require('mongoose');
const Task = mongoose.model('task');
const {start, cron} = require('./cron');


db()
    .then(()=>Task.create({name:"test"}))
    .then(() => {
    start().then(tasks => {
        //console.log(tasks);
    });
});




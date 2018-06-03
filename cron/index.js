require('../models/log');
require('../models/task');

const path = require('path');
const cron = require('node-cron');
const {init} = require('./handlers');
const mongoose = require('mongoose');
const Task = mongoose.model('task');
const {cron: {tasks}} = require('../config');
const handlerPath = path.resolve('./cron/handlers')

const create = (options, isStart = false) => {
    const {timeStart} = options;
    const hourMinute = timeStart.split(':');
    //const time = `${hourMinute[0]} ${hourMinute[1]} * * *`;
    const time = `${+hourMinute[0]} * * * * *`;
    const handler = require(path.join(handlerPath, options.handler)).handler;
    //const handler = w;
    return cron.schedule(time, () => handler(options), isStart);
};

const loadTasks = () => tasks.filter(t => t.active === true).map(t => new Task(t));
const loadDbTasks = () => Task.find({active: true});

const start = () => Promise.resolve()
    .then(() => init())
    .then(() => loadTasks())
    .then(docs => docs.map(doc => create(doc.toJSON(), true)))
    .then(tasks => {
        console.log("Start cron module. Total task =>", tasks.length);
        return tasks;
    });

module.exports = start;

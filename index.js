//pm2 start index.js  --max-memory-restart 35M


const server = require('./server-app');
const cron = require('./cron');
const db = require('./models');

Promise.resolve()
    .then(() => db())
    .then(() => server())
    .then(() => cron());




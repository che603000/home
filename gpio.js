//pm2 start index.js  --max-memory-restart 35M
const {PINS_AREA} = require('./const/pins');
const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

const writePin = (pin, value) => gpiop.write(pin, value);

const readPin = (pin) => gpiop.read(pin);

const state = (pins) => Promise
    .all(pins.map(pin => readPin(pin).then(value => ({pin, value})).catch(err => ({pin, err, message: err.message}))));

// process.on('SIGINT', () => {
//     Promise.all(clears())
//         .then(() => console.log('exit'))
//         .then(() => process.exit())
//         .catch(err => console.log(err))
// });

module.exports = {writePin, readPin, state};

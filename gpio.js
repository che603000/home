//pm2 start index.js  --max-memory-restart 35M
const {SET_PIN, STATE} = require('./const/command');
const {GRIO} = require('./const/module-name');
const {STATUS_ERROR, STATUS_OK} = require('./const/status');

const gpio = require('rpi-gpio');
const gpiop = gpio.promise;

const writePin = (pin, value) => gpiop.write(pin, value);

const readPin = (pin) => gpiop.read(pin);

const state = (pins) => Promise
    .all(pins.map(pin => readPin(pin).then(value => ({pin, value, module: GRIO, status: STATUS_OK})).catch(err => ({
        pin,
        message: err.message,
        module: GRIO,
        status: STATUS_ERROR
    }))));


const commandHandler = options => {
    const {type, pin, value, pins} = options || {};
    switch (type) {
        case SET_PIN:
            return writePin(pin, value).then(() => ({pin, value, module: GRIO, status: STATUS_OK}));
        case STATE:
            return state(pins);
        default:
            return Promise.resolve();
    }
};

const command = require('./command/model');

command.register(commandHandler);


// process.on('SIGINT', () => {
//     Promise.all(clears())
//         .then(() => console.log('exit'))
//         .then(() => process.exit())
//         .catch(err => console.log(err))
// });

module.exports = {writePin, readPin, state};

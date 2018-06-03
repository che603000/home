const net = require('net');
const client = new net.Socket();

const {server: {ip, port}} = require('./config');
const {PINS_AREA} = require('./const/pins');
const {KEY: key, PING, STATE, SET_PIN} = require('./const/command');


const send = (options) => new Promise((res, rej) => {
    var data;

    client.connect(port, ip, () => {
        client.write(JSON.stringify(options));
    });

    client.on('data', (r) => {
        data = JSON.parse(r);
        client.end();
    });

    client.on('close', function () {
        res(data);
    });

    client.on('error', (err) => {
        console.log(err);
        rej(err);
    });


});

send({key, type: PING, time: Date.now()})
    .then(data => console.log(data))
    .then(() => send({key, type: SET_PIN, pin: 12, value: true}))
    .then(data => console.log(data))
    .then(() => send({key, type: STATE, pins: PINS_AREA}))
    .then(data => console.log(data))
const gpio = require('rpi-gpio');
const command = require('../../command');
const {SET_PIN, KEY: key} = require('../../const/command');

const gpiop = gpio.promise;
const {cron: {handlers: {watering: {areas}}}} = require('../../config');

const init = () => Promise.all(areas.map(({pin}) => {
    console.log("Init watering", pin);
    return gpiop.setup(pin, gpio.DIR_OUT).then(() => gpiop.write(pin, false));
}));

const destroy = () => Promise.all(areas.map(item => gpiop.write(item.pin, false)));

const handler = (options) => {
    const {name, timeRange, area} = options;
    const itemArea = areas.find(a => a.id === area);
    if (itemArea) {
        const {pin} = itemArea;
        command({key, type: SET_PIN, pin, value: true}).then(()=>console.log("start task =>", name))
        //const range = timeRange * 60 * 1000; //ml. sec.
        const range = 20 * 1000; //ml. sec.
        setTimeout(() => {
            command({key, type: SET_PIN, pin, value: false}).then(()=>console.log("stop task =>", name))
        }, range);
    }
};

module.exports = {init, destroy, handler};
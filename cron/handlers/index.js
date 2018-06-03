const {init: initWatering, destroy: destroyWatering} = require('./watering');

const init = () => {
    return Promise.resolve()
        .then(() => initWatering())
        .then(() => console.log('Init handler => watering.'))
};

const destroy = () => {
    return Promise.resolve()
        .then(() => destroyWatering())
};

module.exports = {init, destroy};

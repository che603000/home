const {KEY, PING, STATE, SET_PIN} = require('../const/command');
const loger = require('../loger');

const simpleHandler = options => {
    const {type, time} = options;
    switch (type) {
        case PING:
            return Promise.resolve({ping: Date.now() - time});
        default:
            return Promise.resolve();
    }
};

class Command {


    register(h) {
        this.handlers.push(h);
    }

    run({key, ...options}) {
        if (KEY === key)
            return Promise.all(this.handlers.map(h => h(options))).then(items => items.filter(items => !!items));
        else
            return Promise.reject({message: 'key not valid...'});
    }

    constructor(h = []) {
        this.handlers = h;
    }

}

module.exports = new Command([simpleHandler]);
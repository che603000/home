const {KEY, PING, STATE, SET_PIN} = require('../const/command');
const {state, writePin} = require('../gpio');
const loger = require('../loger');
const cmd = require('./model');

const ping = time => Promise.resolve({ping: Date.now() - time});

const command = (options) => {
    const {type, key, ...params} = options;
    let res;
    if (key === KEY)
        switch (type) {
            case SET_PIN:
                return writePin(params.pin, params.value).then(() => params);
            case STATE :
                return state(params.pins);
            case PING:
                return ping(params.time);
            default:
                return Promise.reject({type, message: 'No know command...'});
        }
    else
        return Promise.reject({message: 'No know key...'});


};


const logCommand = (options) => {
    cmd.run(options).then(p => {
        console.log(p);
    })
    return command(options)
        .then(res => {
            loger({event: 'COMMAND', name: options.type})
            return res;
        })
        .catch(err => {
            loger({event: 'COMMAND ERROR', name: err})
            throw  err;
        })

};

logCommand.register = (h) => {
    cmd.register(h);
};


module.exports = logCommand;





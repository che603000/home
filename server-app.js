const net = require('net');
const command = require('./command');

const {server: {ip, port}} = require('./config');
const parse = (txt) => Promise.resolve().then(() => JSON.parse(txt.toString('utf8')));


module.exports = options => {
    const server = net.createServer(function (socket) {
        socket.on('data', (data) => {
            parse(data)
                .then(data => {console.log(`res=> ${data.type}`); return data;})
                .then(d => command(d))
                .then(res => socket.write(JSON.stringify(res)))
                .catch(err => {
                    console.log({err: err.message, data});
                    socket.write(JSON.stringify({err: err.message}));
                    socket.end();
                });
        });
        socket.on('end', (data) => {
            //console.log('connection close...');
        });
        socket.on('error', function (err) {
            console.log(err);
        });
    });

    server.listen(port, ip, (err) => {
        console.log(`Start server app => ${ip}:${port}`);
    });

    return server;
}


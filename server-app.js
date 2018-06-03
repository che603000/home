const net = require('net');
const command = require('./command');

const {server: {ip, port}} = require('./config');
const parse = (txt) => JSON.parse(txt.toString('utf8'));

module.exports = options => {
    const server = net.createServer(function (socket) {
        socket.on('data', (data) => {
            const action = parse(data);
            command(action)
                .then(res => socket.write(JSON.stringify(res)))
                .then(() => console.log(`res=> ${action.type}`))
                .catch(err => {
                    console.log(err);
                    socket.end()
                });
        });
        socket.on('end', (data) => {
            //console.log('connection close...');
        });
        socket.on('error', function (err) {
            debugger;
            console.log(err);
        });
    });

    server.listen(port, ip, (err) => {
        console.log(`Start server app => ${ip}:${port}`);
    });

    return server;
}


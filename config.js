const path = require('path');

module.exports = {
    server: {
        ip: '127.0.0.1',
        port: 3001
    },
    db: 'mongodb://127.0.0.1/test',
    cron: {
        tasks: [
            // {
            //     "_id" : "5b1431a40e95c801f424f010",
            //     "active" : true,
            //     "name" : "Большой газон ",
            //     "timeStart" : "21:15",
            //     "timeRange" : 10.0,
            //     "area" : 1,
            //     "handler" : "watering"
            // },
            // {
            //     "_id" : "5b1431b80e95c801f424f011",
            //     "active" : true,
            //     "name" : "Малый газон",
            //     "timeStart" : "08:00",
            //     "timeRange" : 10.0,
            //     "area" : 2,
            //     "handler" : "watering"
            // }
        ],
        handlers: {
            watering: {
                areas: [
                    {
                        id: 1,
                        name: "Большой газон",
                        pin: 12,
                    },
                    {
                        id: 2,
                        name: "Малый газон",
                        pin: 16,
                    },
                ]
            }
        },
    }
}
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        default: "Новая задача"
    },
    active: Boolean,
    area: {
        type: Number,
        default: 1
    },
    timeStart: {
        type: String,
        default: "06:00"
    },
    timeRange: {
        type: Number,
        default: 10
    },
    handler: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: () => new Date()
    },
});

mongoose.model('task', schema);
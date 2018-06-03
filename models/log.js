const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    event: String,
    name: String,
    date: {
        type: Date,
        default: () => new Date()
    },
});


// schema.static = {
//     add(data) {
//        return Model.save(data)
//     }
// }

mongoose.model('log', schema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    description: String,
    stats: {
        Boolean,
        default: false
    }
});

module. exports = mongoose.model('tasks', TaskSchema);
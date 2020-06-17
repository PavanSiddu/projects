const mongoose = require('mongoose');
const Todo = mongoose.model('todo', {
    todos: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
})

module.exports = Todo
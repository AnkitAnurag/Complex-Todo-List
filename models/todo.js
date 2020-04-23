const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    item: {
    type: String
    },
    priority: {
    type: Number
    },
    completed: {
    type: Number,
    default: 0
    },
    author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
        }
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
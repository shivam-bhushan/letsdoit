import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        require: true
    },
    userId: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date,
        default: null,
        required: false
    }
})

const Task = mongoose.model("Task", taskSchema);

export default Task;

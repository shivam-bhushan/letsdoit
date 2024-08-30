import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    userId: {
        type: String,
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    completed: {
        type: Boolean,
        require: false,
    }

})

const List = mongoose.model("List", listSchema)
export default List;
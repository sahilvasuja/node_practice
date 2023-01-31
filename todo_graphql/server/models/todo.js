import mongoose from 'mongoose';
const todoSchema=mongoose.Schema({
    Task: String,
    isCompleted: Boolean
})
const todoGraphql=mongoose.model("Graphqltodo",todoSchema);
export default todoGraphql;
import { mongoose } from "mongoose";
const schema=mongoose.Schema;
const todo=new schema({
    Task:String,
    isCompleted:Boolean
})
const todos=new mongoose.model("Graphqlhasuratodo",todo)
export default todos

// import mongoose from "mongoose";
// const schema=mongoose.Schema;
// const todoSchema=new schema({
//     todo:String,
// });
// const Todo=mongoose.model('todo',todoSchema);
// export default Todo;

// const { default: mongoose } = require("mongoose");

// const todoSchema=mongoose.Schema({
//     task: String,
//     isCompleted: Boolean
// });
// const Todo=new mongoose.model("ReactTodo",todoSchema)
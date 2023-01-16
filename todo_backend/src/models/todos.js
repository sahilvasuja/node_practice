const { default: mongoose } = require("mongoose");

const todoSchema=mongoose.Schema({
    task: String,
    isCompleted: Boolean
});
const Todo=new mongoose.model("Todo",todoSchema)
module.exports=Todo;
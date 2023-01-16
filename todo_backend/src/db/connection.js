const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/todoapp',{

}).then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log(err)
})
import mongoose from "mongoose";
mongoose.set('strictQuery',false)
mongoose.connect("mongodb://localhost:27017/Graphqltodo")
.then(()=>{console.log("mongoose connected")})
.catch((err)=>{
    console.log(err)
})
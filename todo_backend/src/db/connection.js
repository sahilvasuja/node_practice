const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
console.log(process.env.URL,"5")
mongoose.connect(process.env.URL).then(()=>{
    console.log("connection successfull")
}).catch((err)=>{
    console.log(err)
})
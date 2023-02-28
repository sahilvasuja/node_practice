const connection=require('./src/db/connection')
const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express();
const PORT=9000;
app.use(cors())
app.use(express.json());
const path = require("path");
const router=require('./src/mdels/todoschema')
app.listen(PORT,()=>{
    console.log(`listening to port no. ${PORT} `);
})
const connection=require('./src/db/connection')
const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express();
const PORT=9000;
app.use(cors())
app.use(express.json());
const path = require("path");
const NextTodo=require('./src/mdels/todoschema')
const router=require('./src/mdels/todoschema')
app.post("/addtodo",async(req,res)=>{
   try{

       console.log(req.body,"12");
     const task=req.body.task;
     const isCompleted=req.body.isCompleted
     const todo=new NextTodo({
       task:task,
       isCompleted:isCompleted
     })
     const todo1=await todo.save();
     const todos=await NextTodo.find();
     console.log(todos,"20");
     res.send(todos);
   }
   catch(err){
    console.log(err,"28");
    res.send(err)
   }
})
app.get('/gettodo',async(req,res)=>{
   const result=await NextTodo.find();
    console.log(result,"34");
    res.send(result)
})
app.delete('/deletetask/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id,"39");
    const result=await NextTodo.findOneAndDelete({_id:id})
    const results=await NextTodo.find();
    res.send(results)
})
app.get('/cleared',async(req,res)=>{
    console.log("object");
  
    const result=await NextTodo.deleteMany({isCompleted:false});
    console.log(result,"39");
    const results=await NextTodo.find();
    res.send(results)
})
app.listen(PORT,()=>{
    console.log(`listening to port no. ${PORT} `);
})
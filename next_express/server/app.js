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
    
    
    const result=await NextTodo.deleteMany({isCompleted:true});
    console.log(result,"39");
    const results=await NextTodo.find();
    res.send(results)
})

app.patch("/check/:id",async(req,res)=>{
    try{
        let id=req.params.id;
        console.log(id,"64")
        let todos=await NextTodo.findById(id);
        todos.isCompleted=true;
        const result=await todos.save()
        console.log(result,"67");
        const Todos=await NextTodo.find();
        console.log(Todos,"69")
        res.send(Todos)
    }
    catch(err){
        console.log('error:', err)
        res.send(err);  
    }
  })
  app.patch("/uncheck/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id,"79")
        let todos=await NextTodo.findById(id);
        todos.isCompleted=false;
        const result= await todos.save();
        console.log(result,"81");
        const Todos=await NextTodo.find();
        console.log(Todos,"121")
      res.send(Todos)
    }
    catch(err){
        console.log('error:', err)
        
    }
  })
// app.patch('/check/:id',async(req,res)=>{
//     const id=req.params.id;
//     const isCompleted=req.params.isCompleted;

//     const result=await NextTodo.findByIdAndUpdate(id,{isCompleted: !isCompleted});
//     res.send(result)
// })
app.get('/activetodo',async(req,res)=>{
    console.log("active backend");
    const result=await NextTodo.find({isCompleted: false})
    console.log(result,"64");
    res.send(result)
})
app.get('/completedtodo',async(req,res)=>{
    console.log("completed backend");
    const result=await NextTodo.find({isCompleted: true})
    console.log(result,"64");
    res.send(result)
})
app.listen(PORT,()=>{
    console.log(`listening to port no. ${PORT} `);
})
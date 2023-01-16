const express = require("express");
const mongoose=require('mongoose')
//  const {connectionDb, getDb} =require('./database.js')
const app = express();
app.use(express.json());
const path = require("path");
const fs = require("fs");
const staticpath = path.join(__dirname, "../public");
console.log(staticpath);
const Todo=require('./models/todos')
require('./db/connection')
// mongoose.set('strictQuery', true);
// app.use(express.json());
app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: true }));

app.get("/gettodos",async(req,res)=>{
    const result=await Todo.find();
    console.log(result,"19");
      res.send(result);
  })
app.post("/addtodo", async (req, res) => {
    try {
console.log(req.body, "44");
const task1=req.body.task;
console.log(task1,"26")
      const isCompleted = req.body.isCompleted;
  
      if (task1.trim()!="") {
        const todo = new Todo({
          task:task1,
          isCompleted: isCompleted
          
        });

        const todo1 = await todo.save();

        const todos=await Todo.find();
        console.log(todos,"38")
        res.send(todos);
      }  
    }
     catch (error) {
      console.log(error,"43");
      res.send(error);
    }
  });
  app.delete("/delete/:id",async(req,res)=>{
    try{
        let id=req.params.id;
        console.log(id,"51");
        let todos=await Todo.findByIdAndDelete(id);
        let todoset=await Todo.find();
        res.send(todoset)
    }
    catch(err){
        console.log(err,"57")
        res.send(err)
    }
  })
  app.patch("/markedcompleted/:id",async(req,res)=>{
    try{
        let id=req.params.id;
        console.log(id,"64")
        let todos=await Todo.findById(id);
        todos.isCompleted=true;
        const result=await todos.save()
        console.log(result,"67");
        const Todos=await Todo.find();
        console.log(Todos,"69")
        res.send(Todos)
    }
    catch(err){
        console.log('error:', err)
          
    }
  })
  app.patch("/uncompleted/:id",async(res,req)=>{
    try{
        const id=req.params.id;
        console.log(id,"79")
        let todos=await Todo.findById(id);
        todos.isCompleted=false;
        const result= await todos.save();
        console.log(result,"81");
        const Todos=await Todo.find();
      res.send(Todos)
    }
    catch(err){
        console.log('error:', err)
        
    }
  })
  app.listen(17000,()=>{
    console.log(`listening to port no. `);
})
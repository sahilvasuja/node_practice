const express = require("express");
const mongoose=require('mongoose')

const dotenv = require('dotenv');
const cors=require('cors')
dotenv.config({ path: "./config.env" });
const PORT=8070;
const app = express();
app.use(cors())
app.use(express.json());
const path = require("path");
const router = express.Router();
app.use(router);
const staticpath = path.join(__dirname, "../public");
console.log(staticpath);
const Todo=require('./models/todo')
require('./db/connection')
app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: false }));
// const {ObjectId}=require('mongodb');
// console.log(ObjectId,"19")
app.get("/gettodos",async(req,res)=>{
    const result=await Todo.find();
    console.log(result,"19");
      res.send(result);
  })
  app.get("/markallcompleted",async(req,res)=>{
    const todos=await Todo.find();
    for(i in todos){
        if(todos[i].isCompleted===false)
      todos[i].isCompleted=true;
      await todos[i].save(); 
      console.log(todos[i]);
 
    }
    res.send(todos);
    
  })
  app.get("/markalluncompleted",async(req,res)=>{
    const todos=await Todo.find();
    for(i in todos){
        if(todos[i].isCompleted==true)
      todos[i].isCompleted=false;
      await todos[i].save(); 
      console.log(todos[i]);
 
    }
    res.send(todos);
    
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
  router.delete("/delete/:id",async(req,res)=>{
    try{
        //  const id=(req.data)
        let id=req.params.id;
        //  console.log((id),"51");
        // const ID = id.trim();

          console.log(id,"80")

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
        res.send(err);  
    }
  })
  app.patch("/uncompleted/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id,"79")
        let todos=await Todo.findById(id);
        todos.isCompleted=false;
        const result= await todos.save();
        console.log(result,"81");
        const Todos=await Todo.find();
        console.log(Todos,"121")
      res.send(Todos)
    }
    catch(err){
        console.log('error:', err)
        
    }
  })
  app.get("/clearcompleted",async(req,res)=>{
    const result=await Todo.remove({isCompleted: true})
    const todos=await Todo.find();
    res.send(todos);
  })
  app.listen(PORT,()=>{
    console.log(`listening to port no. `);
})
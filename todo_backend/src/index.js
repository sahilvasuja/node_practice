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

// let database;
// connectionDb((err)=>{
//     if(!err){
//         app.listen(8000, () => {
          
//             console.log("sever connected");
//           });
//           database=getDb()
//     }
// })
// app.get("/todo_items", async(req,res)=>{
//     let todo=[];
//     database.collection('todo_items').find().
//     forEach(element =>todo.push(element)).then(()=> {
//         res.json(todo)
//     }).catch(err=>{
//         res.json({err: "not found"})
//     })
   
// })
app.get("/gettodos",async(req,res)=>{
    const result=await Todo.find();
    console.log(result,"39");
      res.send(result);
  })
app.post("/addtodo", async (req, res) => {
    try {
console.log(req.body, "44");
const text1=req.body.text;

      const isCompleted = req.body.completed;
  
      if (text1.trim()!="") {
        const todo = new Todo({
          task:text1,
          isCompleted: isCompleted
          
        });
        const todo1 = await todo.save();

        const todos=await Todo.find();
        res.send(todos);
      }  
    }
     catch (error) {
      console.log(error);
      res.send(error);
    }
  });
  app.listen(17000,()=>{
    console.log(`listening to port no. `);
})
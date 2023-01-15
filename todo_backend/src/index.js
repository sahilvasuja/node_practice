const express = require("express");
 const {connectionDb, getDb} =require('./database.js')
const app = express();
const path = require("path");
const fs = require("fs");
const staticpath = path.join(__dirname, "../public");
console.log(staticpath);
// app.use(express.json());
app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: true }));

let database;
connectionDb((err)=>{
    if(!err){
        app.listen(8000, () => {
          
            console.log("sever connected");
          });
          database=getDb()
    }
})
app.get("/todo_items", async(req,res)=>{
    let todo=[];
    database.collection('todo_items').find().
    forEach(element =>todo.push(element)).then(()=> {
        res.json(todo)
    }).catch(err=>{
        res.json({err: "not found"})
    })
   
})

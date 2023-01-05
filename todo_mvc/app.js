const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs')
const staticpath=path.join(__dirname,"../public");
console.log(staticpath);
app.set('view engine','ejs')
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.get("/",function(req,res){
    fs.readFile('database.json', (err, data) => {
        if (err) throw err;
        let jsonData = JSON.parse(data);
        res.render('todo',{name:jsonData})
     });
    
})
app.post("/add_todo",(req,res)=>{
    const result=req.body.todo;
    console.log(result, "14")
    fs.readFile('database.json', (err, data) => {
        if (err) throw err;
        console.log("19",result);
        let jsonData = JSON.parse(data);
        jsonData.push(result);
    fs.writeFile('database.json',JSON.stringify(jsonData), (err) => {
        if (err) throw err;
       
        res.render('todo',{name:jsonData});
      });
     });
})
app.listen(8000,()=>{
    console.log("sever connected")
})
const express= require('express');
const app=express();
const port=9000;
const path=require('path');
const fs=require('fs');
const staticpath=path.join(__dirname,"../public")
app.use(express.static(staticpath));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get("/gettodos",async(req,res)=>{
    try{
        console.log("try",13)
        let resp=await fs.promises.readFile("database.json", "utf8");
        let todos=await JSON.parse(resp);
        res.json(todos);
        console.log(todos,"18");
        // fs.readFile("database.json",(err,data)=>{
        //     if(err) 
        //     throw err;
        //     let jsondata= JSON.parse(data);
        //     console.log(jsondata,"23");
        // })
        console.log(todos,"25");
    }
    catch(err){
        console.log(err,"28");
    }
})
app.post("/addtodo",async(req,res)=>{
    try{
        console.log("try",32)
        const task=req.body.task;
        const isCompleted=req.body.isCompleted;
        let resp=await fs.promises.readFile("database.json","utf8");
        let todos=await JSON.parse(resp);
        let todo={
            task: task,
            isCompleted: isCompleted,
            id: Date.now()
        }
        todos.push(todo);
        await fs.promises.writeFile("database.json", JSON.stringify(todos));
        res.send(todos);
    }
    catch(err){
        console.log(err,"48")
    }
})
app.listen(port,()=>{
    console.log(`server connected to ${port}`)
})
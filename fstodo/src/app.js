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
app.delete("/delete/:id", async(req,res)=>{
    try{
        let resp=await fs.promises.readFile("database.json","utf8");
        let todos=await JSON.parse(resp);
        let id=req.params.id;
        console.log(id,"55")
        const filterdata=todos.filter((items)=>{
            if(items.id!=id){
                return items;
            }
        })
        console.log(filterdata,"60")
        await fs.promises.writeFile("database.json",JSON.stringify(filterdata));
        res.send(filterdata)
    }
    catch(err){
        res.send(err)
    }

})
app.patch('/markedcompleted/:id', async(req,res)=>{
    try{
    let resp=await fs.promises.readFile("database.json","utf8");
    let todos=await JSON.parse(resp);
    let id=req.params.id;
    console.log(id,"75")
    let todo = todos.find(item => item.id === parseInt(id));
    if (todo) {
        console.log("first")
        todo.isCompleted = true;
    }
   await fs.promises.writeFile('database.json',JSON.stringify(todos));
   res.send(todos);
}
  catch(err){
    res.send(err);
  }
})
app.patch('/uncompleted/:id', async(req,res)=>{
    try{
    let resp=await fs.promises.readFile("database.json","utf8");
    let todos=await JSON.parse(resp);
    let id=req.params.id;
    console.log(id,"92")
    let todo = todos.find(item => item.id === parseInt(id));
    if (todo) {
        todo.isCompleted = false;
    }
   await fs.promises.writeFile('database.json',JSON.stringify(todos));
   res.send(todos);
}
  catch(err){
    res.send(err);
  }
})
app.get('/markalluncompleted',async(req,res)=>{
    try{
        let resp=await fs.promises.readFile("database.json","utf8");
        let todos=await JSON.parse(resp);
        for(let i in todos){
        if(todos[i].isCompleted==true)
            todos[i].isCompleted=false;
            console.log(todos[i],"112");
        }
        await fs.promises.writeFile('database.json',JSON.stringify(todos));
        res.send(todos)
    }
    catch(err){
        console.log(err)
    }
})
app.get('/markallcompleted',async(req,res)=>{
    try{
        let resp=await fs.promises.readFile("database.json","utf8");
        let todos=await JSON.parse(resp);
        for(let i in todos){
            if(todos[i].isCompleted==false)
            todos[i].isCompleted=true;
            console.log(todos[i],"113");
        }
        await fs.promises.writeFile('database.json',JSON.stringify(todos));
        res.send(todos)
    }
    catch(err){
        console.log(err)
    }
})
app.get('/clearcompleted',async(req,res)=>{
    try{
        let resp=await fs.promises.readFile("database.json","utf8");
        let todos=await JSON.parse(resp);
        const clear= todos.filter(item => !item.isCompleted);
        await fs.promises.writeFile('database.json',JSON.stringify(clear));
        res.send(clear)
    }
    catch(err){
        console.log(err)
    }
})
app.listen(port,()=>{
    console.log(`server connected to ${port}`)
})
class Todo{
    constructor(task,isCompleted){
        this.task=task,
        this.isCompleted=isCompleted
    }
}
class Mytask{
    constructor(){
        this.todoItems=[];
    }
    icon(){
        console.log(icon)
        let completeditem=0;
        for(let i in this.todoItems){
            if(this.todoItems[i].isCompleted){
                completeditem++;
            }
        }
        if(completeditem==count){
            for(let i in this.todoItems){
                this.todoItems[i].isCompleted=false;
            }
        }
        else{
            for(let i in this.todoItems){
                this.todoItems[i].isCompleted=true;
            }
        }
        this.display()
    }
    count(){
        let count=0;
        // let checkbox=document.getElementById("checkbox")
       for(let i in this.todoItems){

            if(this.todoItems[i].isCompleted==false){
                count++;
            }
            
       }
       console.log(count,"count")
    }
    add(items,e){
        e.preventDefault();
        this.todoItems.push(items)
        // console.log(items,"add")
        this.display()
    }
    remove(index){
        console.log("remove")
        this.todoItems.splice(index,1)
        console.log(this.todoItems)
        this.display()
    }
    checkbox(index){
        if(this.todoItems[index].isCompleted){
            this.todoItems[index].isCompleted=false;
        }
        else{
            this.todoItems[index].isCompleted=true;
        }
        this.display();
    }
    
    display(){
        let additem=document.getElementById("addtodo");
        // console.log(additem,"first")
        additem.innerHTML=""
        // console.log(additem,"second")
        let html=``;
        for(let i in this.todoItems){
            if(this.todoItems[i].isCompleted==true){
                html+=`<div class="inneradd">
                    <input type="checkbox" id="checkbox" onclick="mytask.checkbox(${i})" checked>
                    <p> ${this.todoItems[i].task} </p>
                    <p id="cross">X</p>
                    </div>
                `
            }
            else{
                html+=` <div class="inneradd"> 
                <input type="checkbox" id="checkbox" onclick="mytask.checkbox(${i})">
                <p> ${this.todoItems[i].task} </p>
                <p id="cross" onclick="mytask.remove(${i})">X</p>
                </div>
                
            `
            }
        }
        this.count();
        // console.log(html,"html")
        additem.innerHTML = html
    }
    all(){
        console.log("all")
        mytask.display();
    }
    active(){
        let html=""
        for(let i in this.todoItems){
            if(this.todoItems[i].isCompleted==false){
                html+=` <div class="inneradd"> 
                <input type="checkbox" id="checkbox" onclick="mytask.checkbox(${i})">
                <p> ${this.todoItems[i].task} </p>
                <p id="cross" onclick="mytask.remove(${i})">X</p>
                </div>
                `
            }
        }
        this.display()
        console.log(this.todoItems,"act")
    }
    completed(){
        let html=""
        for(let i in this.todoItems){
            if(this.todoItems[i].isCompleted==true){
                html+=` <div class="inneradd"> 
                <input type="checkbox" id="checkbox" onclick="mytask.checkbox()" checked>
                <p> ${this.todoItems[i].task} </p>
                <p id="cross" onclick="mytask.remove(${i})">X</p>
                </div>
                `
            }
        }
        this.display()
        console.log(this.todoItems,"comp")
    }
    clear(){
        console.log("first, todoItems")
        for(let i in this.todoItems){
            if(this.todoItems[i].isCompleted==true){
                this.todoItems.splice(i,1)
            }
        }
        console.log(this.todoItems,"clear")
         this.display()
    }

}
let text=document.getElementById("text");
// let itemcount=document.getElementById("count");
// itemcount.innerText("56")
let mytask=new Mytask();

text.addEventListener("keydown",(e)=>{
    
    if(e.key === 'Enter' && text.value!=""){
        let task=e.target.value;
        let newTask=new Todo(task,false)
        mytask.add(newTask,e);
        e.target.value=""
    }
   
})
let icon=document.getElementById("icon");
icon.addEventListener("click",function(){
    mytask.icon();
})
let all=document.getElementById("all");
all.addEventListener("click", function(){
    mytask.all();
})
let active=document.getElementById("active");
active.addEventListener("click",function(){
    mytask.active()
})
let completed=document.getElementById("completed");
completed.addEventListener("click",function(){
    mytask.completed()
})
let clear=document.getElementById("clear");
clear.addEventListener("click",function(){
    mytask.clear()
})
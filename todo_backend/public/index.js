let todos = [];
let res = false;
class Todo {
    constructor(text, iscompleted) {
        this.text = text;
        this.iscompleted = iscompleted;
    }
}
class Mytask {
   constructor(){
    this.todoItems=[];
   }
   add(item){
        this.todoItems.push(item);
        mytask.display();
   }
   display(){
        let addtodo=document.getElementById("addtodo");
        addtodo.innerHTML=""
        let html=``;
        if( this.todoItems[i].iscompleted==true){
            html+= `<div class="inneradd">
            <input type="checkbox" id="checkbox"  onclick="mytask.checkbox(${i})" checked>
            <p class="checkline"> ${this.todoItems[i].text} </p>
            <p id="cross" onclick="mytask.remove(${i})">X</p>
            </div> `
        }
        else{
            html+=` <div class="inneradd"> 
                <input type="checkbox" id="checkbox" onclick="mytask.checkbox(${i})">
                <p> ${this.todoItems[i].text} </p>
                <p id="cross" onclick="mytask.remove(${i})">X</p>
                </div>     
            `
        }
        mytask.count();
        addtodo.innerHTML=html;
   }
   remove(index){
        this.todoItems[index].splice(index,1);
        this.display();
    }
    count(){
        let count=0;
        for(let i in this.todoItems){
            if(!this.todoItems[i].iscompleted){
                count++;
            }
        }
    }
    icon(){
        const c=0;
        for(let i in this.todoItems){
            if(this.todoItems[i].iscompleted){
                c++;
            }
        }
        if(c==this.todoItems.length){
            for(let i in this.todoItems){
                this.todoItems[i].iscompleted=false;
            }
        }
        else{
            for(let i in this.todoItems){
                this.todoItems[i].iscompleted=true;
            }
        }
        this.display();
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
    all(){
        console.log("all")
        mytask.display();
    }
    active(){
        let additem=document.getElementById("addtodo");
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
        additem.innerHTML=html
        // this.display()
        console.log(this.todoItems,"act")
    }
    completed(){

        let additem=document.getElementById("addtodo");
        let html=""
        for(let i in this.todoItems){
            if(this.todoItems[i].isCompleted==true){
                html+=` <div class="inneradd"> 
                <input type="checkbox" class="checkline" id="checkbox" onclick="mytask.checkbox()" checked>
                <p class="checkline"> ${this.todoItems[i].task} </p>
                <p id="cross" onclick="mytask.remove(${i})">X</p>
                </div>
                `
            }
        }
        additem.innerHTML=html
        // this.display()
        console.log(this.todoItems,"comp")
    }
    clear(){
        console.log("first", this.todoItems)
        this.todoItems=this.todoItems.filter(function(index){
            
               return !index.isCompleted
            
        })
        console.log(this.todoItems);
        // console.log(index,"clear")
         this.display()
    }
    
}
const input=document.getElementById("text");
const result=input.innerHTML;
console.log(result)
const mytask=new Mytask();
input.addEventListener(keydown,(e)=>{
    if(input=="" || e.key=="enter"){
        let ans=e.target.value;
        let todo=new Todo(ans,false);
        e.target.value="";
        mytask.add(todo);
    }
})
const icon=document.getElementById("icon");
icon.addEventListener(click,function(e){
    mytask.icon();
})
let all=document.getElementById("all");
all.addEventListener("click", function(){
    active.style.border="none"
    completed.style.border="none"
    all.style.border="1px solid rgb(235,216,215)"
    mytask.all();
})
let active=document.getElementById("active");
active.addEventListener("click",function(){
    all.style.border="none"
    completed.style.border="none"
    active.style.border="1px solid rgb(235,216,215)"
    active.style.padding="3px"
    mytask.active()
})
let completed=document.getElementById("completed");
completed.addEventListener("click",function(){
    all.style.border="none"
    active.style.border="none"
    completed.style.border="1px solid rgb(235,216,215)"
    completed.style.padding="3px"
    mytask.completed()
})
let clear=document.getElementById("clear");
clear.addEventListener("click",function(){
    mytask.clear()
})
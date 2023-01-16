
let todos = [];
let res = false;
function getTodos() {
    fetch("/gettodos").then((response) => {
        return response.text();
    }).then((data) => {
        todos = JSON.parse(data);
        console.log(todos ,"9");
        mytask.display();
    })
}
class Todo {
    constructor(task, isCompleted) {
        this.task = task;
        this.isCompleted = isCompleted;
    }
}
class Mytask {
   constructor(){
    // this.todoItems=[];
   }
   add(task) {
    fetch('/addtodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            todos=data;
            // this.todoItems.push(data);
            mytask.display()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      
    }
    remove(index){
        let id=todos[index]._id;
        console.log(id,"45")
        fetch('/delete/'+ id,{
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json',
            // },

        }).then(res=> res.json()).
        then(data=>{
            console.log(data,"54");
            todos=data;
            mytask.display()
        }).catch((err)=>{
            console.log(err,"58")
        })
    }

   display(){
        let addtodo=document.getElementById("addtodo");
        addtodo.innerHTML=""
        let html=``;
        for(let i in todos){
            if( todos[i].isCompleted==true){
                console.log(todos[i],"51")
                html+= `<div class="inneradd">
                <input type="checkbox" id="checkbox"  onclick="mytask.checkbox(event,${i})" checked>
                <p class="checkline"> ${todos[i].task} </p>
                <p id="cross" onclick="mytask.remove(${i})">X</p>
                </div> `
            }
            else{
                html+=` <div class="inneradd"> 
                    <input type="checkbox" id="checkbox" onclick="mytask.checkbox(event,${i})">
                    <p> ${todos[i].task} </p>
                    <p id="cross" onclick="mytask.remove(${i})">X</p>
                    </div>     
                `
            }
            mytask.count();
            addtodo.innerHTML=html;
    }
}
//    remove(index){
//         this.todoItems[index].splice(index,1);
//         this.display();
//     }
    count(){
        let count=0;
        for(let i in todos){
            if(!todos[i].isCompleted){
                count++;
            }
        }
        console.log(count,"98")
        const cnt=document.getElementById('count');
        cnt.innerHTML=count+ " items left";
    }
    icon(){
        // const c=0;
        // for(let i in todos){
        //     if(todos[i].iscompleted){
        //         c++;
        //     }
        // }
        console.log(res,"109")
        if(res==false){
            fetch('/markalluncompleted').then((res)=>{return res.text()})
            .then((data)=>{
                todos=JSON.parse(data);
                mytask.display()
            })
            res=true;
        }
        else{
            fetch('/markallcompleted').then((res)=>{return res.text()})
            .then((data)=>{
                todos=JSON.parse(data);
                mytask.display()
            })
            res=false;
        }
        mytask.display();
    }
    checkbox(e,i){
        if(e.target.checked){
           let id=todos[i]._id;
           fetch('/markedcompleted/'+ id,
           {
            method: 'PATCH'
           }).then(res=>res.json())
           .then(data=>{
            console.log(data,"127")
            todos=data
            mytask.count()
            mytask.display()
           }).catch((err=>{
                console.log(err,"129")
           }))
        }
        else{
         let id=todos[i]._id;
         console.log(id,"137")
         fetch('/uncompleted/'+ id,{
            method: 'PATCH'
         }).then(res=>res.json()).then(data=>{
            console.log(data,"139")
            todos=data
            mytask.count()
            mytask.display()
         }).catch((err=>{
            console.log(err,'143')
         }))   
        }
       
    }
    all(){
        console.log("all")
        mytask.display();
    }
    active(){
        let additem=document.getElementById("addtodo");
        let html=""
        for(let i in todos){
            console.log(active,"159")
            if(todos[i].isCompleted==false){
                html+=` <div class="inneradd"> 
                <input type="checkbox" id="checkbox" onclick="mytask.checkbox(event,${i})">
                <p> ${todos[i].task} </p>
                <p id="cross" onclick="mytask.remove(${i})">X</p>
                </div>
                `
            }
        }
        additem.innerHTML=html
        // this.display()
        console.log(todos,"act")
    }
    completed(){

        let additem=document.getElementById("addtodo");
        let html=""
        for(let i in todos){
            if(todos[i].isCompleted==true){
                html+=` <div class="inneradd"> 
                <input type="checkbox" class="checkline" id="checkbox" onclick="mytask.checkbox(event,${i})" checked>
                <p class="checkline"> ${todos[i].task} </p>
                <p id="cross" onclick="mytask.remove(${i})">X</p>
                </div>
                `
            }
        }
        additem.innerHTML=html
        // this.display()
        console.log(todos,"comp")
    }
    clear(){
        fetch('/clearcompleted').then((res)=>{return res.text()})
        .then((data)=>{
            console.log(data,"199")
            todos=JSON.parse(data);
            mytask.display()
        })
       
    }
    
}
const input=document.getElementById("text");
console.log(input, "166")
const result=input.innerHTML;
console.log(result, "167")
const mytask=new Mytask();
getTodos();

input.addEventListener("keypress",function(e){
    if(input.value!="" && e.key=="Enter"){
        let ans=e.target.value;
        let todo=new Todo(ans,false);
        e.target.value="";
        mytask.add(todo);
    }
})
const icon=document.getElementById("icon");
icon.addEventListener("click",function(e){
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
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
       
        let completeditem=0;
        let notcompleted=0;
        for(let i in this.todoItems){
            if(this.todoItems[i].isCompleted){
                console.log("1")
                completeditem++;
            }    
        }
        if(completeditem!=this.todoItems.length){
            console.log("first inner")
            for(let i in this.todoItems){
                this.todoItems[i].isCompleted=true;
            }
           
        }
        
        else{
                for(let i in this.todoItems){
                this.todoItems[i].isCompleted=false;
            }
        }

        // else{
        //     console.log("2")
        //     for(let i in this.todoItems){
        //         this.todoItems[i].isCompleted=true;
        //     }
         
        // }
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
    //    if(count>=1){
    //     let footer=document.getElementById("foot")
    //     footer.style.visibility="visible"
    //    }
    //    else{
    //     let footer=document.getElementById("foot")
    //     footer.style.visibility="hidden"
    //    }
       
       document.getElementById("count").innerHTML=` ${count} items left`;
    }
    add(items,e){
        e.preventDefault();
        this.todoItems.push(items)
       
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
                    <input type="checkbox" id="checkbox"  onclick="mytask.checkbox(${i})" checked>
                    <p class="checkline"> ${this.todoItems[i].task} </p>
                    <p id="cross" onclick="mytask.remove(${i})">X</p>
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
let text=document.getElementById("text");
let mytask=new Mytask();

text.addEventListener("keydown",(e)=>{
    
    if(e.key === 'Enter' && text.value!=""){
        let footer=document.getElementById("foot")
        footer.style.visibility="visible"
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
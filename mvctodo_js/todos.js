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
    add(items){
        this.todoItems.push(items)
        console.log(items,"add")
        this.display()
    }
    remove(){

    }
    display(){
        let additem=document.getElementById("addtodo");
        console.log(additem,"first")
        additem.innerHTML=""
        console.log(additem,"second")
        let html=``;
        for(let i in this.todoItems){
            if(this.todoItems[i].isCompleted==true){
                html+=`<div class="inneradd">
                    <input type="checkbox" checked>
                    <p> ${this.todoItems[i].task} </p>
                    <p id="cross">X</p>
                    </div>
                `
            }
            else{
                html+=` <div class="inneradd"> 
                <input type="checkbox">
                <p> ${this.todoItems[i].task} </p>
                <p id="cross">X</p>
                </div>
                
            `
            }
        }
        console.log(html,"html")
        additem.innerHTML = html
    }
    all(){
        mytask.display();
    }
    active(){

    }
    completed(){

    }

}
let text=document.getElementById("text");
let mytask=new Mytask();
text.addEventListener("keydown",(e)=>{
    if(e.key === 'Enter' && text.value!=""){
        let task=e.target.value;
        let newTask=new Todo(task,false)
        mytask.add(newTask);
        e.target.value=""
    }

})
console.log(text,"16")
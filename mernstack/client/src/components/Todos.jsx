import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Todos = () => {
    const [array,setarray]=useState([]);
    const [input,setinput]=useState('');
    const [MarkComplpleted,setMarkCompleted]=useState([])
    useEffect(()=>{gettodo()},[input])
  const inputtext=((event)=>{
    console.log(event.target.value,"7")
        setinput(event.target.value);

    })
    const gettodo=async()=>{
        try{
           const getarray= await axios.get('http://localhost:8070/gettodos');
        //    console.log(getarray.data,"15")
           setarray(getarray.data)
        }
        catch(err){
            console.log(err,"17")
        }
    }
    const deletetask=async(ele)=>{
        try{
            
            console.log('delete')
            let id=ele._id;
            console.log(id,"25")
            
            const deletearray= await axios.delete(`http://localhost:8070/delete/${id}`);
            console.log(deletearray,"28")
            setarray(array.filter(todo=>todo._id!=id))
            // setarray(getarray.data)
         }
         catch(err){
             console.log(err,"17")
         }
    }
    const Checkbox=async(ele)=>{
        console.log(ele.isCompleted,"41")
        try{
            if(!ele.isCompleted){
                console.log(ele,"41")
                console.log("markcompleted");
                let id=ele._id;
                const markcompleted=await axios.patch(`http://localhost:8070/markedcompleted/${id}`);
                console.log(markcompleted,"46")
            }
            else{
                console.log("unmarkcompleted");
                let id=ele._id;
                const markuncompleted=await axios.patch(`http://localhost:8070/uncompleted/${id}`);
                console.log(markuncompleted,"52")
            }
            
        }
        catch(err){
            console.log(err,"55")
        }
    }
    const count=array.filter((item)=>{

        return (item.isCompleted===false)}).length
    
    const addtask=async(event)=>{
        try{
            console.log("first")
            event.preventDefault();
            
         
        if(input!==""){
            console.log("first","28")
            const data=({task: input, isCompleted: false})
            const addarray= await axios.post('http://localhost:8070/addtodo',{task: input, isCompleted: false});
            console.log(addarray,"25")
            setarray([...array,data])
            setinput('')
            console.log(data,"16")
            console.log(array,"17")
            console.log(setarray,"15")
            display();
        }
    }
    catch(err){
        console.log(err,38)
    }
    }
    const clearCompleted= async()=>{
        try{
            let clearcompleted=[]
            for(let i in array){
                if(!array[i].isCompleted){
                    clearcompleted.push(array[i]);
                }
            }
            setarray([clearCompleted]);
        }
        catch(err){
            console.log(err,"98")
        }
    }
    const display=()=>{

       
       
        console.log(array,"45")
    }
  return (
   <>
    
    <div class="container">
    <h1 class="text-todo">Todos</h1>
        <div class="innercontainer">  
            <form class="task" onClick={addtask}>
                <p id="icon">
                    <i class="fa-solid fa-chevron-down" id="arrow"></i>
                </p>
                
                <input type="text" id="text" value={input} onChange={inputtext} placeholder="What needs to be done?" />
                <button className='btn' type="submit" ></button>
            </form>
            
        </div>

        <div className="addtodo" id="addtodo">
        {
        
            array.map((ele)=>{
            if(ele.isCompleted===true){
                return(<div class="inneradd">
                    <input type="checkbox" id="checkbox"   onClick={()=>Checkbox(ele)} checked />
                    <p class="checkline"> {ele.task} </p>
                    <p id="cross" onClick={()=>deletetask(ele)}>X</p>
                    </div>
                )
            }
            else{
                return(

                 <div class="inneradd"> 
                <input type="checkbox" id="checkbox" onClick={()=>Checkbox(ele)} />
                <p> {ele.task} </p>
                <p id="cross" onClick={()=>deletetask(ele)}>X</p>
                </div>
                
            )
            }
        })
        }
        </div>
        <div id="foot">
            <div id="footer">
                <p id="count">`{count} items left`</p>
                    <div id="filter">
                        <p id="all">All</p>
                        <p id="active">Active</p>
                        <p id="completed">Completed</p>
                    </div>
                <p id="clear" onClick={clearCompleted}>Clear Completed</p>
            </div>
        </div>
    </div>
   

   </>
  )
}

export default Todos
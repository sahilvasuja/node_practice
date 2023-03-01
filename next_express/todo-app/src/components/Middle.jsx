import { useEffect, useState } from "react"
import styles from '../styles/Home.module.css'
import { FaChevronDown } from "react-icons/fa";
import axios from 'axios'
export const Middle=()=>{
    const [input,setInput]=useState('')
    const [array,setarray]=useState([])
    useEffect(()=>{gettask()},[array])
  const inputtext=(event)=>{
    console.log(event.target.value);
    setInput(event.target.value)
  }
  
    const allDone=()=>{
        console.log("object");

    }
    const Checkbox=()=>{
        
        console.log("object");
        

    }
    const icon=()=>{
        
        console.log("object");
        

    }
    const all=()=>{

    }
    const active=()=>{

    }
    const completed=()=>{

    }
    const addtask=async(event)=>{
        event.preventDefault();
        try{

            if(input!=""){
                const data=({task:input,isCompleted:false});
               const addarray=await axios.post('http://localhost:9000/addtodo',{task: input, isCompleted: false})
                setarray([...array,data])
                console.log(data,"37");
                setInput('')
            }
           console.log("object");
        }
        catch(err){
            console.log(err,"error");
        }
       
    }
    const gettask=async(event)=>{
        // event.preventDefault();
        const getarray=await axios.get('http://localhost:9000/gettodo')
        // console.log(getarray,"49");
        setarray(getarray.data)
    }
    const deletetask=async(event)=>{
       
        try{
            console.log("object");
            console.log(event._id,"65");
            const id=event._id;
            let deletetask=await axios.delete(`http://localhost:9000/deletetask/${id}`)
             setarray(deletetask.data)

        }
        catch(err){
            console.log(err,"70");
        }
    }
    const clearCompleted=async(event)=>{
        try{

            let clear=await axios.get('http://localhost:9000/cleared')
            console.log(clear,"49"); 
            setarray(clear.data)
        }
        catch(err){
            console.log(err,"70");
        }
    }
    return(
        <>
<div className="innercontainer">  
            <form className="task" onClick={addtask}>
                <p id="icon" onClick={icon} className={allDone?'checked':'none'}>
                <FaChevronDown/>
                </p>
                
                <input type="text" id="text" value={input} onChange={inputtext} placeholder="What needs to be done?" />
                <button className='btn' type="submit" ></button>
            </form>
            
        </div>
        <div className="addtodo" id="addtodo">
        
         {
        
            array.map((ele)=>{
            
                return(<div className="inneradd">
                    <input type="checkbox" id="checkbox" onClick={()=>Checkbox(ele)} checked="ele.isCompleted" />
                    <p style={{textDecoration: ele.isCompleted ? "line-through" : "none"}}> {ele.task} </p>
                    <p id="cross" onClick={()=>deletetask(ele)}>X</p>
                    </div>
                )
            
            
        })
        } 
        </div>
        <div id="foot">
            <div id="footer">
                <p id="count"> items left</p>
                    <div id="filter">
                        <p id="all" onClick={all}>All</p>
                        <p id="active" onClick={active}>Active</p>
                        <p id="completed" onClick={completed}>Completed</p>
                    </div>
                <p id="clear" onClick={clearCompleted}>Clear Completed</p>
            </div>
        </div>
        </>
    )
}
import { useState } from "react"
import styles from '../styles/Home.module.css'
import { FaChevronDown } from "react-icons/fa";
export const Middle=()=>{
    const [input,setInput]=useState('')
  
  
    const allDone=()=>{
        console.log("object");

    }
    const Checkbox=()=>{
        
        console.log("object");
        

    }
    const icon=()=>{
        
        console.log("object");
        

    }
    const addtask=()=>{
        console.log("object");
    }
    return(
        <>
<div className="innercontainer">  
            <form className="task" onClick={addtask}>
                <p id="icon" onClick={icon} className={allDone?'checked':'none'}>
                <FaChevronDown/>
                </p>
                
                <input type="text" id="text" value={input}  placeholder="What needs to be done?" />
                <button className='btn' type="submit" ></button>
            </form>
            
        </div>
        <div className="addtodo" id="addtodo">
        
        {/* {
        
            array.map((ele)=>{
            
                return(<div className="inneradd">
                    <input type="checkbox" id="checkbox" onClick={()=>Checkbox(ele)} checked="ele.isCompleted" />
                    <p style={{textDecoration: ele.isCompleted ? "line-through" : "none"}}> "ele.task" </p>
                    <p id="cross" onClick={()=>deletetask(ele)}>X</p>
                    </div>
                )
            
            
        })
        } */}
        </div>
        </>
    )
}
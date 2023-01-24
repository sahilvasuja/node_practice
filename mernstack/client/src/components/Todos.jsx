import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { FaChevronDown } from "react-icons/fa";
const Todos = () => {
    const [array,setarray]=useState([]);
    const [input,setinput]=useState('');
    const [allDone,setallDone]=useState(false)
    
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
    const icon=async()=>{
        try{
          
            if(allDone){
                    const markcompleted= await axios.get(`http://localhost:8070/markallcompleted`);
                     setarray(markcompleted.data)
                     console.log(markcompleted.data,"46")

            }
            else{
                console.log("markedalluncompleted");
                
                const markuncompleted=await axios.get(`http://localhost:8070/markalluncompleted/`);
                
                setarray(markuncompleted.data)
                console.log(markuncompleted.data,"52")
            }
            setallDone(!allDone)
        }
        
        catch(err){
            console.log(err,"55")
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
               await axios.patch(`http://localhost:8070/markedcompleted/${id}`);
                const markcompleted=await axios.get(`http://localhost:8070/gettodos/`);
                setarray(markcompleted.data)
                console.log(markcompleted.data,"46")
            }
            else{
                console.log("unmarkcompleted");
                let id=ele._id;
                await axios.patch(`http://localhost:8070/uncompleted/${id}`);
                const markuncompleted=await axios.get(`http://localhost:8070/gettodos/`);
                setarray(markuncompleted.data)
                console.log(markuncompleted.data,"52")
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
            let clearcompleted=await axios.get('http://localhost:8070/clearcompleted')
            console.log(clearcompleted,"96")
             setarray(clearcompleted.data);
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
    
    <div className="container">
    <h1 className="text-todo">Todos</h1>
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
                    <input type="checkbox" id="checkbox" onClick={()=>Checkbox(ele)} checked={ele.isCompleted} />
                    <p style={{textDecoration: ele.isCompleted ? "line-through" : "none"}}> {ele.task} </p>
                    <p id="cross" onClick={()=>deletetask(ele)}>X</p>
                    </div>
                )
            
            
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
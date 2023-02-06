import React from "react";
import {useState} from "react"
import { useQuery, gql,useMutation } from "@apollo/client";
import { client } from "./index";
// import Mutation from "./mutation.js";
const Todo = gql`
  {
    todos {
        title
        iscompleted
        id
    }
  }
`;

export const Todos = () => {
  const [input,setInput]=useState("")
  const { loading, error, data,refetch } = useQuery(Todo);
  console.log(error);
  console.log(data);
  console.log(loading);
  const ADD_ITEM_MUTATION = gql`
   mutation MyMutation($title: String $iscompleted: Boolean ) {
        insert_todos_one(object: {title: $title iscompleted: $iscompleted }) {
        returning {
          title
        }
      }
    }
  `;
  const [addItem] = useMutation(ADD_ITEM_MUTATION, ()=>{refetch()});
     
  const addtask=(event)=>{
    console.log(input,"first")
    event.preventDefault();
    if(input!=="" || /^\s*$/.test(input)){
      let temp_id = Date.now();
      console.log("input")
      addItem({ object:  { title: input,iscompleted: false} });
      console.log(addItem,"34")
      console.log(input,"40")
      setInput('');
    } 
    
  }
  const all=()=>{
    
  }
  const active=()=>{
    
  }
  const completed=()=>{
    
  }
  const count=()=>{
    
  }
  const clearCompleted=()=>{
    
  }
  const Checkbox=()=>{
    
  }
  const deletetask=()=>{
    
  }
  const icon=()=>{
    
  }
  const inputtext=(event)=>{
    setInput(event.target.value)
    console.log(event.target.value,"68")
  }
  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;
  
  return (
    <>
       <div className="container">
    <h1 className="text-todo">Todos</h1>
        <div className="innercontainer">  
            <form className="task" onClick={addtask}>
                {/* <p id="icon" onClick={icon} className={allDone?'checked':'none'}>
                <FaChevronDown/>
                </p> */}
                
                <input type="text" id="text" value={input} onChange={inputtext} placeholder="What needs to be done?" />
                <button className='btn' type="submit" ></button>
            </form>
            
        </div>
   
        
        <div className="addtodo" id="addtodo">
        {
        
          data.todos.map((todo)=>{
            
                return(<div className="inneradd">
                    <input type="checkbox" id="checkbox" onClick={()=>Checkbox()} checked={todo.iscompleted} />
                    <p style={{textDecoration: todo.iscompleted ? "line-through" : "none"}}> {todo.title} </p>
                    <p id="cross" onClick={()=>deletetask(todo.id)}>X</p>
                    </div>
                )
            
            
        })
        }
        </div>
        <div id="foot">
            <div id="footer">
                <p id="count">{count} items left</p>
                    <div id="filter">
                        <p id="all" onClick={all}>All</p>
                        <p id="active" onClick={active}>Active</p>
                        <p id="completed" onClick={completed}>Completed</p>
                    </div>
                <p id="clear" onClick={clearCompleted}>Clear Completed</p>
            </div>
        </div>
        
    </div>
   

    </>
  )
      
}
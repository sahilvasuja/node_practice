import React from "react";
import {useState} from "react"
import { useQuery, gql,useMutation } from "@apollo/client";
import { client } from "./index";
// import Mutation from "./mutation.js";
const Todo = gql`
  {
    todos(order_by: { id: asc }) {
        title
        iscompleted
        id
    }
  }
`;

export const Todos = () => {
  const [input,setInput]=useState("")
  // const [Count,setcount]=useState("0")
  const { loading, error, data,refetch } = useQuery(Todo);
  console.log(error);
  console.log(data);
  console.log(loading);
 
  const ADD_ITEM_MUTATION = gql`
   mutation MyMutation( $iscompleted: Boolean $id: bigint $title: String) {
        insert_todos_one(object: { iscompleted: $iscompleted, id: $id, title: $title}) {
        
          iscompleted
          title
          id
        
      }
    }
  `;
  const DELETE_ITEM_MUTATION=gql` mutation MyMutation3($id: bigint!) {
    delete_todos_by_pk(id: $id) {
      iscompleted
      title
      id
    }
  }
  `;
  const Completed_ITEM_MUTATION=gql` mutation MyMutation4($_eq: bigint, $iscompleted: Boolean) {
    update_todos(where: {id: {_eq: $_eq}, iscompleted: {}}, _set: {iscompleted: $iscompleted}) {
      returning {
        iscompleted
        title
        id
      }
    }
  }
  `;
  const [add_Item] = useMutation(ADD_ITEM_MUTATION,{ onCompleted:()=>{
    refetch();
  }});
  const [delete_Item] = useMutation(DELETE_ITEM_MUTATION,{ onCompleted:()=>{
    refetch();
  }});
  const [check_Item] = useMutation(Completed_ITEM_MUTATION,{ onCompleted:()=>{
    refetch();
  }});
  const [delete_CompletedItem] = useMutation(DELETE_ITEM_MUTATION,{ onCompleted:()=>{
    refetch();
  }});

  const Checkbox=(id,event)=>{
    
    console.log(id,"checkbox");
    data.todos.map((todo) => {
      if (todo.id === id) {
        let check = !todo.iscompleted;
       check_Item({variables: { _eq: id, iscompleted: check}});
      }
    });
    refetch() 
    
  }
  const deletetask=(id,event)=>{
    
    console.log(id,"delete");
   delete_Item({variables: {id: id }})
  
    refetch() 
     
  }
  const clearCompleted=(id,event)=>{
    
    console.log(id,"delete");
   delete_CompletedItem({variables: {id: id }})
  
    refetch() 
     
  }

  const addtask=(event)=>{
    console.log(input,"first")
    event.preventDefault();
    if(input!==""){
      let temp_id = Date.now();
      console.log("input")
      add_Item({ variables:  { title: input,iscompleted: false,id: temp_id} });
      console.log(add_Item,"34")
      console.log(input,"40")
      setInput('');
    }
    refetch() 
   
    
  }
  


  const all=()=>{
    
  }
  const active=()=>{
    
  }
  const completed=()=>{
    
  }

    
    // const con=data.filter((item)=>{

    //   return (item.isCompleted===false)}).length
    
    
    // // setcount(c)
    // console.log(con,"count")
  
  
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
            <form className="task" onSubmit={addtask}>
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
                    <input type="checkbox" id="checkbox" onClick={()=>Checkbox(todo.id)} checked={todo.iscompleted} />
                    <p style={{textDecoration: todo.iscompleted ? "line-through" : "none"}}> {todo.title} </p>
                    <p id="cross" onClick={()=>deletetask(todo.id)}>X</p>
                    </div>
                )
            
            
        })
        }
        </div>
        {/* <div id="foot">
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
         */}
    </div>
   

    </>
  )
      
}
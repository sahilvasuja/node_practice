import { gql,useMutation,useQuery } from "@apollo/client"
import { useState,useEffect } from "react"
const getTodos = gql`
  {
    Todos {
        Task
        isCompleted
        id
    }
  }
`;
const addTodo= gql`
    mutation addTodos($task: String, $isCompleted: Boolean ){
        
        addTodos(Task: $task, isCompleted: $isCompleted ){
                Task
                isCompleted
                id
        }
    }
`
const deleteTask = gql`
  mutation deleteTodo($id: ID!) {
    #console.log(id,"24")
    deleteTodo(id: $id) {
        id
    }
  }
`;
function Data(){
    const [task,setTask]=useState("");
    const [isCompleted,setIscompleted]=useState(false);
   const [id,setId]=useState("")
        const  { loading, error, data,refetch } = useQuery(getTodos)
    const [addTodos]=useMutation(addTodo,{
        update(cache, { data: { addTodos } }) {
            console.log(addTodos,"28")
            const {Todos } = cache.readQuery({ query: getTodos });
            cache.writeQuery({
              query: getTodos,
              data: { Todos: Todos.concat([addTodos]) },
            });
            // console.log(Todos,"31")
            // console.log(addTodos,"32")
            // console.log(data,"33")
            // setTask('')
          },
    })
    
    const [deleteTodo]=useMutation(deleteTask,{
        update(cache, { data: { deleteTodo } }) {
            console.log(deleteTodo,"28")
            const {Todos } = cache.readQuery({ query: getTodos });
            cache.writeQuery({
              query: getTodos,
              data: { Todos: Todos.filter((todo)=>todo.id!==deleteTodo.id) },
            });
            refetch()
            // console.log(Todos,"31")
            // console.log(addTodos,"32")
            // console.log(data,"33")
            // setTask('')
          },
    })

   
    const inputtext=(e)=>{
        console.log(e.target.value,"36")
        setTask(e.target.value)
        setIscompleted(false)
        // setId(Date.now())
    }
    
    
    const Checkbox=async(e)=>{

    }
    return(
        <>
            <div className="container">
    <h1 className="text-todo">Todos</h1>
        <div className="innercontainer">  
            <form className="task" onSubmit={async(e)=>
            {   e.preventDefault();
                console.log(task,"39")
               
                await addTodos({variables: {task,isCompleted}})
               
                refetch();
                setTask('');
            }}>
                <input type="text" id="text" value={task} onChange={inputtext} placeholder="What needs to be done?" />
                <button className='btn' type="submit" >User</button>
            </form>
            
        </div>

        <div className="addtodo" id="addtodo">
            {loading && <div>Loading...</div>}
           {
                data && data.Todos.map((ele)=>{
                
                    return(<div className="inneradd">
                   
                        <input type="checkbox" id="checkbox" onClick={()=>Checkbox(ele)} checked={ele.isCompleted} />
                        <p>{ele.Task} </p>
                        <p id="cross" onClick={()=>deleteTodo({ variables: { id: ele.id }})}>X</p>
                        </div>
                    )
                })
           }
        
        </div>
        </div>
        </>
    )
}
export default Data;



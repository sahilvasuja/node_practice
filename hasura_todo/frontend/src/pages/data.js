import { gql,useMutation,useQuery } from "@apollo/client"
import { useState } from "react"
const getTodos = gql`
  {
    Todos {
        Task
        isCompleted
    }
  }
`;
const addTodo= gql`
    mutation addTodos($Task: String, $isCompleted: Boolean){
        
        addTodos(Task: $Task, isCompleted: $isCompleted){
                Task
                isCompleted
        }
    }

`
function Data(){
    const [task,setTask]=useState("");
    const [isCompleted,setIscompleted]=useState(false);
    
    const [addTodos]=useMutation(addTodo,{
        update(cache, { data: { addTodos } }) {
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

    // update(cache, { data: { addBook } }) {
    //     const { books } = cache.readQuery({ query: GET_BOOKS });
    //     cache.writeQuery({
    //       query: GET_BOOKS,
    //       data: { books: books.concat([addBook]) },
    //     });
    //   },
    // });
    const inputtext=(e)=>{
        console.log(e.target.value,"36")
        setTask(e.target.value)
        setIscompleted(false)
    }
    
    const deletetask=async(e)=>{

    }
    const Checkbox=async(e)=>{

    }
    const { loading, error, data,refetch } = useQuery(getTodos);
    console.log(data,"----------")
    return(
        <>
            <div className="container">
    <h1 className="text-todo">Todos</h1>
        <div className="innercontainer">  
            <form className="task" onSubmit={async(e)=>
            {   e.preventDefault();
                console.log(task,"39")
                await addTodos({variables: {task,isCompleted}})
               console.log(task,"59")
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
                        <p id="cross" onClick={()=>deletetask(ele)}>X</p>
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



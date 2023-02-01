import todoGraphql from "./models/todo.js";
const resolvers={
    Query: {
        getTodos: async()=> {
            const todos= await todoGraphql.find();
            return todos
        },
        getTodo: async(_,args)=>{
            console.log(args,"11")
            const singleTodo=await todoGraphql.findById(args.id)
            return singleTodo
        }
    },
    Mutation: {
        addTodos: async(_,args)=>{
            const newTodo=new todoGraphql({Task: args.Task,isCompleted: args.isCompleted});
            await newTodo.save()
            return newTodo
        },
        deleteTodo: async(_,args)=>{
            const todo=await todoGraphql.findByIdAndDelete(args.id);
           return todo
        },
        updateTodo: async(_,args)=>{
            const updateTodo={}
            console.log(args,"22")
           
            const {Task,ID,isCompleted}=args;
            
                updateTodo.Task=Task
            
                updateTodo.isCompleted=isCompleted
            
            console.log(updateTodo,"35")
            const todo=await todoGraphql.findByIdAndUpdate(args.id,updateTodo);
            await todo.save()
            return todo
        }
    }
}
export default resolvers;
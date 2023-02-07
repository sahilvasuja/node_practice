import todos from "./Todos.js";
// const Todos=[]
const resolvers = {
  Query: {
    Todos: async ()=>{
      // Todos
      const ttodos = await todos.find();
      return ttodos;
    }
  },
  
  Mutation: {
    addTodos: async (_,{Task,isCompleted,id}) => {
      const newTodo = new todos( {
        Task,
        isCompleted,
       id: Date.now()
        
      })
      // Todos.push(newTodo)
       const todo = await newTodo.save();
      // await  todo.save();
      return todo;
      // return newTodo;
    },
    deleteTodo: async (_, args,{id}) => {
      // console.log(id,"25")
      console.log(args.id,"27")
      const todo = await todos.findByIdAndDelete({_id: args.id})
      console.log(todo,30)
      return todo;
    },
  //   updateTodo: async (_, args) => {
  //     const updateTodo = {};
  //     console.log(_, args, "22");

  //     const { Task, ID, isCompleted } = args;

  //     updateTodo.Task = Task;

  //     updateTodo.isCompleted = isCompleted;

  //     console.log(updateTodo, "35");
  //     const todo = await todoGraphql.findByIdAndUpdate(args.id, updateTodo);
  //     await todo.save();
  //     return todo;
  //   },
   },
}
export default resolvers;


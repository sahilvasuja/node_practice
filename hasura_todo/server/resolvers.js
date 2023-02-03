
const Todos=[]
const resolvers = {
  Query: {
    Todos: ()=>Todos
    
  },
  Mutation: {
    addTodos: async (_,{Task,isCompleted}) => {
      const newTodo = {
        Task,
        isCompleted,
      
      };
      Todos.push(newTodo)
      return newTodo;
    },
    deleteTodo: async (_, args) => {
      const todo = Todos.filter(arg =>(arg.id!=args.id))
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


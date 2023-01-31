import todoGraphql from "./models/todo.js";
const resolvers={
    Query: {

        // Id: ()=> {Date.now()},
        // Task:()=>"product 1",
        // isCompleted: ()=> false
        getTodos: async()=> {
            const todos= await todoGraphql.find();
            return todos
        }
    },
    Mutation: {
        addTodos: async(_,args)=>{
            const newTodo=new todoGraphql({Task: args.Task,isCompleted: args.isCompleted});
            await newTodo.save()
            return newTodo
        }
    }
}
export default resolvers;
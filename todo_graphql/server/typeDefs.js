import todoGraphql from "./models/todo.js"
import { gql } from 'apollo-server-express';
const typeDefs= gql`
    type Todo{
        id: ID
        Task: String
        isCompleted: Boolean
    }
    type Query{
        getTodos:[Todo]
        getTodo(id: ID):Todo
        
    }
    type Mutation{
        addTodos(Task: String, isCompleted: Boolean):Todo
        updateTodo(Task: String, isCompleted: Boolean, id:ID):Todo
        deleteTodo(id:ID):Todo
    }
`

export default typeDefs; 
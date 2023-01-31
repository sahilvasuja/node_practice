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
    }
    type Mutation{
        addTodos(Task: String, isCompleted: Boolean):Todo
    }
`

export default typeDefs; 
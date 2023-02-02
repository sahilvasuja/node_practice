import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs.js';
import resolvers from "./resolvers.js"
import express  from 'express';
// const express =require('express');
async function Server(){
    const app=express();
    const apolloserver=new ApolloServer({typeDefs,resolvers});
    await apolloserver.start()
    apolloserver.applyMiddleware({app})
    app.use((req,res)=>{
        res.send("server connected")
        console.log("server connected")
    })
    // try{
    //     mongoose.set('strictQuery',false)
    //    await mongoose.connect("mongodb://localhost:27017/Graphqltodo")
        
        
    // }
    // catch(err){
    //     console.log(err)
    // }
    const port=3015
    app.listen(port,()=>{console.log(`server connected at ${port}`)})
}
Server();
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs.js';
import resolvers from "./resolvers.js"
import express  from 'express';
import mongoose from 'mongoose';
// const express =require('express');
async function Server(){
    const app=express();
    const apolloserver=new ApolloServer({typeDefs,resolvers});
    await apolloserver.start()
    apolloserver.applyMiddleware({app})
    console.log("mongoose")
    try{
        mongoose.set('strictQuery',false)
       await mongoose.connect("mongodb://localhost:27017/Graphqlhasuratodo",{

           useNewUrlParser: true,
           useUnifiedTopology: true,
       })
    }
    catch(err){
        console.log(err)
    }
    app.use((req,res)=>{
        res.send("server connected")
        console.log("server connected")
    })
   
    const port=3032
    app.listen(port,()=>{console.log(`server connected at ${port}`)})
}
Server();
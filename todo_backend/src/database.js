const { MongoClient } = require('mongodb');
let dbconnection;
module.exports={
    connectionDb: (cb)=>{
        MongoClient.connect('mongodb://localhost:27017/todoapp')
        .then((client)=>{
            dbconnection=client.db()
            return cb();
        })
        .catch(err=>{
          console.log(err) 
          return cb(err) 
        })
    },
    getDb: ()=>{
        dbconnection
    }
}
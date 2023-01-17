require('dotenv').config();

const URI = process.env.URI

const { MongoClient, ServerApiVersion } = require('mongodb');


const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db



async function mongoConnect() {
  try {
    const database = client.db('movieDB');
    db = database
    return database
  }catch(err){
    console.log(err);
  }
}


function getDb(){
  return db
}

module.exports={mongoConnect,getDb}


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Sipri:123455@cluster0.lvvqpvb.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("movieDB").collection("users");
//   console.log(collection.find());
//   // perform actions on the collection object
//   client.close();
// });


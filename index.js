
const express= require("express")
const { MongoClient } = require('mongodb');
const cors=require('cors');
require('dotenv').config();
const app=express();
const port =process.env.PORT || 5002;

 app.use(cors())
app.use(express.json())

 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ev8on.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {

    try{
        await client.connect();
        console.log("connected to database");
        const database=client.db("office-data")
        const officeCollection=database.collection('servicesData')


        // post api
        app.post('/service', async(req,res)=>{
          const service=req.body;
          const result=await officeCollection.insertOne(service);
          res.json(result)
        })

        app.get('/service',async(req,res)=>{
          const cursor=officeCollection.find({})
          const services=await cursor.toArray();
          res.send(services)
        });
    }

    finally{
        // await client.close();
    }
}

run().catch(console.dir)


 app.get('/', (req,res)=>{
   res.send("online shopping");
  });
 
 app.listen(port, ()=>{
   console.log("runnning online on port", port);
 }); 
//  user- office
//  password- 1RG8w02lnlhqsKHg
const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 5000


// middlaware
app.use(express.json())
app.use(cors())
const uri = "mongodb+srv://user_db:admin123123@cluster0.4y5zw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const menuCollection = client.db('restaurant').collection('menu')
      const reviewsCollection = client.db('restaurant').
      collection('reviews')
    //   menu collection get from database
      app.get('/menu', async(req, res)=>{
        const result = await menuCollection.find().toArray()
        res.send(result)
      })
      app.get('/reviews', async(req, res)=>{
        const result = await reviewsCollection.find().toArray()
        res.send(result)
      })
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', async(req, res)=>{
    res.send('server is runing....')
})
app.listen(port, ()=>{
    console.log(`example app listening on ${port}`)
})
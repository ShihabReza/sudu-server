const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json());

require('dotenv').config()

app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.llimy0q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('DB Connectiond')
  // perform actions on the collection object
  // client.close();
});

async function run() {
  try {
    const appCollection = client.db('tudu-app').collection('app');
    const todoCollection = client.db('tudu-app').collection('app');

    app.get('/app',async(req, res) => {
      const query = {}
      const cursor = appCollection.find(query)
      const app = await cursor.toArray()
      res.send(app)
})
    app.post('/app',async(req, res) => {
      const newapp = req.body
      const app = todoCollection.insertOne(newapp)
      res.send(app)
      
  })
  } finally {
   
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('NodeJs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
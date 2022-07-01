const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
app.use(express.json());
app.use(cors())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mpzy2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    
    await client.connect();
      const appCollection = client.db('tudu-app').collection('app');
     
      
      app.post('/app',async(req, res) => {
        const app = req.body
        const result = appCollection.insertOne(app)
        res.send(app)
        
    })
    
    
    
    
  } finally {
   
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
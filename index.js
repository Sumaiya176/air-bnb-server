const express = require('express');
require('dotenv').config()
const app = express();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.2ijdq.mongodb.net/${process.env.DB_dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const addHotelCollection = client.db("airBnb").collection("hotelsInformation");
  
  app.post('/addHotel', (req, res) => {
    const hotels = req.body
    addHotelCollection.insertOne(hotels)
    .then(result => {
      console.log(result);
    })
  })

  app.get('/hotels', (req, res) => {
    addHotelCollection.find({})
    .toArray( (err, documents) => {
      // console.log(documents)
      res.send(documents);
    })
  })

  app.get('/selectedhotels/:location', (req, res) => {
    //console.log(req.params.location)
    addHotelCollection.find({location: `${req.params.location}`})
    .toArray( (err, documents) => {
      // console.log(documents)
      res.send(documents);
    })
  })

  app.get('/singlehotel/:id', (req, res) => {
    console.log(req.params.id)
    addHotelCollection.find({_id: ObjectId(req.params.id)})
    .toArray( (err, documents) => {
      console.log(documents)
      res.send(documents);
    })
  })



});


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
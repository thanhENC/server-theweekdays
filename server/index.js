// import dotenv from 'dotenv';
// dotenv.config();

const express = require('express');
const app = express();
// const port = process.env.PORT || 4000;
// const uri = process.env.DATABASE_URL;
const port = 4000;

const morgan = require("morgan")
app.use(morgan("combined"))

// payload limit 10mb
const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(express.json());

const cors = require("cors");
app.use(cors())

app.listen(port, () => {
    console.log(`Server-Fashion listening on port ${port}`)
})

app.get("/api", (req, res) => {
    res.send("This Web server is processed for MongoDB")
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://doadmin:2I4iK1R60g7c8DE5@db-mongodb-sgp1-62736-79afbb0c.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-sgp1-62736"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("theweekdays").collection("product");
  // perform actions on the collection object
  console.log("Connected to MongoDB")
  client.close();
});

database = client.db("theweekdays");
collection = database.collection("product");

app.get("/api/products", async (req, res) => {
    try {
        const result = await collection.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

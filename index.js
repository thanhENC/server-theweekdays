// import dotenv from 'dotenv';
// dotenv.config();

// =================SETTING UP EXPRESS=================
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

// // =================SETTING UP MONGODB=================
// const { MongoClient, ObjectId } = require('mongodb');

// // MongoDB Atlas
// const uri = "mongodb+srv://thanhenc:9fdWvVT0yJTPV3n8@k20411-web2.3xcbrui.mongodb.net/test"
// const client = new MongoClient(uri);

// client.connect(err => {
//     const collection = client.db("theweekdays").collection("product");
//     // perform actions on the collection object
//     console.log("Connected to MongoDB")
//     client.close();
// });

// =================SETTING UP ROUTES=================
app.get("/api", (req, res) => {
    res.send("This Web server is processed for MongoDB")
})

// I. Product: /v1/products
const productRoute = require("./routes/product");
app.use("/v1/products", productRoute);

// II. Address list: /v1/address
const addressRoute = require("./routes/address");
app.use("/v1/address", addressRoute);

// Continue with other routes...........

// ====================================================
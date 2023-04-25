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

// payload limit 20mb
const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb' }));
// app.use(express.json());

const cors = require("cors");
app.use(cors())

app.listen(port, () => {
    console.log(`Server-Fashion listening on port ${port}`)
})

// // =================SETTING UP MONGODB=================
// const { MongoClient, ObjectId } = require('mongodb');

// // MongoDB Atlas
// const uri = URI_MONGODB;
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

// I. Accounts: /accounts/
const accountsRoute = require("./routes/accounts");
app.use("/v1/account", accountsRoute);

// II. Address list: /v1/address
const addressRoute = require("./routes/address");
app.use("/v1/address", addressRoute);

// III. Category: /v1/category
const categoryRoute = require("./routes/category");
app.use("/v1/category", categoryRoute);

// COLLECTION: /v1/collection
const collectionRoute = require("./routes/collection");
app.use("/v1/collection", collectionRoute);

// LOOKBOOK: /v1/lookbook
const lookbookRoute = require("./routes/lookbook");
app.use("/v1/lookbook", lookbookRoute);

// IV. Coupon: /v1/coupon
const couponRoute = require("./routes/coupon");
app.use("/v1/coupon", couponRoute);

// V. Customer: /v1/customer
const customerRoute = require("./routes/customer");
app.use("/v1/customer", customerRoute);

// VI. Order: /v1/order
const orderRoute = require("./routes/order");
app.use("/v1/order", orderRoute);

// VII. Product: /v1/products
const productRoute = require("./routes/product");
app.use("/v1/products", productRoute);


// Continue with other routes...........

// ====================================================
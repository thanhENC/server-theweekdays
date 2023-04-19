const { MongoClient, ObjectId } = require('mongodb');
const { URI_MONGODB } = require("../env");

// // MongoDB Atlas
// const uri = URI_MONGODB;
// const client = new MongoClient(uri);

// client.connect(err => {
//     const collection = client.db("theweekdays").collection("product");
//     // perform actions on the collection object
//     console.log("Connected to MongoDB")
//     client.close();
// });

const uri = URI_MONGODB;

// async function mongoconnect(databasename, uri=uri) {
//     const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
//     return client.db(databasename);
// }

function mongoconnect(databasename) {
  const client = new MongoClient(uri);
  client.connect();
  return client.db(databasename);
}

const database = mongoconnect("theweekdays");
const address_collection = database.collection("address_list");
const cart_collection = database.collection("cart");
const category_collection = database.collection("category");
const coupon_collection = database.collection("coupon");
const customer_collection = database.collection("customer");
const account_collection = database.collection("account");
const delivery_method_collection = database.collection("delivery_method");
const order_collection = database.collection("order");
const payment_method_collection = database.collection("payment_method");
const product_collection = database.collection("product");
const variant_collection = database.collection("variant");
const wishlist_collection = database.collection("wishlist");
const lookbook_collection = database.collection("lookbook");
const collection_collection = database.collection("collection_collection");

module.exports = {
  mongoconnect,
  database,
  address_collection,
  cart_collection,
  category_collection,
  coupon_collection,
  customer_collection,
  account_collection,
  delivery_method_collection,
  order_collection,
  payment_method_collection,
  product_collection,
  variant_collection,
  wishlist_collection,
  lookbook_collection,
  collection_collection
};

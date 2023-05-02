const { MongoClient, ObjectId } = require('mongodb');
const { URI_MONGODB, URI_ACCOUNT } = require("../env");

// // MongoDB Atlas
// const uri = URI_MONGODB;
// const client = new MongoClient(uri);

// client.connect(err => {
//     const collection = client.db("theweekdays").collection("product");
//     // perform actions on the collection object
//     console.log("Connected to MongoDB")
//     client.close();
// });

// async function mongoconnect(databasename, uri=uri) {
//     const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
//     return client.db(databasename);
// }

function mongoconnect(databasename, uri) {
  let client = new MongoClient(uri);
  client.connect();
  return client.db(databasename);
}

// DB Fashion
const database = mongoconnect("theweekdays", URI_MONGODB);
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

// DB Account
const account_db = mongoconnect("AccountDB", URI_ACCOUNT);
const adminaccount_collection = account_db.collection("adminaccount");
const customeraccount_collection = account_db.collection("customeraccount");
const session_collection = account_db.collection("session");
const unsafe_collection = account_db.collection("unsafe");

module.exports = {
  mongoconnect,
  database, account_db, adminaccount_collection, customeraccount_collection, session_collection, unsafe_collection,
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

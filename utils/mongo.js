const { MongoClient, ObjectId } = require('mongodb');

// // MongoDB Atlas
// const uri = "mongodb+srv://thanhenc:9fdWvVT0yJTPV3n8@k20411-web2.3xcbrui.mongodb.net/test"
// const client = new MongoClient(uri);

// client.connect(err => {
//     const collection = client.db("theweekdays").collection("product");
//     // perform actions on the collection object
//     console.log("Connected to MongoDB")
//     client.close();
// });


const uri = "mongodb+srv://thanhenc:9fdWvVT0yJTPV3n8@k20411-web2.3xcbrui.mongodb.net/test"
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
const customer_account_collection = database.collection("customer_account");
const delivery_method_collection = database.collection("delivery_method");
const order_collection = database.collection("order");
const payment_method_collection = database.collection("payment_method");
const product_collection = database.collection("product");
const variant_collection = database.collection("variant");
const wishlist_collection = database.collection("wishlist");

module.exports = { mongoconnect, database, address_collection, cart_collection, category_collection, coupon_collection, customer_collection, customer_account_collection, delivery_method_collection, order_collection, payment_method_collection, product_collection, variant_collection, wishlist_collection };
const express = require('express');

const router = express.Router();

const { product_collection } = require('../utils/mongo');
const { ObjectId } = require('mongodb');

// =================SETTING UP ROUTES=================
// prefix: /v1/products

// 1. get all products
router.get("/", async (req, res) => {
    try {
        // get all products from database and send specific fields
        let temp = await product_collection.find({}).toArray();
        const result = temp.map((product) => {
            return {
                _id: product._id,
                product_id: product.product_id,
                name: product.name,
                excerpt: product.excerpt,
                price: product.price,
                original_price: product.original_price,
                rating: product.rating,
                image: product.image[0],
                category: product.category,
                in_stock: product.in_stock
            }
        })
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// 2. get product by id
router.get("/:id", async (req, res) => {
    try {
        oid = new ObjectId(req.params.id);
        const result = await product_collection.findOne({ _id: oid });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// 3. post new product
router.post("/", async (req, res) => {
    try {
        const result = await collection.insertOne(req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// 4. update product by id
router.put("/:id", async (req, res) => {
    try {
        const result = await collection.updateOne({ _id: req.params.id }, { $set: req.body });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// 5. delete product by id
router.delete("/:id", async (req, res) => {
    try {
        const result = await collection.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// ===================================================

module.exports = router;
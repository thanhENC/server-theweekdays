const express = require('express');

const router = express.Router();

const { category_collection, product_collection } = require('../utils/mongo');

const { ObjectId } = require('mongodb');

const cors = require("cors");

// =================SETTING UP ROUTES=================
// prefix: /v1/category

// 1. get all categories sort by date_modified
router.get("/", async (req, res) => {
    try {
        const result = await category_collection.find({}).sort({ date_modified: -1 }).toArray();
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" })
    }
})

// 2. get category by id
router.get('/:cate_id', async (req, res) => {
    try {
        oid = new ObjectId(req.params.cate_id);
        const result = await category_collection.findOne({ _id: oid });
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" })
    }
})

// 3. create new category
router.post("/", async (req, res) => {
    try {
        req.body.count = 0;
        req.body.date_added = new Date().toISOString();
        req.body.date_modified = new Date().toISOString();

        const result = await category_collection.insertOne(req.body);
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// 4. update a category
router.put("/:cate_id", cors(), async (req, res) => {
    try {
        const result = await category_collection.updateOne(
            { _id: new ObjectId(req.params.cate_id) },
            {
                $set: {
                    name: req.body.name,
                    type: req.body.type,
                    image: req.body.image,
                    date_modified: new Date().toISOString()
                }
            }
        )
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// 5. update only count
router.put("/updatecount/:cate_id", cors(), async (req, res) => {
    try {
        number_of_products = (await product_collection.find({ categories: req.params.cate_id }).toArray()).length;

        const result = await category_collection.updateOne(
            { _id: new ObjectId(req.params.cate_id) },
            {
                $set: {
                    count: number_of_products,
                    date_modified: new Date().toISOString()
                }
            }
        )
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// 5. delete category by id
router.delete("/:cate_id", async (req, res) => {
    try {
        const oid = new ObjectId(req.params.cate_id);
        const result = await category_collection.deleteOne({ _id: oid });
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// ===================================================

module.exports = router;
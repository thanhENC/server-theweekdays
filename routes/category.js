const express = require('express');

const router = express.Router();

const { category_collection, product_collection } = require('../utils/mongo');

const { ObjectId } = require('mongodb');
const { verifyToken } = require('../middleware/auth');

// =================SETTING UP ROUTES=================
// port: 4000
// prefix: /v1/category

// 1. GET all categories sort by date_modified
router.get("/", async (req, res) => {
    try {
        const result = await category_collection.find({}).sort({ date_modified: -1 }).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 2. GET category by id
router.get('/:cate_id', async (req, res) => {
    try {
        oid = new ObjectId(req.params.cate_id);
        const result = await category_collection.findOne({ _id: oid });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 3. CREATE new category
// Use for admin site to create new category
router.post("/", verifyToken('admin', 'superadmin'), async (req, res) => {
    try {
        req.body.count = 0;
        req.body.can_delete = true;
        req.body.date_added = new Date().toISOString();
        req.body.date_modified = new Date().toISOString();

        const result = await category_collection.insertOne(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 4. UPDATE a category
// Use for admin site to update category
router.put("/:cate_id", verifyToken('admin', 'superadmin'), async (req, res) => {
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
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 5. UPDATE only count
// Use for admin site to update count of products in category
router.put("/updatecount/:cate_id", verifyToken('admin', 'superadmin'), async (req, res) => {
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
        res.status(500).send({ message: "Something wrong: "  + error });
    }
})

// 5. DELETE category by id
// Use for admin site to delete category
router.delete("/:cate_id", verifyToken('admin', 'superadmin'), async (req, res) => {
    try {
        if ((await product_collection.find({ category: req.params.cate_id }).toArray()).length > 0) {
            res.status(400).send({ message: "Failed to delete, must remove all products out of this category first!" });
        } else {
            const oid = new ObjectId(req.params.cate_id);
            let resultDeleted = await category_collection.findOneAndDelete({ _id: oid, can_delete: true });
            if (resultDeleted.value == null) {
                res.status(500).send({ message: "Failed to delete, the category is protected" });
            } else {
                res.send(resultDeleted);
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Failed" });
    }
})

// ===================================================

module.exports = router;
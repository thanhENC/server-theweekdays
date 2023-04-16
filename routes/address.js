const express = require('express');

const router = express.Router();

const { address_collection } = require('../utils/mongo');
const { ObjectId } = require('mongodb');

// =================SETTING UP ROUTES=================
// prefix: /v1/address

// 1. get all address list by customer id
router.get("/cus:id", async (req, res) => {
    try {
        // get all products from database and send specific fields
        const result = await address_collection.find({ customer_id: req.params.id }).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// 2. get specific address by id
router.get("/:id", async (req, res) => {
    try {
        oid = new ObjectId(req.params.id);
        const result = await address_collection.findOne({ _id: oid });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// ===================================================

module.exports = router;
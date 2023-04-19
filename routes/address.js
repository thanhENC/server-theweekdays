const express = require('express');

const router = express.Router();

const { address_collection } = require('../utils/mongo');
const { ObjectId } = require('mongodb');

// =================SETTING UP ROUTES=================
// prefix: /v1/address

// 1. get all address list by customer id
router.get("/customer/:id", async (req, res) => {
    try {
        const result = await address_collection.find({ customer_id: req.params.id }).sort({ is_default: -1, date_modified: -1 }).toArray();
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// 2. get specific address by id
router.get("/:id", async (req, res) => {
    try {
        oid = new ObjectId(req.params.id);
        const result = await address_collection.findOne({ _id: oid });
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// 3. get default address by customer id
router.get("/default/:id", async (req, res) => {
    try {
        const result = await address_collection.findOne({ customer_id: req.params.id, is_default: true });
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// 4. post new address
router.post("/:customer_id", async (req, res) => {
    try {
        const customer_id = req.params.customer_id;
        const default_address = await address_collection.findOne({ customer_id: customer_id, is_default: true });

        req.body.customer_id = customer_id;
        req.body.date_modified = new Date().toISOString();

        if (!default_address) {
            req.body.is_default = true;
            const result = await address_collection.insertOne(req.body);
            res.send(result);
        } else {
            req.body.is_default = false;
            const result = await address_collection.insertOne(req.body);
            res.send(result);
        }
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// 5. Put an address detail
router.put("/:id", async (req, res) => {
    try {
        oid = new ObjectId(req.params.id)
        const result = await address_collection.updateOne(
            { _id: oid },
            {
                $set: {
                    name: req.body.name,
                    phone: req.body.phone,
                    city: req.body.city,
                    district: req.body.district,
                    address_detail: req.body.address_detail,
                    date_modified: new Date().toISOString()
                }
            });
        res.send(result);
    } catch (error) {
        res.send({ message: "failed" });
    }
})

// 6. Put - set default address
router.put("/default/:cus_id/:id", async (req, res) => {
    try {
        oid = new ObjectId(req.params.id);
        cus_id = req.params.cus_id;
        const unflag_current_default_address = await address_collection.findOneAndUpdate(
            { customer_id: cus_id, is_default: true },
            {
                $set:
                {
                    is_default: false,
                    date_modified: new Date().toISOString()
                }
            });
        const flag_new_default_address = await address_collection.findOneAndUpdate(
            { _id: oid },
            {
                $set:
                {
                    is_default: true,
                    date_modified: new Date().toISOString()
                }
            });
        res.send({
            message: "success",
            flag_new_default_address: flag_new_default_address,
            unflag_current_default_address: unflag_current_default_address
        });
    } catch (error) {
        res.send({ message: "failed" });
    }
});

// ===================================================

module.exports = router;
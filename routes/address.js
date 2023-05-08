const express = require('express');

const router = express.Router();

const { address_collection } = require('../utils/mongo');
const { ObjectId } = require('mongodb');
const { verifyToken } = require('../middleware/auth');

// =================SETTING UP ROUTES=================
// port: 4000
// prefix: /v1/address

// 1. GET all address list by customer id
router.get("/customer/:id", verifyToken(), async (req, res) => {
    try {
        let cus_id = req.params.id;
        if (req.user.role == 'customer') {
            cus_id = req.user.sub;
        }
        const result = await address_collection.find({ customer_id: cus_id }).sort({ is_default: -1, date_modified: -1 }).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 2. GET specific address by id
router.get("/:id", verifyToken(), async (req, res) => {
    try {
        oid = new ObjectId(req.params.id);
        const result = await address_collection.findOne({ _id: oid });
        if (!result) {
            res.status(400).send({ message: "No address" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 3. GET default address by customer id
router.get("/default/:id", verifyToken(), async (req, res) => {
    try {
        let cus_id = req.params.id;
        if (req.user.role == 'customer') {
            cus_id = req.user.sub;
        }
        const result = await address_collection.findOne({ customer_id: cus_id, is_default: true });
        if (!result) {
            res.status(400).send({ message: "No default address" });
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 4. CREATE new address
// Use for customer site to create new address
router.post("/", verifyToken('customer'), async (req, res) => {
    try {
        req.body.customer_id = req.user.sub;
        req.body.date_modified = new Date().toISOString();

        const default_address = await address_collection.findOne({ customer_id: req.user.sub, is_default: true });
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
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 5. UPDATE an address detail
// Use for customer site to update address
router.put("/:id", verifyToken('customer'), async (req, res) => {
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
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

// 6. SET default address
// Use for customer site to set default address
router.put("/default/:adr_id", verifyToken('customer'), async (req, res) => {
    try {
        oid = new ObjectId(req.params.adr_id);
        customer_id = req.user.sub;

        // Check if address_id belong to customer_id
        const address_belong = await address_collection.findOne({ _id: oid, customer_id });
        if (!address_belong) {
            res.status(400).send({ message: "Address not belong to customer" });
        }

        const result = await address_collection.updateOne({ _id: oid }, { $set: { is_default: true } });

        await address_collection.updateMany({ customer_id, _id: { $ne: oid } }, { $set: { is_default: false } });

        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Something wrong: " + error });
    }
});

// 7. DELETE an address
// Use for customer site to delete address
router.delete("/:id", verifyToken('customer'), async (req, res) => {
    try {
        oid = new ObjectId(req.params.id);
        customer_id = req.user.sub;

        // Check if address_id belong to customer_id
        const address_belong = await address_collection.findOne({ _id: oid, customer_id });
        if (!address_belong) {
            return res.status(400).send({ message: "Address not belong to customer" });
        }

        // 1. Delete address
        const result = await address_collection.deleteOne({ _id: oid });
        // 2. Check if default address still exist
        const address_list_lenght = await address_collection.find({ customer_id }).toArray().length;
        if (address_list_lenght != 0) {
            const default_address = await address_collection.findOne({ customer_id, is_default: true });
            if (!default_address) {
                const new_default_address = await address_collection.findOneAndUpdate({ customer_id }, { $set: { is_default: true } });
            }
        }
        return res.send(result);
    }
    catch (error) {
        return res.status(500).send({ message: "Something wrong: " + error });
    }
});

// ===================================================

module.exports = router;
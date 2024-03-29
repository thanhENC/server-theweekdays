const express = require('express');
const router = express.Router();
const { customer_collection } = require('../utils/mongo');
const { ObjectId } = require('mongodb');
const { route } = require('./customer');

const { default_malecustomer_image, default_femalecustomer_image } = require('../utils/default_resource');
const { verifyToken } = require('../middleware/auth');

// =================SETTING UP ROUTES=================
// prefix: /v1/customer 

// 1. get list of all customers
router.get("/", verifyToken('admin', 'superadmin'), async (req, res) => {
    try {
        let result = await customer_collection.find({}).toArray();
        if(req.query.page) {
            result = result.slice((req.query.page - 1) * 10, req.query.page * 10);
          }
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// 2. get specific customer by id
router.get("/:id", async (req, res) => {
    try {
        oid = new ObjectId(req.params.id);
        const result = await customer_collection.findOne({ _id: oid });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// get self info
router.get("/selfinfo", verifyToken('customer'), async (req, res) => {
    try {
        oid = new ObjectId(req.user.sub);
        const info = await customer_collection.findOne({ _id: oid });
        const account_info = await account_collection.findOne({ _id: new ObjectId(req.user.sub) });
        const result = {
            ...info,
            email: account_info.email,
            phone: account_info.phone,
            username: account_info.username
        }
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Something wrong: " + error });
    }
})

//3. put infomation of customer by id
router.put("/:id", async (req, res) => {
    await customer_collection.updateOne(
        { _id: new ObjectId(req.params.id) },//condition for update
        {
            $set: {
                name: req.body.name,
                dob: req.body.dob,
                gender: req.body.gender,
                image: req.body.image
            }
        }
    )

    var o_id = new ObjectId(req.params.id);
    const result = await customer_collection.find({ _id: o_id }).toArray();
    res.send(result[0])
})

// 4. Post a new customer
router.post("/", async (req, res) => {
    try {
        const
            {
                account_id,
                name = "",
                dob = "",
                gender = ""
            } = req.body;

        const customer = {
            account_id,
            name,
            dob,
            gender,
            membership: 0,
            image: default_malecustomer_image
        }
        const result = await customer_collection.insertOne(customer);
        return res
            .status(200)
            .send({ message: "Success" });
    } catch (error) {
        console.log(error);
    }
})

// 5. Delete a customer by id
router.delete("/:id", verifyToken('customer'), async (req, res) => {
    try {
        const { id } = req.params;
        const result = await customer_collection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

// ===================================================
module.exports = router;
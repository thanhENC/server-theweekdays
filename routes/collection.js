const express = require("express");

const router = express.Router();

const { collection_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");
const { Collection } = require("mongoose");
const { verifyToken } = require("../middleware/auth");

// =================SETTING UP ROUTES=================
// Port: 4000
// prefix: /v1/collection

// 1. GET all collection
router.get("/", async (req, res) => {
  try {
    // get all collections from database and send specific fields
    let result = await collection_collection.find({}).toArray();
    if (req.query.page) {
      result = result.slice((req.query.page - 1) * 10, req.query.page * 10);
    }
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Something wrong: " + error });
  }
});

// 2. GET collection by id
router.get("/:id", async (req, res) => {
  try {
    oid = new ObjectId(req.params.id);
    const result = await collection_collection.findOne({ _id: oid });
    res.send(result);
  } catch (error) {
    res.send({ message: "Something wrong: " + error });
  }
});

// 3. CREATE new collection
// Use for admin site to create new collection
router.post("/", verifyToken('admin', 'superadmin'), async (req, res) => {
  try {
    const result = await collection_collection.insertOne(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Something wrong: " + error });
  }
});

// 4. UPDATE collection by id
// Use for admin site to update collection
router.put("/", verifyToken('admin', 'superadmin'), async (req, res) => {
  try {
    const result = await collection_collection.updateOne(
      { _id: new ObjectId(req.body._id) }, //condition for update
      {
        $set: {
          //Field for updating
          name: req.body.name,
          description: req.body.description,
          lookbook: req.body.lookbook,
          image: req.body.image,
          products: req.body.products,
          modifiedDate: new Date(),
          videoId: req.body.videoId
        },
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Something wrong: " + error });
  }
});

//5. delete collection by id
router.delete("/:id", verifyToken('admin', 'superadmin'), async (req, res) => {
  try {
    var o_id = new ObjectId(req.params["id"]);
    const result = await collection_collection.deleteOne({ _id: o_id });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Something wrong: " + error })
  }
});

// ===================================================

module.exports = router;

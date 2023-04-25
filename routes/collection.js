const express = require("express");

const router = express.Router();

const { collection_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");
const { Collection } = require("mongoose");

// =================SETTING UP ROUTES=================
// prefix: /v1/collection

// 1. get all collection
router.get("/", async (req, res) => {
  try {
    // get all collections from database and send specific fields
    let result = await collection_collection.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// 2. get collection by id
router.get("/:id", async (req, res) => {
  try {
    oid = new ObjectId(req.params.id);
    const result = await collection_collection.findOne({ _id: oid });
    res.send(result);
  } catch (error) {
    res.send({ message: "Collection not found" });
  }
});

// 3. post new collection
router.post("/", async (req, res) => {
  try {
    const result = await collection_collection.insertOne(req.body);
    res.send(result);
  } catch (error) {
    res.send({ message: "Failed" });
  }
});

// 4. update collection by id
router.put("/", async (req, res) => {
  //update json Fashion into database
  try {
    await collection_collection.updateOne(
      { _id: new ObjectId(req.body._id) }, //condition for update
      {
        $set: {
          //Field for updating
          name: req.body.name,
          description: req.body.description,
          lookbook: req.body.lookbook,
          products: req.body.products,
          modifiedDate: new Date(),
          videoId: req.body.videoId,
        },
      }
    );
    var o_id = new ObjectId(req.body._id);
    const result = await collection_collection.find({ _id: o_id }).toArray();
    res.send(result[0]);
  } catch (error) {
    res.send({ message: "Failed" })
  }
});

//5. delete collection by id
router.delete("/:id", async (req, res) => {
  try {
    var o_id = new ObjectId(req.params["id"]);
    const result = await collection_collection.find({ _id: o_id }).toArray();
    await collection_collection.deleteOne({ _id: o_id });
    res.send(result[0]);
  } catch (error) {
    res.send({ message: "Failed" })
  }
});

// ===================================================

module.exports = router;

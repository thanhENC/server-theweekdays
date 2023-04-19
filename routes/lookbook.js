const express = require("express");

const router = express.Router();

const { lookbook_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

// =================SETTING UP ROUTES=================
// prefix: /v1/lookbook

// 1. get lookbook by id
router.get("/:id", async (req, res) => {
  try {
    oid = new ObjectId(req.params.id);
    const result = await lookbook_collection.findOne({ _id: oid });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// 2. post new lookbook
router.post("/", async (req, res) => {
  try {
    const result = await lookbook_collection.insertOne(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// 3. update lookbook by id
router.put("/", async (req, res) => {
  await lookbook_collection.updateOne(
    { _id: new ObjectId(req.body._id) }, //condition for update
    {
      $set: {
        //Field for updating
        image: req.body.image,
        products: req.body.products,
      },
    }
  );
  var o_id = new ObjectId(req.body._id);
  const result = await lookbook_collection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

// 4. delete lookbook by id
router.delete("/:id", async (req, res) => {
  //find detail Fashion with id
  var o_id = new ObjectId(req.params["id"]);
  const result = await lookbook_collection.find({ _id: o_id }).toArray();
  await lookbook_collection.deleteOne({ _id: o_id });
  res.send(result[0]);
});

//5. get all lookbook
router.get("/", async (req, res) => {
  try {
    // get all products from database and send specific fields
    let result = await lookbook_collection.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// ===================================================

module.exports = router;

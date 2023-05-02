const express = require("express");

const router = express.Router();

const { order_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

// =================SETTING UP ROUTES=================
// prefix: /v1/order

// 1. get order by id
router.get("/:id", async (req, res) => {
  try {
    oid = new ObjectId(req.params.id);
    const result = await order_collection.findOne({ _id: oid });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// 2. get order by customer id
router.get("/customer/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    let orders = await order_collection.find({ customer_id: userId }).toArray();
    if (req.query.page) {
      orders = orders.slice((req.query.page - 1) * 10, req.query.page * 10);
    }
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 3. post order
router.post("/", async (req, res) => {
  try {
    const {
      date = new Date().toISOString,
      total,
      customer_id,
      payment,
      delivery,
      receiver_info,
      products,
      discount,
      status,
      progress,
    } = req.body;

    const newOrder = {
      date,
      total,
      customer_id,
      payment,
      delivery,
      receiver_info,
      products,
      discount,
      status,
      progress,
    };

    const result = await order_collection.insertOne(newOrder);
    console.log(result);
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

//4. put order by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date,
      total,
      customer_id,
      payment,
      delivery,
      receiver_info,
      products,
      discount,
      status,
      progress,
    } = req.body;

    await order_collection.updateOne(
      { _id: new ObjectId(id) },

      {
        $set: {
          date: date ? new Date(date) : new Date(),
          total,
          customer_id,
          payment,
          delivery,
          receiver_info,
          products,
          discount,
          status,
          progress,
        },
      }
    );
    const updatedOrder = await order_collection.findOne({
      _id: new ObjectId(id),
    });
    res.send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 5.get order by status
router.get("/status/:status", async (req, res) => {
  try {
    const status = req.params.status;
    let orders = await order_collection.find({ status: status }).toArray();
    if (req.query.page) {
      orders = orders.slice((req.query.page - 1) * 10, req.query.page * 10);
    }
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// ===================================================

module.exports = router;

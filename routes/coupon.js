const express = require("express");
const router = express.Router();
const { coupon_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

// =================SETTING UP ROUTES=================
// prefix: /v1/coupon

// 1.Get all coupon list and sort by time
router.get("/", async (req, res) => {
  try {
    let result = await coupon_collection
      .find({})
      .sort({ valid_to: -1 })
      .toArray();
    if (req.query.page) {
      result = result.slice((req.query.page - 1) * 10, req.query.page * 10);
    }
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// 2. get coupon by condition
router.get("/code/:coupon_code", async (req, res) => {
  const coupon_code = req.params.coupon_code;
  const now = new Date();
  try {
    // get the coupon with the given coupon_code
    const coupon = await coupon_collection.findOne({
      coupon_code: coupon_code,
    });
    if (!coupon) {
      // Coupon invalid
      return res.status(404).send({ message: "Coupon not found" });
    }
    if (!coupon.is_active) {
      // Coupon is not active
      return res.status(403).send({ message: "Coupon is not active" });
    }
    const valid_from = new Date(coupon.valid_from);
    const valid_to = new Date(coupon.valid_to);
    if (now < valid_from || now > valid_to) {
      // Coupon is qua dated
      return res.status(403).send({ message: "Coupon is expired" });
    }
    // Coupon is sugoi chimuchimuchimu
    res.send(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 3. get coupon by id
router.get("/:id", async (req, res) => {
  try {
    oid = new ObjectId(req.params.id);
    const result = await coupon_collection.findOne({ _id: oid });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// 4. PUT a coupon by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      coupon_code,
      title,
      is_percentage,
      value,
      is_active,
      valid_from,
      valid_to,
      membership,
      quantity,
      min_order,
      max_discount,
    } = req.body;

    if (
      !coupon_code ||
      !title ||
      is_percentage === undefined ||
      value < 0 ||
      is_active === undefined ||
      !valid_from ||
      !valid_to ||
      membership < 0 ||
      quantity <= 0 ||
      min_order < 0 ||
      max_discount < 0
    ) {
      return res
        .status(400)
        .send({ message: "Missing required fields in request body" });
    }

    await coupon_collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          coupon_code,
          title,
          is_percentage,
          value,
          is_active,
          valid_from,
          valid_to,
          quantity,
          membership,
          min_order,
          max_discount,
        },
      }
    );

    const updatedCoupon = await coupon_collection.findOne({
      _id: new ObjectId(id),
    });
    res.send(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 5. post a coupon
router.post("/", async (req, res) => {
  try {
    const {
      coupon_code,
      title,
      is_percentage,
      value,
      is_active,
      created_at = new Date().toISOString(),
      valid_from,
      valid_to,
      membership,
      quantity,
      min_order,
      max_discount,
    } = req.body;

    if (
      !coupon_code ||
      !title ||
      is_percentage === undefined ||
      value < 0 ||
      is_active === undefined ||
      !valid_from ||
      !valid_to ||
      membership < 0 ||
      quantity <= 0 ||
      min_order < 0 ||
      max_discount < 0
    ) {
      return res
        .status(400)
        .send({ message: "Missing required fields in request body" });
    }

    const coupon = {
      coupon_code,
      title,
      is_percentage,
      value,
      is_active,
      created_at,
      valid_from,
      valid_to,
      membership,
      quantity,
      min_order,
      max_discount,
    };

    const result = await coupon_collection.insertOne(coupon);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 6. delete a coupon by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await coupon_collection.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});
// ===================================================

module.exports = router;

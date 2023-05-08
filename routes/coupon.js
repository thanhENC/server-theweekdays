const express = require("express");
const router = express.Router();
const { coupon_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");
const { allowAccess } = require("./authMiddleware");
const { verifyToken } = require("../middleware/auth");

// =================SETTING UP ROUTES=================
// server: product
// port: 4000
// prefix: /v1/coupon

// 1.GET all coupon list and sort by time - DONE
// Use for admin site to manage coupon
router.get("/", verifyToken('superadmin', 'admin'), async (req, res) => {
  try {
    let result = await coupon_collection
      .find({})
      .sort({ valid_to: -1 })
      .toArray();
    if (req.query.page) {
      result = result.slice((req.query.page - 1) * 10, req.query.page * 10);
    }
    res.send({ user: req.user, result: result });
  } catch (error) {
    res.status(500).send({ message: "Something wrong " + error });
  }
});

// 2. GET coupon by Coupon Code - DONE
// Use for customer site to get coupon and apply
router.get("/code/:coupon_code", verifyToken(), async (req, res) => {
  const coupon_code = req.params.coupon_code.toUpperCase();
  const now = new Date();
  try {
    // get the coupon with the given coupon_code
    const coupon = await coupon_collection.findOne({
      coupon_code: coupon_code,
      is_active: true
    });
    if (!coupon) {
      // Coupon invalid
      return res.status(400).send({ message: "Invalid Coupon" });
    }
    const valid_from = new Date(coupon.valid_from);
    const valid_to = new Date(coupon.valid_to);
    if (now < valid_from || now > valid_to) {
      // Coupon is qua dated
      return res.status(400).send({ message: "Coupon is expired" });
    }
    // Coupon is sugoi chimuchimuchimu
    res.send(coupon);
  } catch (error) {
    res.status(500).send({ message: "Something wrong: " + error });
  }
});

// 3. get coupon by id - DONE
// Use for admin site to manage coupon
router.get("/:id", verifyToken(), async (req, res) => {
  try {
    oid = new ObjectId(req.params.id);
    const result = await coupon_collection.findOne({ _id: oid });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Something wrong: " + error });
  }
});

// 4. PUT a coupon by id - NEED TO TEST
// Use for admin site to manage coupon
router.put("/:id", verifyToken('admin', 'superadmin'), async (req, res) => {
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

    // Prevent duplicate coupon_code
    const coupon = await coupon_collection.findOne({ _id: { $ne: new ObjectId(id) }, coupon_code: coupon_code });
    if (coupon) {
      return res.status(400).send({ message: "Coupon code already exists" });
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

    res.send({ message: "Updated coupon " + coupon_code });
  } catch (error) {
    res.status(500).send({ message: "Something wrong: " + error });
  }
});

// 5. Create a new coupon - DONE
// Use for admin site to manage coupon
router.post("/", verifyToken('admin', 'superadmin'), async (req, res) => {
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

    return res.send({ message: "Created coupon " + coupon_code });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 6. DELETE a coupon by id - DONE
// Use for admin site to manage coupon
router.delete("/:id", verifyToken('admin', 'superadmin'), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await coupon_collection.deleteOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Something wrong: " + error });
  }
});
// ===================================================

module.exports = router;

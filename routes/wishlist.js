const express = require("express");
const router = express.Router();
const { wishlist_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");
const { allowAccess } = require("./authMiddleware");
const { verifyToken } = require("../middleware/auth");

// =================SETTING UP ROUTES=================
// port: 4000
// prefix: v1/wishlist


//1. Get wishtlist  by id
router.get("/:id", async (req, res) => {
    try {
        oid = new ObjectId(req.params.id);
        const result = await wishlist_collection.findOne({ _id: oid });
        res.send(result);
    } catch (error) {
        res.status(500).send({ messages: "Something wrong:" + error });
    }
});

//2. Get wishlist by customer id
router.get("/customer/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;;
        let wishlist = await wishlist_collection.find({ customer_id: userId }).toArray();
        if (req.query.page) {
            result = result.slice((req.query.page - 1) * 10, req.query.page * 10);
        }
        res.send(wishlist);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});
//3. Get all wishlist
router.get("/", async (req, res) => {
    try {
        let wishlist = await wishlist_collection.find({}).toArray();
        if (req.query.page) {
            result = result.slice((req.query.page - 1) * 10, req.query.page * 10);
        }
        res.send(wishlist);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
});
// 4. Update wishlist
router.put("/customer/:customer_id", async (req, res) => {
    try {
        const { customer_id } = req.params;
        const { products } = req.body;

        // Find wishlist by customer_id
        const wishlist = await wishlist_collection.findOne({ customer_id: customer_id });

        // Update products in the wishlist
        wishlist.products = products;

        // Update wishlist in the database
        await wishlist_collection.updateOne(
            { _id: new ObjectId(wishlist._id) },
            { $set: { products: wishlist.products } }
        );

        res.send({ message: "Wishlist has been updated" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" + error });
    }
});

// 5. Delete wishlist

router.delete("/customer/:customer_id/product/:product_id", async (req, res) => {
    try {
      const { customer_id, product_id } = req.params;
  
      // Find wishlist by customer_id
      const wishlist = await wishlist_collection.findOne({ customer_id: customer_id });
  
      // wishlist.products[]: find product_id then delete it
        wishlist.products = wishlist.products.filter(
        (product) => product.product_id !== product_id
        );
  
      // Update wishlist in the database
      await wishlist_collection.updateOne(
        { _id: new ObjectId(wishlist._id) },
        { $set: { products: wishlist.products } }
      );
  
      res.send({ message: "Product has been removed from wishlist" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" + error });
    }
  });
  
// ===================================================
module.exports = router;
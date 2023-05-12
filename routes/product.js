const express = require("express");

const router = express.Router();

const { product_collection, variant_collection, category_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

const { allowAccess, logSession } = require("./authMiddleware");

const cors = require("cors");

// =================SETTING UP ROUTES=================
// prefix: /v1/products

// 1. get all products
router.get("/", async (req, res) => {
  try {
    // get all products from database and send specific fields
    let temp = await product_collection.find({}).toArray();

    // get filtered products if filter is applied
    if (req.query.min) {
      temp = temp.filter((product) => {
        return product.price > req.query.min;
      });
    }

    if (req.query.max) {
      temp = temp.filter((product) => {
        return product.price < req.query.max;
      });
    }

    if (req.query.page) {
      temp = temp.slice((req.query.page - 1) * 10, req.query.page * 10);
    }

    if (req.query.category) {
      temp = temp.filter((product) => {
        return product.category.includes(req.query.category);
      });
    }

    if (req.query.search) {
      temp = temp.filter((product) => {
        return product.name.toLowerCase().includes(req.query.search.toLowerCase());
      });
    }

    if (req.query.sale) {
      temp = temp.filter((product) => {
        return product.original_price > product.price;
      });
    }

    const result = temp.map((product) => {
      return {
        _id: product._id,
        product_id: product.product_id,
        name: product.name,
        excerpt: product.excerpt,
        price: product.price,
        original_price: product.original_price,
        rating: product.rating,
        image: product.image[0],
        category: product.category,
        in_stock: product.in_stock,
      };
    });
    // log request
    logSession(req, res, 200);
    res.status(200).send(result);
  } catch (error) {
    // log request
    logSession(req, res, 500);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// 2. get product by id
router.get("/:id", async (req, res) => {
  try {
    oid = new ObjectId(req.params.id);
    const result = await product_collection.findOne({ _id: oid });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// 3. post new product
router.post("/", allowAccess('admin', 'superadmin'), cors(), async (req, res) => {
  try {
    let new_product = {
      product_id: req.body.product_id,
      name: req.body.name,
      excerpt: req.body.excerpt,
      description: req.body.description,
      price: req.body.price,
      original_price: req.body.original_price,
      on_sale: req.body.on_sale,
      rating: req.body.rating,
      in_stock: req.body.in_stock,
      min_qty: req.body.min_qty,
      max_qty: req.body.max_qty,
      image: req.body.image,
      category: req.body.category,
      variants: req.body.variants
    }
    const result = await product_collection.insertOne(new_product);
    res.status(201).send({
      message: "success",
      content: result
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// 4. update product by id
router.put("/:id", allowAccess('admin', 'superadmin'), async (req, res) => {
  try {
    const result = await product_collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          excerpt: req.body.excerpt,
          description: req.body.description,
          price: req.body.price,
          original_price: req.body.original_price,
          on_sale: req.body.on_sale,
          rating: req.body.rating,
          in_stock: req.body.in_stock,
          min_qty: req.body.min_qty,
          max_qty: req.body.max_qty,
          image: req.body.image,
          category: req.body.category,
          variants: req.body.variants
        }
      }
    );
    res.status(200).send({ message: "success", content: result });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// 5. delete product by id
router.delete("/:id", allowAccess('admin', 'superadmin'), async (req, res) => {
  try {
    const result = await product_collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send({ message: "success", content: result });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// ===================================================

module.exports = router;

const express = require("express");

const router = express.Router();

const { account_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

const bcrypt = require("bcryptjs");

// =================SETTING UP ROUTES=================
// prefix: /v1/login

// 1. sign up an account
router.post("/signup/", async (req, res) => {
  let account = new Object({
    _id: new ObjectId(),
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
    type: {
      admin: req.body.type.admin,
      role: req.body.type.role,
    },
    register_date: new Date(),
    last_active: new Date(),
    is_deleted: false,
  });
  try {
    res.send(account);
    console.log("Account created successfully");
  } catch (error) {
    console.log(error);
  }
});

// 2. log gin
router.post("/login/", async (req, res) => {
  try {
    const result = await account_collection.findOne({
      username: req.body.username,
    });
    if (!result) {
      return res.status(404).send({ message: "Account not found" });
    } 
    else {
      const passwordIsValid = bcrypt.compareSync(req.body.password,result.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }
      res.send(result._id);
    }
  } catch (error) {
    console.log(error);
  }
});

// 3. Put update account by id
// 4. update product by id
router.put("/update/:id", async (req, res) => {
  try {
      const result = await account_collection.updateOne({ _id: req.params.id }, { $set: req.body });
      res.send(req.body);
  } catch (error) {
      console.log(error);
  }
})

// ===================================================

module.exports = router;

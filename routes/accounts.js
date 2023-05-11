const express = require("express");
const router = express.Router();
const { adminaccount_collection, customeraccount_collection, customer_collection, cart_collection, wishlist_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");
const { sendEmailWelcomeCustomer, sendEmailConfirmCreateAdmin } = require("../utils/email");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/auth");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../env");
const { default_malecustomer_image } = require("../utils/default_resource");

// ================= HELPER FUNCTION =================
// generate token and refresh_token
function generateToken(payload) {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '30m' }); // should be 15-30 minutes
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '14d' }); // should be 1-2 weeks
  return { accessToken, refreshToken };
}

// update refresh_token in database
async function updateRefreshToken(payload, refreshToken) {
  if (payload.role == 'customer') {
    await customeraccount_collection.findOneAndUpdate({ username: payload.username, is_deleted: false }, { $set: { refreshToken: refreshToken } });
  } else if (payload.role == 'admin' || payload.role == 'superadmin') {
    await adminaccount_collection.findOneAndUpdate({ username: payload.username, is_deleted: false }, { $set: { refreshToken: refreshToken } });
  } else {
    console.log('updateRefreshToken: invalid role: ${payload.username}');
  }
}

// =================SETTING UP ROUTES=================
// server: Auth
// port: 5000
// prefix: /v1/

// 1. sign up an account (customer) - DONE
router.post("/signup", async (req, res) => {
  try {
    username = req.body.username;
    // 1.1. If username already exists
    if (await customeraccount_collection.findOne({ username: username, is_deleted: false })) {
      return res.status(400).send({ message: "Username already exists" });
    } else {
      // 1.2. If username does not exist
      // 1.2.0. Create new account object
      const account = {
        username: username,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8),
        role: "customer",
        register_date: new Date(),
        last_active: new Date(),
        is_deleted: false,
      };

      // 1.2.1. Insert new account into database
      const create_account_result = await customeraccount_collection.insertOne(account);

      // 1.2.2. Create new customer info object
      const payload = {
        _id: new ObjectId(create_account_result.insertedId.toString()),
        name: req.body.username,
        dob: '',
        gender: 'male',
        membership: 0,
        image: default_malecustomer_image
      }

      // 1.2.3. Insert new customer info into database
      const create_info_result = await customer_collection.insertOne(payload);

      // 1.2.4. Create new cart object
      const cart = {
        _id: new ObjectId(create_account_result.insertedId.toString()),
        customer_id: create_account_result.insertedId.toString(),
        products: [],
        total: 0
      }

      // 1.2.5. Insert new cart into database
      const create_cart_result = await cart_collection.insertOne(cart);

      // create new wishlist object
      const wishlist = {
        _id: new ObjectId(create_account_result.insertedId.toString()),
        customer_id: create_account_result.insertedId.toString(),
        products: []
      }

      // insert new wishlist into database
      const create_wishlist_result = await wishlist_collection.insertOne(wishlist);

      // 1.2.4. Send email to customer
      sendEmailWelcomeCustomer(req.body.email, req.body.username);

      // 1.2.5. Send response
      res.send({ account: create_account_result, info: create_info_result, cart: create_cart_result, wishlist: create_wishlist_result });
    }
  } catch (error) {
    res.status(500).send({ message: 'something wrong ' + error });
  }
});

// 1. Sign up an account admin by superadmin - DONE
// Only allow superadmin access
router.post("/signup/admin", verifyToken('superadmin'), async (req, res) => {
  try {
    username = req.body.username;
    // 1.1. If username already exists
    if (await adminaccount_collection.findOne({ username: username, is_deleted: false })) {
      return res.status(400).send({ message: "Username already exists" });
    } else {
      // 1.2. If username does not exist
      // 1.2.0. Create new account object
      const account = {
        username: username,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 8),
        role: "admin",
        register_date: new Date(),
        last_active: new Date(),
        is_deleted: false,
      };

      // 1.2.1. Insert new account into database
      const result = await adminaccount_collection.insertOne(account);

      // 1.2.2. Send email to admin
      sendEmailConfirmCreateAdmin(req.body.email, req.body.username)

      res.send(result);
    }
  } catch (error) {
    res.status(500).send('something wrong ' + error);
  }
});

// 2. Customer login - DONE
router.post("/login", async (req, res) => {
  try {
    const result = await customeraccount_collection.findOne({
      username: req.body.username, is_deleted: false
    });
    if (!result) {
      return res.status(404).send({ message: "Account not found" });
    } else {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        result.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      } else {
        // req.session.user = result._id.toString();
        // req.session.role = result.role;
        // req.session.email = result.email;
        // // req.session.ip = req.ip;
        // // req.session.user_agent = req.headers['user-agent'];
        // req.session.active = true;

        // user data
        const payload = {
          sub: result._id.toString(),
          username: result.username,
          role: result.role,
          // iat: Date.now(),
          // exp: Date.now() + 1000 * 60 * 60, // 1 hour expiration
        };
        const tokens = generateToken(payload);
        updateRefreshToken(payload, tokens.refreshToken);
        res.json(tokens);
      }
    }
  } catch (error) {
    res.status(500).send({ err: 'something wrong ' + error });
  }
});

// 2. Admin login - DONE
router.post("/login/admin", async (req, res) => {
  try {
    const result = await adminaccount_collection.findOne({
      username: req.body.username, is_deleted: false
    });
    if (!result) {
      return res.status(404).send({ message: "Account not found" });
    } else {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        result.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      } else {
        // req.session.user = result._id.toString();
        // req.session.role = result.role;
        // req.session.email = result.email;
        // req.session.ip = req.ip;
        // req.session.user_agent = req.headers['user-agent'];
        // req.session.active = true;

        const payload = {
          sub: result._id.toString(),
          username: result.username,
          role: result.role,
          // iat: Date.now(),
          // exp: Date.now() + 1000 * 60 * 60, // 1 hour expiration
        };
        const tokens = generateToken(payload);
        updateRefreshToken(payload, tokens.refreshToken);
        res.json(tokens);
      }
    }
  } catch (error) {
    res.status(500).send({ message: 'something wrong ' + error });
  }
});

// Get new access_token by refresh_token - DONE
router.post("/token", async (req, res) => {
  // check if refresh token is provided
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).send({ message: "No refresh token provided" });
  }

  // check if refresh token is valid
  const user = await customeraccount_collection.findOne({ refreshToken: refreshToken });
  if (!user) {
    return res.status(403).send({ message: "Invalid refresh token" });
  }

  try {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const payload = {
      sub: user._id.toString(),
      username: user.username,
      role: user.role,
    };
    const tokens = generateToken(payload);
    updateRefreshToken(user.username, tokens.refreshToken);
    res.json(tokens);
  } catch (error) {
    console.log(error);
    res.status(403).send({ message: "Can not verify by refresh token" });
  }
});

// 3. Update customer account by id (customer can only update his own account info) - DONE
router.put("/customer/:id", verifyToken(), async (req, res) => {
  // if customer updates own account, get id from token
  // if admin/ superadmin updates customer account, get id from req.params
  let cus_id = req.params.id;
  if (req.user.role == 'customer' && req.user.sub != cus_id) {
    return res.status(403).send({ message: "Cannot update other customer account" });
  }

  try {
    // prevent duplicate username
    const check_unique_username = await customeraccount_collection.find({ _id: { $ne: new ObjectId(cus_id) }, username: req.body.username, is_deleted: false }).toArray();
    if (check_unique_username.length > 0) {
      return res.status(400).send({ message: "Username already exists" });
    }

    await customeraccount_collection.updateOne(
      { _id: new ObjectId(cus_id), is_deleted: false }, //condition for update
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          // password: bcrypt.hashSync(req.body.password, 8),
          last_active: new Date()
        },
      }
    );
    res.send({ message: "Update success" });
  } catch (error) {
    res.status(500).send({ message: 'something wrong ' + error });
  }
});

// 3. Put update admin account by id (only superadmin can update admin account) - DONE
router.put("/admin/:id", verifyToken('superadmin'), async (req, res) => {
  account_id = req.params.id;
  try {
    // prevent duplicate username
    const check_unique_username = await adminaccount_collection.find({ _id: { $ne: new ObjectId(account_id) }, username: req.body.username, is_deleted: false }).toArray();
    if (check_unique_username.length > 0) {
      return res.status(400).send({ message: "Username already exists" });
    }

    await adminaccount_collection.updateOne(
      { _id: new ObjectId(account_id), is_deleted: false }, //condition for update
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          last_active: new Date()
        },
      }
    );
    res.send({ message: "Update success" });
  } catch (error) {
    res.status(500).send('something wrong ' + error);
  }
});

// 4. Customer delete own account - DONE
// Customer must provide password to delete own account
router.delete("/customer", verifyToken('customer'), async (req, res) => {
  cus_id = req.user.sub;
  try {
    // check if password is correct
    const result = await customeraccount_collection.findOne({ _id: new ObjectId(cus_id), is_deleted: false });
    console.log("Got customer password");
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      result.password
    );
    console.log("Checked password", passwordIsValid);
    if (!passwordIsValid) {
      return res.status(400).send({
        message: "Invalid Password. Cannot delete account"
      });
    }
    console.log("Validate password success");
    await customeraccount_collection.updateOne(
      { _id: new ObjectId(cus_id), is_deleted: false }, //condition for update
      { $set: { is_deleted: true, refreshToken: null } }
    );
    res.send({ message: "Delete success" });
  } catch (error) {
    res.status(500).send({ message: 'something wrong ' + error });
  }
});

// 4. Delete admin account by id - only superadmin can delete admin, superadmin cannot delete superadmin and admin can not delete own account - DONE
router.delete("/admin/:id", verifyToken('superadmin'), async (req, res) => {
  try {
    will_be_deleted_admin_id = req.params.id;
    // check if superadmin is deleting superadmin
    superadmin_account_check = await adminaccount_collection.findOne({ _id: ObjectId(will_be_deleted_admin_id), role: 'superadmin', is_deleted: false });
    if (superadmin_account_check) {
      return res.status(403).send({ message: "Cannot delete superadmin" });
    }
    // delete admin
    await adminaccount_collection.findOneAndUpdate(
      { _id: new ObjectId(will_be_deleted_admin_id), is_deleted: false, role: { $ne: 'superadmin' } }, //condition for update
      { $set: { is_deleted: true, refreshToken: null } }
    );
    res.send({ message: "Delete success" });
  } catch (error) {
    res.status(500).send('something wrong ' + error);
  }
});

// 4. logout
router.post("/logout", verifyToken(), async (req, res) => {
  try {
    updateRefreshToken(req.user.username, null);
    res.send({ message: "Logout success" });
  } catch (error) {
    res.status(500).send({ message: 'something wrong ' + error });
  }
});

// logout all sessions
router.post("/logout/all", verifyToken(), async (req, res) => {
  try {
    updateRefreshToken(req.user.username, null);
    res.send({ message: "Logout all session success" });
  } catch (error) {
    res.status(500).send({ message: 'something wrong ' + error });
  }
});

// ===================================================

module.exports = router;

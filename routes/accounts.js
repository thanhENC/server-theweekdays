const express = require("express");

const router = express.Router();

const { account_collection, lookbook_collection, adminaccount_collection, customeraccount_collection, session_collection } = require("../utils/mongo");
const { ObjectId } = require("mongodb");

const { allowAccess, denyAccess, logSession } = require("./authMiddleware");

const { welcomeEmail, transporter, FROM, WELCOME_SUBJECT } = require("../utils/email");

const bcrypt = require("bcryptjs");

// =================SETTING UP ROUTES=================
// prefix: /v1/account

// 1. sign up an account (customer)
// Only allow access if not signed in
router.post("/signup", denyAccess(), async (req, res) => {
  try {
    username = req.body.username;
    // check if username already exists
    if (await customeraccount_collection.findOne({ username: username, is_deleted: false })) {
      logSession(req, res, 400);
      return res.status(400).send({ message: "Username already exists" });
    } else {
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

      const mailOptions = {
        from: FROM,
        to: req.body.email,
        subject: WELCOME_SUBJECT,
        text: 'This is email for your registration at Fashion Website - The Weekdays',
        html: welcomeEmail(req.body.username, req.body.password)
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logSession(req, res, 500);
          res.send(error);
        }
      });

      const result = await customeraccount_collection.insertOne(account);
      logSession(req, res, 200);
      res.send(result);
    }
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// 1. Sign up an account admin by superadmin
// Only allow superadmin access
router.post("/signup/admin", allowAccess('superadmin'), async (req, res) => {
  try {
    username = req.body.username;
    // check if username already exists
    if (await adminaccount_collection.findOne({ username: username, is_deleted: false })) {
      logSession(req, res, 400);
      return res.status(400).send({ message: "Username already exists" });
    } else {
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

      const mailOptions = {
        from: FROM,
        to: 'noreply@theweekdays.live',
        subject: WELCOME_SUBJECT,
        text: 'This is email for new admin registration at Fashion Website - The Weekdays',
        html: welcomeEmail(req.body.username, req.body.password)
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logSession(req, res, 500);
          res.send(error);
        }
      });

      const result = await adminaccount_collection.insertOne(account);
      logSession(req, res, 200);
      res.send(result);
    }
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// 2. Customer login
// Only allow access if not signed in
router.post("/login", denyAccess(), async (req, res) => {
  try {
    const result = await customeraccount_collection.findOne({
      username: req.body.username, is_deleted: false
    });
    if (!result) {
      logSession(req, res, 404);
      return res.status(404).send({ message: "Account not found" });
    } else {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        result.password
      );
      if (!passwordIsValid) {
        logSession(req, res, 401);
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      } else {
        req.session.user = result._id.toString();
        req.session.role = result.role;
        req.session.email = result.email;
        req.session.ip = req.ip;
        req.session.user_agent = req.headers['user-agent'];
        req.session.active = true;
      }
      logSession(req, res, 200);
      res.send({ message: "Login success" });
    }
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// 2. Admin login
router.post("/login/admin", denyAccess(), async (req, res) => {
  try {
    const result = await adminaccount_collection.findOne({
      username: req.body.username, is_deleted: false
    });
    if (!result) {
      logSession(req, res, 404);
      return res.status(404).send({ message: "Account not found" });
    } else {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        result.password
      );
      if (!passwordIsValid) {
        logSession(req, res, 401);
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      } else {
        req.session.user = result._id.toString();
        req.session.role = result.role;
        req.session.email = result.email;
        req.session.ip = req.ip;
        req.session.user_agent = req.headers['user-agent'];
        req.session.active = true;
      }
      logSession(req, res, 200);
      res.send({ message: "Login success" });
    }
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// 3. Put update customer account by id
router.put("/", allowAccess('customer'), async (req, res) => {
  //update json customer into database
  try {
    await customeraccount_collection.updateOne(
      { _id: new ObjectId(req.session.user) }, //condition for update
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: bcrypt.hashSync(req.body.password, 8),
          register_date: new Date(),
          last_active: new Date(),
          is_deleted: req.body.is_deleted,
        },
      }
    );
    logSession(req, res, 200);
    res.send({ message: "Update success" });
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// 3. Put update admin account by id
router.put("/admin", allowAccess('admin', 'superadmin'), async (req, res) => {
  //update json customer into database
  try {
    await adminaccount_collection.updateOne(
      { _id: ObjectId(req.session.user) }, //condition for update
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phone: req.body.phone,
          password: bcrypt.hashSync(req.body.password, 8),
          register_date: new Date(),
          last_active: new Date(),
          is_deleted: req.body.is_deleted,
        },
      }
    );
    logSession(req, res, 200);
    res.send({ message: "Update success" });
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// delete customer account by id
router.put("/delete", allowAccess('customer'), async (req, res, next) => {
  //update json customer into database
  try {
    await customeraccount_collection.updateOne(
      { _id: ObjectId(req.session.user) }, //condition for update
      { $set: { is_deleted: true } }
    );
    logSession(req, res, 200);
    res.send({ message: "Delete success" });
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// delete admin account by id - only superadmin can delete admin, superadmin cannot delete superadmin
router.put("/delete/admin", allowAccess('superadmin'), async (req, res, next) => {
  //update json admin into database
  try {
    will_be_deleted_admin = req.body._id;
    // check if superadmin is deleting superadmin
    superadmin_account_check = await adminaccount_collection.findOne({ _id: ObjectId(req.session.user), role: 'superadmin' });
    if (superadmin_account_check) {
      logSession(req, res, 401);
      return res.status(401).send({ message: "Cannot delete superadmin" });
    }
    // delete admin
    await adminaccount_collection.updateOne(
      { _id: new ObjectId(will_be_deleted_admin) }, //condition for update
      { $set: { is_deleted: true } }
    );
    logSession(req, res, 200);
    // res.send({ message: "Delete success" });
    // res.redirect('/admin');
    // res.render('admin', { title: 'Admin', layout: 'admin' });

    // sign out all session of admin who is deleted by superadmin
    await session_collection.updateMany({ 'session.user': will_be_deleted_admin, 'session.active': true }, { $set: { 'session.active': false } });
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// 4. sign out
router.post("/signout/", allowAccess(), async (req, res) => {
  try {
    const result = await session_collection.updateOne({ _id: req.sessionID }, { $set: { 'session.active': false } });
    res.clearCookie('connect.sid');
    req.session = null;
    res.send({ message: "Sign out success" });
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// sign out all sessions
router.post("/signout/all", allowAccess(), async (req, res) => {
  try {
    const result = await session_collection.updateMany({ 'session.user': req.session.user, 'session.active': true }, { $set: { 'session.active': false } });
    res.clearCookie('connect.sid');
    req.session = null;
    res.send({ message: "Sign out all success" });
  } catch (error) {
    logSession(req, res, 500);
    res.status(500).send('something wrong ' + error);
  }
});

// ===================================================

module.exports = router;

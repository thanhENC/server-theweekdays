// import dotenv from 'dotenv';
// dotenv.config();

// =================SETTING UP EXPRESS=================
const express = require('express');
const app = express();
// const port = process.env.PORT || 5000;
const port = 5000;

const morgan = require("morgan")
app.use(morgan("combined"))

app.set('trust proxy', true);

// payload limit 20mb
const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb' }));

const cors = require("cors");
app.use(cors());

app.listen(port, () => {
    console.log(`Server-Auth listening on port ${port}`)
})

// =================SETTING UP ROUTES=================
// server: Auth
// port: 5000
// prefix: /v1/

app.get("/api", (req, res) => {
    res.send("Auth Server")
})

// I. Auth
const authRoute = require("./routes/accounts");
app.use("/v1/auth", authRoute);

// Continue with other routes...........

// ====================================================
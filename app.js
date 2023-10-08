const express = require("express");
const router = require("./routes/api");
const app = new express();
const bodyParser = require('body-parser');

////security middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

////database
const mongoose = require("mongoose");

///ENV
const dotenv = require("dotenv");
dotenv.config();


///security middleware inplementes
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"100mb"}));

///body parser implements
app.use(bodyParser.json());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

///database connection
//======>> "mongodb://127.0.0.1:27017/boiler-plate-project";

const URL = "mongodb+srv://mdakkas:mdakkas@cluster0.fvxmrli.mongodb.net/Craftshop?retryWrites=true&w=majority";
mongoose.connect(URL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    
    (error) => {
        console.log("mongoose connected")
        console.log(error);
    });
//// fornt end tagging api
app.use("./api/v1", router);

module.exports = app;
const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const cors = require("cors");
const router = require("./app/router/userRoutes");
const connectDB = require("./app/config/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const fs = require("fs");

const app = express();

dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    credentials: true,
  })
);

connectDB();

//set view engine
app.set("view engine","ejs");
app.set("views", "views");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({extended:true}))
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //24 h
    },
  })
);
app.use(cookieParser());

// set bodyparser



// static folders
app.use(express.static("public"));
app.use("uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("uploads"));

//router
const adminRoute = require("./app/router/routing");
app.use(adminRoute);

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});

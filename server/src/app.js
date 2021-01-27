const express = require("express");
const path = require("path");
const cors = require("cors");
const flash = require("express-flash");
const passport = require("passport");
//const cookieParser = require("cookie-parser");
const app = express();
const hbs = require("hbs");
const mongoose = require("mongoose");
var session = require("express-session");
const MongoDbStore = require("connect-mongo")(session);
require("dotenv").config();

const hostname = "127.0.0.1";
const port = process.env.PORT || 5000;
mongoose.connect("mongodb://localhost/pizza_database", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection Failed");
  });

let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});
//app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    cookie: { maxAge: 60000 * 60 * 24 },
  })
);
require("../config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.use(express.static(path.join(__dirname, "../public")));
// app.set("view engine", "hbs");
// //app.set("views", path.join(__dirname, "views"));
// hbs.registerPartials(path.join(__dirname, "../templates/partials"));
app.use((req, res, next) => {
  console.log(req.user);
  res.locals.session = req.session;
  res.locals.user = req.user;

  next();
});
require("../routes/web.js")(app, passport);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

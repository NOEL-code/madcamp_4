var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require("dotenv").config();

var usersRouter = require("./src/routes/usersRouter");
var productRouter = require("./src/routes/productRouter");
var likeRouter = require("./src/routes/likeRouter");
var alarmRouter = require("./src/routes/alarmRouter");
var bidRouter = require("./src/routes/bidRouter");
var app = express();

const corsMiddleware = require("./src/middlewares/cors");
const connectDB = require("./src/utils/mongodb");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//utils 에 있는 db. mongoose db 를 연결하는 메소드
connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(logger("dev"));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/likes", likeRouter);
app.use("/api/alarms", alarmRouter);
app.use("/api/bid", bidRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

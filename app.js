const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

const userRoutes = require("./api/routes/UserRoutes");
const appointmentRoutes = require("./api/routes/AppointmentRoutes");
const orderRoutes = require("./api/routes/OrderRoutes");
const doctorRoutes = require("./api/routes/DoctorRoutes");
const productRoutes = require("./api/routes/ProductRoutes");
const authRoutes = require("./api/routes/AuthRoutes");

const app = express();

mongoose.connect(
  "mongodb+srv://cocoalabs:0itm13vM6HVNdMMI@naturopathy.guy1g.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
// app.use("/uploads", express.static("uploads"))
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   next(error);
// });

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use(authRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(appointmentRoutes);
app.use(orderRoutes);
app.use(doctorRoutes);

module.exports = app;

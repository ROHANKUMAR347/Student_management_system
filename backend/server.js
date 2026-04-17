require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/students", require("./routes/studentRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
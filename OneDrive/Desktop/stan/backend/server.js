const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const chatRoutes = require("./routes/chat");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/chat", chatRoutes);

app.listen(5000, () => console.log("Server running on 5000"));

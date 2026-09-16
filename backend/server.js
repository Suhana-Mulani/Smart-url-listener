const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/url", urlRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });
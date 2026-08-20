require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const resumeUpload = require("./routes/resume2");
const feature = require("./routes/additionalfeature");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    // console.error("Error:", err.message);
    return res.status(400).json({
        success: false,
        message: err.message
    });
});
app.use("/", userRouter);
app.use("/upload", resumeUpload);
app.use("/feature", feature);

module.exports = app;

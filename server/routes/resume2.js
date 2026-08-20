const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = require("../config/upload");
const resumecontroller = require("../controller/resumecontroller");
const resumeinterviewquestioncontroller=require("../controller/resumeinterviewquestioncontroller")
const authentication=require("../middleware/auth")


router.post("/resumeUpload",authentication,upload.single("resume"), resumecontroller);
router.post("/resumeinterviewquestion/:id",authentication,resumeinterviewquestioncontroller)

module.exports = router;

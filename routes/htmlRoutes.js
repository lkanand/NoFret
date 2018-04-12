const express = require('express');
const path = require("path");
const router = express.Router();

router.use(express.static("client/build"));


router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;
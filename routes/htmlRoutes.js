const express = require('express');
const path = require("path");
const router = express.Router();

router.use(express.static("client/build"));

router.post("/loginCheck", (req, res) => {
	console.log("hello");
	console.log(req.session.hasOwnProperty("passport"));
	if(req.session.hasOwnProperty("passport")){
		res.json({login: true, username: req.user.username})
	}
	else {
		res.json({login: false});
	}
});

router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
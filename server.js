const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();



app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));
app.use(bodyParser({limit: "50mb"}));
app.use(bodyParser.json());


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./passport')(app);
const routes = require("./routes");
app.use(routes);

app.use((error, req, res, next) => {
  console.error(error);
  res.json({
    error
  })
});

mongoose.Promise = global.Promise;

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/nofret"
);

app.listen(PORT, function(){
	console.log(`App listening on port ${PORT}`);
});
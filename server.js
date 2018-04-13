const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(express.static("client/build"));

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
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var tables = [{
  routeName: "yoda",
  customerName: "Yoda",
  phoneNumber: 5555555555,
  customerEmail: "johndoe@gmail.com",
  customerID: 1,

}];

var waitlist = [{
	 routeName: "aaa",
  customerName: "aaa",
  phoneNumber: 1111,
  customerEmail: "aaa@gmail.com",
  customerID: 2,

}]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post("/api/tables", function(req, res) {


  var newReservation = req.body;

  newReservation.routeName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  if (tables.length < 5) {

  tables.push(newReservation);
    res.json(true);
}
 else {
 	waitlist.push(newReservation);
 	 res.json(false);
 }

});


// Sets up the Express app to handle data parsing


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
  console.log("index working")
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
  console.log("tables working")
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
  console.log("reserve working")
});

app.get("/api/tables", function(req, res) {
 return res.json(tables);
  console.log("API tables work")
});

app.get("/api/waitlist", function(req, res) {
 return res.json(waitlist);
  console.log("API waitlist work")
});


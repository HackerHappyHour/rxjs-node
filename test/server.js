var express = require("express");
var app = express();

app.use('/raw', express.static(__dirname + '/raw'));
module.exports = app;

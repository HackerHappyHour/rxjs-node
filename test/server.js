var express = require("express");
var app = express();

app.use('/download', express.static('/test/raw'));

app.listen(function(){
  console.log(`test server running on ${this.address().port}`);
});

module.exports = app;

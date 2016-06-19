var fs = require('fs');
var path = require('path');
var {fromReadStream} = require('../..');

var rs = fs.createReadStream(path.join(__dirname, '../raw/downloadtest.raw'));
var ws = fs.createWriteStream(path.join(__dirname, '../tmp/samplewrite.raw'));

var source = fromReadStream(rs);

source.subscribe(
	function(data){
	  console.log(data);	
	},
	function rsError(err){
      console.error("error", err);	
	},
	function rsComplete(){
	  console.log("read stream finished");	
	}
);



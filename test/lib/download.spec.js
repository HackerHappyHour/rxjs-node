var server = require('../server');
var {download} = require('../..');
require('rxjs/add/operator/do');
var path = require('path');

var listener = server.listen();
var testFile = `http://127.0.0.1:${listener.address().port}/raw/downloadtest.raw`;
var downloadStream = download(testFile, path.join(__dirname, '../tmp','downloadtest.raw'))
  .do(x => console.log(x));

downloadStream.subscribe(
  function(x){
  	console.log(x/1024);
  },
  function(err){
    console.error('error encountered', err);
    listener.close();
  },
  function(){
    listener.close();
  });

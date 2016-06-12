var server = require('../server');
var download = require('../../lib/download');
require('rxjs/add/operator/do');
var path = require('path');

var listener = server.listen();
var testFile = `http://127.0.0.1:${listener.address().port}/raw/raw-test.zip`;
var downloadStream = download(testFile, path.join(__dirname, '../tmp','raw-test.zip'))
  .do(x => console.log(x));

downloadStream.subscribe(
  function(){
  },
  function(err){
    console.error('error encountered', err);
    listener.close();
  },
  function(){
    listener.close();
  });

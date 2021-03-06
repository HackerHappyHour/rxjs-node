var {Observable} = require("rxjs/Observable");
var request = require("request");
var fs = require('fs');
var fromReadStream = require('./fromReadStream');

function download(url, filePath){

  var saveToDisk = fs.createWriteStream(filePath); 
  var readStream = request.get(url);

  
  return Observable.create(function(subscriber){
 
  	readStream.pipe(saveToDisk);
	var source = fromReadStream(readStream);

  	source.subscribe(
		function(){
		  subscriber.next(saveToDisk.bytesWritten);
		},
		function(err){
		  subscriber.error(err)	;
		}
	);

	saveToDisk.on('finish', function(){
		subscriber.next(saveToDisk.bytesWritten);	
		subscriber.complete();
	});
	
	return function(){
		subscriber.complete();
	}

  });
  
}

module.exports = download;

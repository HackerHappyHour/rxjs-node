var {Observable} = require("rxjs/Observable");
var request = require("request");
var fs = require('fs');
var fromReadStream = require('./fromReadStream');
require('rxjs/add/operator/merge');

function download(url, filePath){

  var saveToDisk = fs.createWriteStream(filePath); 
  var readStream = request.get(url);

  readStream.pipe(saveToDisk);

  var byteStream = Observable.fromEvent(readStream, 'data');
  var saveCompleted = Observable.fromEvent(saveToDisk, 'close');
  var downloadErrorStream = Observable.fromEvent(readStream, 'error');
  var saveErrorStream = Observable.fromEvent(saveToDisk, 'error');
  var errorStream = Observable.merge(saveErrorStream, downloadErrorStream);

  
}

module.exports = download;

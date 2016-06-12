var {Observable} = require("rxjs/Observable");
var request = require("request");
var fs = require('fs');

function download(url, file){
  let saveToDisk = fs.createWriteStream(file);

    return Observable.create(function(subscriber){
      request.get(url)
        .on('response', function(response){
          subscriber.next({
            type: 'response',
            bytes: response.headers['content-length']
          })

        })
        .on('data', function(){
          subscriber.next({
            type: 'chunk',
            payload: {
              bytesWritten: saveToDisk.bytesWritten
            }
          })
        })
        .on('error', function(err){
          subscriber.error(err)
        })
        .pipe(saveToDisk);
      })
}

module.exports = download;

var {Observable} = require('rxjs/Observable');

module.exports = function fromReadStream(stream, selector){

	return Observable.create(function(subscriber){
		stream.on('error', err => {
			subscriber.error({
			  msg: "error completing read stream",
			  data: err
			});	
		});	
		
		stream.on('data', function(data){
			subscriber.next(data);
		});
		stream.on('end', function(){
			subscriber.complete();	
		});
		
		return function(){
		  stream.end();	
		}
	});

}


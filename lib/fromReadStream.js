var {Observable} = require('rxjs/Observable');

module.exports = function fromReadStream(stream, selector){
	return Observable.create(function(subscriber){
		stream.on('error', err => {
			subscriber.error();	
		});	

		stream.on('finish', (){
			subscriber.complete();	
		});
		
		return function(){
		  stream.close();	
		}
	});
}

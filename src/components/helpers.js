var crypto = require("crypto");

//This function returns the correct IP address. Node.js apps normally run behind a proxy, so the remoteAddress will be equal to the proxy. A proxy sends a header "X-Forwarded-For", so if this header is set, this IP address will be used.
exports.getIP = function(request){
	return request.header("x-forwarded-for") || request.connection.remoteAddress;
}

exports.createHash = function(){
	var shasum = crypto.createHash('sha1');
	shasum.update((new Date).getTime()+"");
	return shasum.digest('hex').substring(0, 8);
};

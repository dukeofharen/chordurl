var crypto = require("crypto");
var path = require("path");
var fs = require("fs");
var config = global.container.config;

//This function returns the correct IP address. Node.js apps normally run behind a proxy, so the remoteAddress will be equal to the proxy. A proxy sends a header "X-Forwarded-For", so if this header is set, this IP address will be used.
exports.getIP = function(request){
	return request.header("x-forwarded-for") || request.connection.remoteAddress;
}

exports.createHash = function(){
	var shasum = crypto.createHash('sha1');
	shasum.update((new Date).getTime()+"");
	return shasum.digest('hex').substring(0, 8);
};

exports.renderView = function(view, onSuccess, onError){
	fs.readFile(path.resolve(__dirname, "../views/template.html"), 'utf8', function (err,template) {
		if (err) {
			onError(err);
		}
		else{
			fs.readFile(path.resolve(__dirname, "../views/"+view), 'utf8', function(err,view){
				if(err){
					onError(err);
				}
				else{
					template = template.replace("[TITLE]", config.site_title);
					template = template.replace("[CONTENT]", view);
					onSuccess(template);
				}
			})
		}
	});
}

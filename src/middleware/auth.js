var auth = require('basic-auth');
var config = global.container.config;

exports.middleware = function (req, res, next) {
  if(config.shorten_keys.length > 0 && req.originalUrl.indexOf('/shorten') > -1){
    var key = req.headers.apikey;
    if(!key || config.shorten_keys.indexOf(key) == -1){
      res.writeHead(401);
      res.end();
      return;
    }
  }
  else if(req.originalUrl.indexOf('/admin') == 0){
    if (!checkAdminCredentials(auth(req))) {
      res.setHeader('WWW-Authenticate', 'Basic realm="chordurl"');
      res.writeHead(401);
      res.end();
      return;
    }
  }
  next();
};

function checkAdminCredentials(credentials){
  if(!credentials || !credentials.name || !credentials.pass){
    return false;
  }
  var valid = false;
  config.admin_accounts.forEach(function(account){
    if(credentials.name == account.username && credentials.pass == account.password){
      valid = true;
    }
  });
  return valid;
};

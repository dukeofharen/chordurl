var helpers = global.container.helpers;
var config = global.container.config;
var path = require("path");
var fs = require("fs");

exports.route = function(app){
  app.get('/', function(request, response){
    var errorFunction = function(err){
      console.log(err);
      response.status(500).send();
    };
    if(config.has_frontpage){
      helpers.renderView("shorten.html", function(template){
        if(config.shorten_keys.length == 0){
          template = template.replace("[KEY]", "");
          response.status(200).send(template);
        }
        else{
          fs.readFile(path.resolve(__dirname, "../views/shorten_key.html"), 'utf8', function (err,key) {
            if(err){
              errorFunction(err);
            }
            else{
              template = template.replace("[KEY]", key);
              response.status(200).send(template);
            }
          });
        }
      }, errorFunction);
    }
    else{
      if(config.redirect_url){
        response.redirect(301, config.redirect_url);
      }
      else{
        response.status(404).send();
      }
    }
  });
};

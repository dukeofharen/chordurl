var urlBusiness = global.container.urlBusiness;
var helpers = global.container.helpers;
var config = global.container.config;
var geoip = require("geoip-lite-country");

exports.route = function(app){
  app.get('/shorten', function(request, response){
    var url = request.query.url;
    var customString = request.query.customString;
    if(!helpers.validateSegment(customString)){
      response.status(400).send();
      return;
    }
    if(!url || url.substring(0, 4) != "http"){
      response.status(400).send();
      return;
    }
    var ip = helpers.getIP(request);
    urlBusiness.addUrl(url, customString, 0, ip, function(segment){
      if(segment){
        response.status(200).send(config.root_url+segment);
      }
      else{
        response.status(409).send();
      }
    }, function(err){
      console.log(err);
      response.status(500).send();
    });
  });

  app.get('/:segment', function(request, response){
    var errorFunction = function(err){
      console.log(err);
      response.status(500).send();
    };
    var segment = request.params.segment;
    urlBusiness.getUrlBySegment(segment, function(result){
      if(!result){
        response.status(404).send();
      }
      else{
        var ip = helpers.getIP(request);
        var referer = "";
        if(request.headers.referer){
          referer = request.headers.referer;
        }
        var uas = request.headers['user-agent'];
        if(!uas){
          uas = "";
        }
        var data = geoip.lookup(ip);
        var country = data && data.country ? data.country : "";
        urlBusiness.insertClick(result.id, ip, referer, uas, country, function(){
          response.redirect(301, result.url);
        }, errorFunction);
      }
    }, errorFunction);
  });
};

var urlBusiness = global.container.urlBusiness;
var helpers = global.container.helpers;
var crypto = require('crypto');

exports.route = function(app){
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
        urlBusiness.insertClick(result.id, ip, referer, uas, function(){
          urlBusiness.updateViews(result.id, function(){}, function(){});
          response.redirect(301, result.url);
        }, errorFunction);
      }
    }, errorFunction);
  });

  app.get('/shorten/:url', function(request, response){
    var ip = helpers.getIP(request);
    urlBusiness.addUrl(request.params.url, request.params.customString, 0, ip, function(segment){
      if(segment){
        response.status(200).send(segment);
      }
      else{
        response.status(409).send();
      }
    }, function(err){
      console.log(err);
      response.status(500).send();
    });
  });
};
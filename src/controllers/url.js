var urlBusiness = global.container.urlBusiness;
var helpers = global.container.helpers;
var config = global.container.config;

exports.route = function(app){
  app.get('/shorten', function(request, response){
    var url = request.query.url;
    var customString = request.query.customString;
    //TODO validate custom string: alphanumeric and specific reserved strings may not be used
    //TODO set a hourly (or daily) limit of number of URLs that can be shortened
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
        urlBusiness.insertClick(result.id, ip, referer, uas, function(){
          urlBusiness.updateViews(result.id, function(){}, function(){});
          response.redirect(301, result.url);
        }, errorFunction);
      }
    }, errorFunction);
  });
};

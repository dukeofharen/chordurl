var urlData = global.container.urlData;
var helpers = global.container.helpers;

exports.getUrls = function(onSuccess, onError){
  urlData.getUrls(function(urls){
    onSuccess(urls);
  }, onError);
};

exports.getUrl = function(id, onSuccess, onError){
  urlData.getUrl(id, function(url){
    if(url){
      onSuccess(url);
    }
    else{
      onSuccess(null);
    }
  }, onError);
};

exports.getUrlBySegment = function(segment, onSuccess, onError){
  urlData.getUrlBySegment(segment, function(url){
    if(url){
      onSuccess(url);
    }
    else{
      onSuccess(null);
    }
  }, onError);
};

exports.insertClick = function(url_id, ip, referer, user_agent_string, onSuccess, onError){
  urlData.insertClick(url_id, ip, referer, user_agent_string, onSuccess, onError);
};

exports.getStats = function(url_id, onSuccess, onError){
  urlData.getStats(url_id, onSuccess, onError);
}

exports.updateViews = function(url_id, onSuccess, onError){
  urlData.updateViews(url_id, onSuccess, onError);
}

exports.addUrl = function(url, segment, level, ip, onSuccess, onError){
  //Check if the URL already exists
  urlData.getUrlByUrl(url, function(result){
    if(result){
      onSuccess(result.segment);
    }
    else{
      var addFunction = function(segment){
        urlData.addUrl(url, ip, segment, function(){
          onSuccess(segment);
        }, function(err){
          onError(err);
        });
      };
      if(segment && level === 0){
        urlData.getUrlBySegment(segment, function(url){
          if(url){
            onSuccess(null);
          }
          else{
            addFunction(segment);
          }
        }, function(err){
          onError(err);
        });
      }
      else{
        segment = helpers.createHash();
        urlData.getUrlBySegment(segment, function(url){
          if(url){
            exports.addUrl(url, segment, level + 1, ip, onSuccess, onError);
          }
          else{
            addFunction(segment);
          }
        }, function(err){
          onError(err);
        });
      }
    }
  }, function(err){
    onError(err);
  });
};

exports.deleteUrl = function(url_id, onSuccess, onError){
  urlData.deleteUrl(url_id, onSuccess, onError);
};

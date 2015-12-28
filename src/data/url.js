var connection = global.container.dataConnection;

exports.getUrl = function(id, onSuccess, onError){
  connection.query("SELECT * FROM urls WHERE id = ?", [id], function(result){
    if(result.count == 0){
      onSuccess(null);
    }
    else{
      onSuccess(result[0]);
    }
  }, onError);
};

exports.getUrlBySegment = function(segment, onSuccess, onError){
  connection.query("SELECT * FROM urls WHERE segment = ?", [segment], function(result){
    if(result.count == 0){
      onSuccess(null);
    }
    else{
      onSuccess(result[0]);
    }
  }, onError);
};

exports.getUrlByUrl = function(url, onSuccess, onError){
  connection.query("SELECT * FROM urls WHERE url = ?", [url], function(result){
    if(result.count == 0){
      onSuccess(null);
    }
    else{
      onSuccess(result[0]);
    }
  }, onError);
};

exports.addUrl = function(url, ip, segment, onSuccess, onError){
  connection.query("INSERT INTO urls SET ?", {url: url, segment: segment, datetime_added: new Date(), ip: ip}, onSuccess, onError);
};

exports.insertClick = function(url_id, ip, referer, user_agent_string, onSuccess, onError){
  connection.query("INSERT INTO stats SET ?", {url_id: url_id, clickdate: new Date(), ip: ip, referer: referer, user_agent_string: user_agent_string}, onSuccess, onError);
};

exports.updateViews = function(url_id, onSuccess, onError){
  connection.query("UPDATE urls SET num_of_clicks = num_of_clicks + 1 WHERE id = ?", [url_id], onSuccess, onError);
};

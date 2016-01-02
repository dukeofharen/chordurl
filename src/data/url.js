var connection = global.container.dataConnection;

exports.getUrls = function(onSuccess, onError){
  connection.query("SELECT u.*, COUNT(s.id) AS `num_of_clicks` FROM urls u INNER JOIN stats s ON s.url_id = u.id GROUP BY u.id", [], function(result){
    onSuccess(result);
  }, onError);
};

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

exports.deleteUrl = function(url_id, onSuccess, onError){
  connection.query("DELETE FROM urls WHERE id = ?", [url_id], onSuccess, onError);
}

exports.insertClick = function(url_id, ip, referer, user_agent_string, onSuccess, onError){
  connection.query("INSERT INTO stats SET ?", {url_id: url_id, clickdate: new Date(), ip: ip, referer: referer, user_agent_string: user_agent_string}, onSuccess, onError);
};

exports.updateViews = function(url_id, onSuccess, onError){
  connection.query("UPDATE urls SET num_of_clicks = num_of_clicks + 1 WHERE id = ?", [url_id], onSuccess, onError);
};

exports.getStats = function(url_id, onSuccess, onError){
  connection.query("SELECT s.*, u.url FROM stats s INNER JOIN urls u ON s.url_id = u.id WHERE url_id = ?", [url_id], onSuccess, onError);
};

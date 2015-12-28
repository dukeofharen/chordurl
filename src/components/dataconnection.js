var mysql = require("mysql");
var config = global.container.config;
var pool = mysql.createPool({
		host:config.host,
		user:config.user,
		password:config.password,
		database:config.database
});

exports.query = function(query, params, onSuccess, onError){
  if(!params){
    params = [];
  }
  if(!onSuccess){
    onSuccess = function(result){

    };
  }
  if(!onError){
    onError = function(err){
      console.log(err);
    };
  }
  pool.getConnection(function(err, con){
		if(err){
			onError(err);
		}
    else{
      con.query(query, params, function(err, result){
        if(err){
          onError(err);
        }
        else{
          onSuccess(result);
        }
      });
    }
    con.release();
  });
};

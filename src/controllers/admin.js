var helpers = global.container.helpers;
var urlBusiness = global.container.urlBusiness;

exports.route = function(app){
  app.get('/admin', function(request, response){
    helpers.renderView("admin.html", function(template){
      response.status(200).send(template);
    }, function(err){
      console.log(err);
      response.status(500).send();
    });
  });

  app.get('/admin/stats/:id', function(request, response){
    helpers.renderView("admin_stats.html", function(template){
      response.status(200).send(template);
    }, function(err){
      console.log(err);
      response.status(500).send();
    });
  });

  var getUrlsFunction = function(request, response, useDataTables){
    urlBusiness.getUrls(function(urls){
      var result = urls;
      if(useDataTables){
        result = {data: urls};
      }
      response.status(200).send(result);
    }, function(err){
      console.log(err);
      response.status(500).send();
    });
  };
  app.get('/admin/urls/dataTables', function(request, response){
    getUrlsFunction(request, response, true);
  });
  app.get('/admin/urls', function(request, response){
    getUrlsFunction(request, response, false);
  });

  var getStatsFunction = function(request, response, useDataTables){
    urlBusiness.getStats(request.params.id, function(stats){
      var result = stats;
      if(useDataTables){
        result = {data: stats};
      }
      response.status(200).send(result);
    }, function(err){
      console.log(err);
      response.status(500).send();
    });
  };
  app.get('/admin/urls/:id/stats', function(request, response){
    getStatsFunction(request, response, false);
  });
  app.get('/admin/urls/:id/stats/dataTables', function(request, response){
    getStatsFunction(request, response, true);
  });

  app.delete('/admin/urls/:id', function(request, response){
    urlBusiness.deleteUrl(request.params.id, function(){
      response.status(200).send();
    }, function(err){
      console.log(err);
      response.status(500).send();
    })
  });
};

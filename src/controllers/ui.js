var helpers = global.container.helpers;

exports.route = function(app){
  app.get('/', function(request, response){
    helpers.renderView("shorten.html", function(template){

      response.status(200).send(template);
    }, function(err){
      console.log(err);
      response.status(500).send();
    });
  });
};

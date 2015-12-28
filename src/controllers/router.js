var urlController = global.container.urlController;
var uiController = global.container.uiController;

exports.route = function(app){
  urlController.route(app);
  uiController.route(app);
};

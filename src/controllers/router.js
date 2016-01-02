var urlController = global.container.urlController;
var uiController = global.container.uiController;
var adminController = global.container.adminController;

exports.route = function(app){
  adminController.route(app);
  urlController.route(app);
  uiController.route(app);
};

var path = require("path");

exports.init = function(){
  //global initialize
  global.container = {};
  global.container.config = require(path.resolve(__dirname, "../config.js"));

  //components
  global.container.dataConnection = require(path.resolve(__dirname, "./dataconnection.js"));
  global.container.helpers = require(path.resolve(__dirname, "./helpers.js"));

  //middleware
  global.container.auth = require(path.resolve(__dirname, "../middleware/auth.js"));

  //data
  global.container.urlData = require(path.resolve(__dirname, "../data/url.js"));

  //business
  global.container.urlBusiness = require(path.resolve(__dirname, "../business/url.js"));

  //controllers
  global.container.urlController = require(path.resolve(__dirname, "../controllers/url.js"));
  global.container.uiController = require(path.resolve(__dirname, "../controllers/ui.js"));
  global.container.adminController = require(path.resolve(__dirname, "../controllers/admin.js"));
  global.container.router = require(path.resolve(__dirname, "../controllers/router.js"));
};

var express = require("express");
var app = express();
var container = require("./components/container");
container.init();
var config = global.container.config;
var bodyParser = require('body-parser');
var path = require('path');

app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false,limit:'50mb'}));
app.use(express.static("public"));
app.use(global.container.auth.middleware);
app.disable('etag');
app.disable('x-powered-by');

var router = global.container.router;
app.listen(config.port_number);
console.log("Listening at port "+config.port_number);
router.route(app);

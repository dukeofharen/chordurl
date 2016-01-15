exports.port_number = 4000;
exports.root_url = "http://localhost:"+exports.port_number+"/";
exports.site_title = "ChordURL - URL shortener";
//Whether the frontpage should be available
exports.has_frontpage = true;
//If 'has_frontpage' is false, the user will be redirected to this URL if he / she hits the root URL. Else, a 404 will be returned.
exports.redirect_url = "";

exports.admin_accounts = [
  {username: "admin", password: "admin"}
];
//Leave this array empty if this is meant as a public URL shortener.
exports.shorten_keys = [];

exports.db_driver = "mysql";

//MySQL settings
exports.host = 'localhost';
exports.user = 'root';
exports.password = 'geheim';
exports.database = 'urlsh2';

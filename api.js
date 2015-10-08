var r = require("./lib/request"),
    logger = require("./lib/logger");



var Api = {
  login: function(params, res, cb) {
    var cfg = res.locals.config;
    r.makeRequest(
      config = {
        url: cfg.apiServer + "/users/login",
        method: "PUT"
      },
      body = params,
      cb);
  }
};

module.exports = Api;
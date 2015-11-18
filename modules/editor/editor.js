/*
  This module is used for handling Editor related actions
*/

// Node modules
var express = require('express'),
    async = require("async"),
    router = express.Router(),
    Api = require("../../api"),
    r = require("../../lib/request");
// ===

router.post(['/', '/:action'], function(req, res, next) {
  var action = req.params.action;

  var Api = {
  run: function(params, res, cb) {
  			
  			
		}
	}


});
// ====

module.exports = router;
/*
  This module is used for handling Editor related actions
*/

// Node modules
var express = require('express'),
    async = require("async"),
    router = express.Router(),
    Api = require("../../api"),
    r = require("../../lib/request");
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/pyCloud';
// ===


//GET Req
router.get(['/', '/:action'], function(req, res, next) {
  var action = req.params.action;
  console.log(req.ip);
  switch(action) {
    case "dashboard":
      res.status(200).render("editor/dashboard.jade", {
        pageTitle: "pyCloud! - Login",
        showRegister: true
      });
      break;

    default:
      res.render("editor/dashboard.jade", {
        pageTitle: "pyCloud! - Editor",
        showRegister: false
      });
  }
  return next();
});
// ===

//POST Req
router.post(['/', '/:action'], function(req, res, next) {
  var action = req.params.action;

  switch(action){
    case "newworkspace":
        MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
    //HURRAY!! We are connected. :)
          console.log('Connection established to', url);

    // Get the documents collection
          addworkspace(db,function(){db.close();});

        }
      });
      break;

  	case "run":
  		res.status(200).json({"status":"Executed"});
  		break;
  }
  return next();
});
// ====

module.exports = router;
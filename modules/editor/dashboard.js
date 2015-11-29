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
var assert = require('assert');


//GET Req
router.get(['/', '/:action'], function(req, res, next) {
  var action = req.params.action;

  console.log(req.ip);
  switch(action) {
    case "dashboard":
  var wspaces=[];
    var findWorkspaces=function(db,userdoc,callback){
        var found=0;
        console.log(userdoc._id);
        var cursor =db.collection('workspace').find({ "uid":userdoc._id},{_id:0,"uid":false}).toArray(function(err,result){
          console.log(result);
          res.status(200).render("editor/dashboard.jade", {
          workspaces: result,
          pageTitle: "pyCloud! - Dashboard",
          showRegister: true,
          showlogin:false
        });
        }); 
      } 


        var findUser = function(db, callback) {
          var found=0;
    console.log(req.sessionID);
   var cursor =db.collection('users').findOne( { "sid":req.sessionID} ,function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        console.log(doc);
         findWorkspaces(db,doc,function(){db.close();});
      } else {
        console.log("user not logged in");
        res.redirect("/users/login");
        res.end();
      }
      //res.redirect('dashboard');
   });
   
};

    MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
    //HURRAY!! We are connected. :)
          console.log('Connection established to', url);

    // Get the documents collection
    
          findUser(db,function(){db.close();});

        }
      });

      
      break;
    case "workspacepresent":
      res.status(200).render("editor/workspacepresent.jade", {
        pageTitle: "pyCloud! - Dashboard",
        showRegister: true,
        showlogin:false
      });
      break;
    case "logout":
      res.status(200).render("authentication/alreadyexist.jade", {
        pageTitle: "pyCloud! - Login",
        showRegister: true,
        showlogin:true
      });
      break;
    default:
      res.render("editor/dashboard.jade", {
        pageTitle: "pyCloud! - Dashboard",
        showRegister: false,
        showlogin:false
      });
  }
});
// ===


//POST Req
router.post(['/', '/:action'], function(req, res, next) {
  var action = req.params.action;

  switch(action){
    case "newworkspace":
    console.log(req.body.butt);
    var startcontainer = function(wspname){
      //get the container ID

      //Call kubernetes and start the container


    }
    if(req.body.butt != "create")
    {
      //console.log(req.body.)
      startcontainer(req.body.butt);
    }
    var addWorkspace=function(db,user,callback){
      var cursor =db.collection('workspace').insertOne( { "uid": user._id,"workspace":req.body.workspacename,"description":req.body.descrip},function(err, result) {
      assert.equal(err, null);
      res.redirect('/editor/dashboard');
      res.end();
   });
    }

      var findWorkspace=function(db,userdoc,callback){
        var found=0;
        console.log(userdoc._id);
        var cursor =db.collection('workspace').findOne({ "uid":userdoc._id,"workspace":req.body.workspacename},function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
              console.log(doc);
              res.redirect("/editor/dashboard");
            } else {
              console.log(doc);
              addWorkspace(db,userdoc,function(){db.close();});
            }
        }); 
      } 
      //res.redirect('dashboard');
   
      
        var findUser = function(db, callback) {
          var found=0;
    console.log(req.sessionID);
   var cursor =db.collection('users').findOne( { "sid":req.sessionID} ,function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        console.log(doc);
         findWorkspace(db,doc,function(){db.close();});
      } else {
        console.log("user not logged in");
        res.redirect("/users/login");
        res.end();
      }
      //res.redirect('dashboard');
   });
   
};

        MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
    //HURRAY!! We are connected. :)
          console.log('Connection established to', url);

    // Get the documents collection
    
          findUser(db,function(){db.close();});
        
         

        }
      });
      break;

  	case "run":
  		res.status(200).json({"status":"Executed"});
  		break;
  }
});
// ====

module.exports = router;
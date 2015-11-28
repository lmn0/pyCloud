var r = require("./lib/request"),
    request = require("request")
    logger = require("./lib/logger");
var open = require("open");
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/pyCloud';
var assert = require('assert');


var Api = {
  login: function(req, res, cb) {

  var findUser = function(db, callback) {
    console.log(req.body.email);
   var cursor =db.collection('users').findOne( { "email": req.body.email,"password":req.body.password} ,function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        console.log(doc);
         res.redirect('/editor/dashboard');
         res.end();
      } else {
        console.log(doc);
         res.redirect('notfound');
         res.end();
      }
      //res.redirect('dashboard');
   });
};
    
    //WRITE THE LOGIN LOGIC HERE !

// Use connect method to connect to the Server
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



// var postData={
//     ip:req.ip
// };
// request.post({
//     uri:"http://192.168.1.5:3002",
//     headers:{'content-type': 'application/x-www-form-urlencoded'},
//     body:require('querystring').stringify(postData)
//     },function(err,resp,body){
//         var jsonObject = JSON.parse(body);
//         console.log(jsonObject.Location);
//         setTimeout(function() {
//           var loc = jsonObject.Location.trim();
//           res.redirect(""+loc);
//           res.end();
//         }, 5000);   
// });


},

createaccount:function(req,res,cb){

    var findUser = function(db, callback) {
   var cursor =db.collection('users').find( { "username": req.params.email,"password":req.params.password} );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc.rip);
      } else {
         res.redirect('alreadyexist');
         res.end();
      }
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
}
}

module.exports = Api;
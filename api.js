var r = require("./lib/request"),
    request = require("request")
    logger = require("./lib/logger");

var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/pyCloud';


var Api = {
  login: function(req, res, cb) {
    
    //WRITE THE LOGIN LOGIC HERE !

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');
  }
  
});


var postData={
    ip:req.ip
};
request.post({
    uri:"http://192.168.1.5:3002",
    headers:{'content-type': 'application/x-www-form-urlencoded'},
    body:require('querystring').stringify(postData)
    },function(err,resp,body){
        var jsonObject = JSON.parse(body);
        console.log(jsonObject.Location);
        res.writeHead(301,
        {Location: body.Location } //port has to be obtained from the raspberry pi !
        );
        res.end();
});


// var myJSONObject={ip:params.ip};

// var options = {
// url: 'https://192.168.1.5',
// port:3002,
// method: 'POST',
// body: {"ip":""+params.ip} 
// };

//  request(options,function(error,response,body){
//    //do what you want with this callback functon
//    res.writeHead(301,
//   {Location: "http://192.168.1.5:8004" } //port has to be forwarded !
//   );
//   res.end();
// });


// request.post({
//   url:     'http://192.168.1.5/'+params.ip,
//   port:3002
// }, function(error, response, body){
//   res.writeHead(301,
//   {Location: "http://192.168.1.5:8004" } //port has to be forwarded !
//   );
//   res.end();
// });

// res.writeHead(301,
//   {Location: "" }
// );
// res.end();

}
}

module.exports = Api;
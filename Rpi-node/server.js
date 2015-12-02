var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sys = require('sys')
var exec = require('child_process').exec;
var cid,ip;

//On Create.

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});
var port = 10094;

app.post('/', urlencodedParser, function (req, res) {
if(!req.body)return res.sendStatus(400);
var uport;
console.log(req.body.ip);
function putIP(error, stdout, stderr) {sys.puts(stdout);ip=stdout; ip=ip.trim();uport=port;exec("iptables -t nat -A DOCKER -p tcp -s "+req.body.ip+" --dport "+port+" -j DNAT --to-destination "+ip+":8888",puts);port=port+1;sys.puts("iptables -t nat -A DOCKER -p tcp -s "+req.body.ip+" --dport "+port+" -j DNAT --to-destination "+ip+":8888");}
function putCID(error, stdout, stderr) {sys.puts(stdout);cid=stdout; exec("docker inspect -f '{{ .NetworkSettings.IPAddress }}' "+cid,putIP);}

function puts(error, stdout, stderr) {sys.puts(stdout);
        res.write(JSON.stringify( {Location: 'http://192.168.10.102:'+uport,ConID:cid} ///This string should be sent to the Host server (my lappy)
));
res.end();}

exec("sudo docker run -d -t ontouchstart/rpi-ipython-notebook", putCID);

});


app.post('/resume',urlencodedParser,function(req,res){

if(!req.body)return res.sendStatus(400);
var uport;
console.log(req.body.ip);
function putIP(error, stdout, stderr) {sys.puts(stdout);ip=stdout; ip=ip.trim();uport=port;exec("iptables -t nat -A DOCKER -p tcp -s "+req.body.ip+" --dport "+port+" -j DNAT --to-destination "+ip+":8888",puts);port=port+1;sys.puts("iptables -t nat -A DOCKER -p tcp -s "+req.body.ip+" --dport "+port+" -j DNAT --to-destination "+ip+":8888");}
function putCID(error, stdout, stderr) {sys.puts(stdout);cid=stdout; exec("docker inspect -f '{{ .NetworkSettings.IPAddress }}' "+cid,putIP);}

function puts(error, stdout, stderr) {sys.puts(stdout);
        res.write(JSON.stringify( {Location: 'http://192.168.10.102:'+uport,ConID:cid.trim()} ///This string should be sent to the Host server (my lappy)
));
res.end();}

exec("sudo docker start "+req.body.cid, putCID);
 
});


app.post('/stop',urlencodedParser,function(req,res){
if(!req.body)return res.sendStatus(400);

function callback(error,stdout,stderr){res.write(JSON.stringify( {status:"stopped"}));res.end(); };
exec("sudo docker stop "+req.body.cid,callback);
});

app.post('/delete',urlencodedParser,function(req,res){
if(!req.body)return res.sendStatus(400);

function callback(error,stdout,stderr){res.write(JSON.stringify( {status:"deleted"}));res.end(); };
exec("sudo docker rm -f "+req.body.cid,callback);
});

var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});


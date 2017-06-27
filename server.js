var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');

var express = require('express');
var server = express();
var requestBody;
var test = 'polina';
server.use(bodyParser.json());

var port = 3000;

server.put('/put', function (req, res) {
    requestBody = req.body; //Inside the requestBody I have my JSON data body 
    console.log(requestBody);
    res.status(200);
    res.send('ok');
});
//This API is retreiving the content of the Client.html file . 
server.get('/editor', function (req, res) {
    var client = fs.readFileSync('client.html', 'utf-8');
    res.status(200);
    res.send(client);
});
//This API will build a new viewer view.
    server.get('/viewer', function (req, res) {
    var viewer = fs.readFileSync('Viewer.html', 'utf-8');
    var viewer = viewer.replace("$TITLE$",requestBody.title).replace("$CONTENT$",requestBody.content);
    res.status(200);
    //var content = '<h2>' + requestBody.title + '</h2>' + requesBody.content;
   res.send(viewer);
});



server.listen(port); 

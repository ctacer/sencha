

var express = require('express');

var app = express();


app.set('port', 8001);

app.get('/', function (req, res) {
  res.send('hello');
});

require('http').createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

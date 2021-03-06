
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/crud_example');
var db = monk('mongodb://tweensunplugged:tweens@ds053808.mongolab.com:53808/tweens')
var id;

var app = express();


// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/samplegroup', routes.samplegroup(db));
app.get('/newsample', routes.newsample);
app.get('/editsample/:id', routes.editsample(db));

app.post('/update', routes.update(db));
app.post('/addsample', routes.addsample(db));
app.post('/deletesample', routes.deletesample(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

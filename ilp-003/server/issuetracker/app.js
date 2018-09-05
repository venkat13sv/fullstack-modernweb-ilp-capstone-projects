var express = require('express');
var fs = require('fs');
var path = require('path');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');// Include this line among your other declarations.
var bodyParser=require("body-parser");


//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

var issues_FILE = path.join(__dirname, 'issues.json');

app.set('port', (process.env.PORT || 3000));

app.use(cors());// Include this line where you find a list of use statementsbut it should be 

app.use('/', express.static(path.join(__dirname, '.')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(express.bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/issues', function(req, res) {
  fs.readFile(issues_FILE, function(err, data) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.description = "Internal Error";
      res.send(err);
    }
    else {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(JSON.parse(data));
    }
  });
});
app.post('/issues/add', function(req, res) {
	//console.log(req.body);
	var file_content = fs.readFileSync(issues_FILE);
	
	var content = JSON.parse(file_content);
	var content1=req.body;
	content1.id=content.length+1;
	content.push(content1);
	fs.writeFile(issues_FILE, JSON.stringify(content), function (err) {
		if (err) return console.log(err);
	//	console.log(JSON.stringify(content));
		console.log('writing to ' + issues_FILE);
});
	console.log("posted");
});
app.get('/issues/edit/:id', function (req, res) {
    let id = req.params.id;
	var file_content = fs.readFileSync(issues_FILE);
	var content = JSON.parse(file_content);
	let f = content.find(x => x.id == id);
	res.send(f);
});
app.put('/issues/update/:id', function (req, res) {
    let id = req.params.id;
	var file_content = fs.readFileSync(issues_FILE);
	var content = JSON.parse(file_content);
    //let f = content.find(x => x.id == id);
	var content1=req.body;
    content[id].name = content1.name;
	content[id].description = content1.description;
	content[id].severity = content1.severity;
	content[id].created_date = content1.created_date;
	content[id].status = content1.status;
	content[id].closed_date= content1.closed_date;
	fs.writeFile(issues_FILE, JSON.stringify(content), function (err) {
		if (err) return console.log(err);
	//	console.log(JSON.stringify(content));
		console.log('writing to ' + issues_FILE);
});
	
    //res.send(f);
});
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
  console.log('Directory test'+ issues_FILE);
});

//app.use('/', index);
//app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

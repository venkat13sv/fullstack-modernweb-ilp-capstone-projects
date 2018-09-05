var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var issueS_FILE = path.join(__dirname, 'issues.json');

app.set('port', (process.env.PORT || 4200));
var cors = require('cors');// Include this line among your other declarations.
app.use(cors());// Include this line where you find a list of use statementsbut it should be 

app.use('/', express.static(path.join(__dirname, '.')));

app.get('/issues', function(req, res) {
  fs.readFile(issueS_FILE, function(err, data) {
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

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

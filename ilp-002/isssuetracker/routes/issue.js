var issueApi = require('../data/issueApi');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  issueApi.getAllissues(function(err, items) {
    
    res.render('issue/index', {title: 'Issue Viewer', issues: items})
	});
});

router.get('/create', function(req, res) {
	res.render('issue/create');
});

router.post('/create', function(req, res) {
  var issue = {};
  
  issue.name = req.body.name;
  issue.description = req.body.description;
  issue.severity=req.body.severity;
  var d=new Date(req.body.createDate);
  var twoDigitDate=d.getDate();
  var twoDigitMonth=d.getMonth()+1;
  if(((d.getMonth())+1)<10)
    twoDigitMonth="0"+twoDigitMonth;
  if(d.getDate()<10)
    twoDigitDate="0"+twoDigitDate;
  issue.created_date= twoDigitDate+ "-"+ twoDigitMonth  + "-" + d.getFullYear();
  issue.status=req.body.status;
  d=new Date(req.body.closeDate);
  twoDigitDate=d.getDate();
  twoDigitMonth=d.getMonth()+1;
  if(((d.getMonth())+1)<10)
    twoDigitMonth="0"+twoDigitMonth;
  if(d.getDate()<10)
    twoDigitDate="0"+twoDigitDate;
  issue.closed_date=twoDigitDate+ "-"+ twoDigitMonth  + "-" + d.getFullYear();

  issueApi.saveissue(issue, function(err, issue) {
	  res.redirect('/issue');
  });
});

router.get('/edit/:id', function(req, res) {
  issueApi.getissueById(req.params.id, function(err, issue) {
    var d=issue.created_date.split("-");
    //if(d[1]!=10 || d[1]!=11 || d[1]!=12 )
    //d[1]="0"+d[1];
    issue.created_date=d[2]+"-"+d[1]+"-"+d[0];
    d=issue.closed_date.split("-");
    issue.closed_date=d[2]+"-"+d[1]+"-"+d[0];
    res.render('issue/edit', {issue: issue});
  });

});

router.post('/edit/:id', function(req, res) {
  var updatedissue = {};
  updatedissue.name = req.body.name;
  updatedissue.description = req.body.description;
  updatedissue.severity=req.body.severity;
  var d=new Date(req.body.createDate);
  var twoDigitDate=d.getDate();
  var twoDigitMonth=d.getMonth()+1;
  if(((d.getMonth())+1)<10)
    twoDigitMonth="0"+twoDigitMonth;
  if(d.getDate()<10)
    twoDigitDate="0"+twoDigitDate;
  updatedissue.created_date= twoDigitDate+ "-"+ twoDigitMonth  + "-" + d.getFullYear();
  updatedissue.status=req.body.status;
  d=new Date(req.body.closeDate);
  twoDigitDate=d.getDate();
  twoDigitMonth=d.getMonth()+1;
  if(((d.getMonth())+1)<10)
    twoDigitMonth="0"+twoDigitMonth;
  if(d.getDate()<10)
    twoDigitDate="0"+twoDigitDate;
  updatedissue.closed_date=twoDigitDate+ "-"+ twoDigitMonth  + "-" + d.getFullYear();
  issueApi.updateissueById(req.params.id, updatedissue, function(err) {
			res.redirect('/issue');
  });
});

router.get('/delete/:id', function(req, res) {
  issueApi.deleteissueById(req.params.id, function(err) {
    res.redirect('/issue');
  });
});

module.exports = router;

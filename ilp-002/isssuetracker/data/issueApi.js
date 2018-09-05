"use strict";

var issues = require('./issueData').issues;
var _ = require('lodash');

var currentID = 3;
var _clone = function(item) {
	return JSON.parse(JSON.stringify(item));
};

var issueApi = {
	getAllissues: function(callback) {
		callback(null, _clone(issues));
	},
  getissueById: function(id, callback) {
		var issue = _.find(issues, {id: parseInt(id)});
		callback (null, _clone(issue));
  },
  updateissueById: function(id, issue, callback) {
			var existingissueIndex = _.indexOf(issues, _.find(issues, {id: parseInt(id)}));
			issue.id = parseInt(id);
			issues.splice(existingissueIndex, 1, issue);
			callback (null);
  },
	saveissue: function(issue, callback) {
		currentID = issues.length + 1;
    issue.id = currentID;
    issues.push(issue);
		callback(null, _clone(issue));
	},
	deleteissueById: function(id, callback) {
		_.remove(issues, { id: parseInt(id)});
    callback(null);
	}
};

module.exports = issueApi;

var mysql = require('mysql');
var events = require('events');
var emitter = new events.EventEmitter();
var app = require('../app.js');
var parser = require('../lib/parser');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'hoolai_share'
});

var indexSet = function(value, socket) {
	var subvalue = value.split("*");
	var circleSQL = "select * from circle where cid = '" + subvalue[1] + "'";
	var interval =  parser(subvalue[0]);
	var followerSQL = "select * from google_trends where time_interval = '" + interval + "' and (title = '";
	
	connection.query(circleSQL, function(err, rows, fields) {
		var titleArr = [];
		
		for (var i in rows) {
			titleArr.push(rows[i].title);
		}
		
		//console.log(titleArr);
		emitter.emit('select_circle_finished', titleArr);
	});
	
	emitter.on('select_circle_finished', function(titleArr) {
		
		for (var i in titleArr) {
			
			if (i == titleArr.length - 1) {
				followerSQL += titleArr[i] + "');";
				break;
			}
			followerSQL += titleArr[i] + "' or title = '";
		}
		//console.log(followerSQL);
		connection.query(followerSQL, function(err, rows, fields) {
			var techArr = [];
			for (var i in rows) {
				if (rows[i].google_index == 0) {
					continue;
				}
				techArr.push({title : rows[i].title, priority : rows[i].google_index});
			}
			app.send(techArr, socket);
			//console.log(subvalue[0]);
			console.log(techArr);
			techArr = null;
			emitter.removeAllListeners();
		});
	});
	
}

module.exports = indexSet;
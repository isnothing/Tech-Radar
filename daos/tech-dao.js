var mysql = require('mysql');
var events = require('events');
var emitter = new events.EventEmitter();
var app = require('../app.js');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'hoolai_share'
});

var results = function(uid, socket) {
	//connection.connect();
	var followerSQL = 'select * from follower where uid = ' + uid;
	//console.log("sql = " + followerSQL);
	connection.query(followerSQL, function(err, rows, fields) {
		var tidArr = [];
		if (err) {
			throw err;
		}
		
		if (rows.length != 0) {
			for (var i in rows) {
				tidArr.push(rows[i].tid);
			}
			emitter.emit('select_follower_finished', tidArr);
		} else {
			emitter.removeAllListeners();
			app.send(null, socket);
		}
	});
	
	emitter.on('select_follower_finished', function(tidArr) {
		var techSQL = 'select title from technology where tid = ';
		for (var i in tidArr) {
			if (i == 0) {
				techSQL += tidArr[i];
				continue;
			}
			techSQL += ' or tid = ' + tidArr[i];
		}
		connection.query(techSQL, function(err, rows, fields) {
			var techArr = [];
			if (err) {
				throw err;
			}
			
			if (rows.length != 0) {
				for (var i in rows) {
					techArr.push({title : rows[i].title});
				}
				console.log('techArrI', techArr);
				emitter.emit('select_technology_finished', techArr);
			} else {
				app.send(null, socket);
				emitter.removeAllListeners();
			}
			
		});
	});
	
	emitter.on('select_technology_finished', function(techArr) {
		//console.log('tidArr', tidArr);
		var techSQL = "select title, google_index from google_trends where title = '";
		for (var i in techArr) {
			if (i == 0) {
				techSQL += techArr[i].title + "'";
				continue;
			}
			techSQL += " or title = '" + techArr[i].title + "'";
		}
		console.log(techSQL);
		connection.query(techSQL, function(err, rows, fields) {
			var googleIndexArr = [];
			if (err) {
				throw err;
			}
			
			if (rows.length != 0) {
				for (var i in rows) {
					googleIndexArr.push({title : rows[i].title, priority : rows[i].google_index});
				}
				console.log('techArrI', googleIndexArr);
				
				app.send(googleIndexArr, socket);
			} else {
				app.send(null, socket);
			}
			
			emitter.removeAllListeners();
		});
		
		//connection.end();
	});
	
}

module.exports = results;
var parser = function(value) {
	var year = Math.floor(value/12 + 2004);
	var month = value%12 + 1;
	if (month < 10) {
		month = '0'+month;
	}
	return year + '-' + month;
};

module.exports = parser;
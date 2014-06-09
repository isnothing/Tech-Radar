var socket = io.connect('192.168.140.32');
var past = -1;
$(function() {
	$( "#slider" ).slider({
		  change: function( event, ui ) {
			  var value = $( "#slider" ).slider( "option", "value" );
			  //判断是否与前一次选择时间段一样，若一样，则不予更新
			  if (value != past) {
				  past = value;
			  } else {
				  return;
			  }
			  var year = Math.floor(value/12) + 2004;
			  var month = value%12 + 1;
			  document.getElementById("now").innerHTML = "选定时间:" + year + "年" + month + "月";
			  var circle = window.document.getElementById("circle").value; 
			  //console.log(circle);
			  value += '*'+circle;
			  socket.emit('solider', value);
		  }
		});
	$( "#slider" ).slider( "option", "max", 120 );
});

var Data = null;
var RADIUS = 329;
var posArray = [];

var socket = io.connect('192.168.140.32');
socket.on('result', function (data) {
	Data = data;
	socket.emit('my other event', { my: 'data' });
	drawBackground();
	draw();
});

//绘制雷达图
var draw = function() {
	document.getElementById("center").innerHTML = "";
	for (var i in Data) {
		drawWord(Data[i].title, Data[i].priority);
	}
};

//绘制雷达图背景
var drawBackground = function() {
	var canvasDom = document.getElementById("canvas");
	canvasDom.setAttribute("width", 1000);
	canvasDom.setAttribute("height", 780);
	canvasDom.style.backgroundColor  = 'white';
    var ctx = canvasDom.getContext("2d");
    drawCircle(ctx, 360);
    drawCircle(ctx, 240);
    drawCircle(ctx, 120);
};

//绘制技术项关键词
var drawWord = function(name, priority) {
    var title = document.createElement("a");
	title.setAttribute("color", "black");
	title.setAttribute("id", name);
	var text=document.createTextNode(name);
	title.appendChild(text);
	document.getElementById("center").appendChild(title);
	//console.log(name);
	$("#" + name).css("position" , "absolute");
	$("#" + name).css("color" , randomColor(name));
	$("#" + name).css("font-size" , 25);
	drawPast(name, priority);
	
	var pos = caculatePos(name, priority);

	$("#" + name).animate({left:pos.x});
	$("#" + name).animate({top:pos.y});
};

//绘制上一时间段的关键词分布
var drawPast = function(name, priority) {
	var pos = {x : 0, y : 0};
	for (var i = 0;i < posArray.length;) {
		if (posArray[i].title == name) {
			pos.x = posArray[i].position.x;
			pos.y = posArray[i].position.y;
			//console.log('dis: ' + Math.abs(posArray[i].x - pos.x) + ' ' + Math.abs(posArray[i].y - pos.y));
			break;
		}
		i++;
	}

	$("#" + name).css("left", pos.x);
	$("#" + name).css("top", pos.y);
};

//计算字符串的hash算法
var hash = function(name) {
	var hashcode = 0;
	for (var i = 0; i < name.length; i++) {
		hashcode = hashcode * 10 + name.charCodeAt(i);
	}
	
	return hashcode;
};

//计算关键词位置
var caculatePos = function(name, priority) {
	var pos = null;
	var offset = 0;

	pos = getPos(name, priority, offset);
	
	while (isDrawAble(name, pos) == 0) {
		pos = getPos(name, priority, offset);
		offset = offset + 5;
		if (offset > 1000) {
			updateArr(name, pos);
			break;
		}
	}
	
	return pos;
};

//根据关键词优先级生成其位置
var getPos = function(name, priority, offset) {
	var pos = {x : 0, y : 0};
	
	pos.x = getX(name, priority, offset);
	pos.y = getY(priority, pos.x);
	pos.x = Math.floor(pos.x);
	pos.y = Math.floor(pos.y);
	switch (hash(name) % 4) {
	case 0 : break;
	case 1 : pos.y = -pos.y; break;
	case 2 : pos.x = -pos.x; break;
	case 3 : pos.x = -pos.x;; pos.y = -pos.y; break;
	}
	
	return pos;
};

//随机返回一种颜色
var randomColor = function(name) {
	var colorArr = [
	     		'#3C6B15',
	     		'#6b4b38',
	     		'#eb9a2f',
	     		'#12acab',
	     		'#eb9a2f',
	     		'#CCFF33',
	     		'#AA0000',
	     		'#D28EFF'];
	
	return colorArr[(hash(name)) % colorArr.length];
};

//获取x轴坐标
var getX = function(name, priority, offset){
	var key = hash(name);
	var slope = key / 1000;
	
	if (Math.floor(slope % 2) == 0) {
		slope = slope /100;
	}
	
	var x = Math.sqrt((((Math.pow(329 - 3.29 * priority, 2))/ (Math.pow(slope, 2) + 1)))) + offset;
	
	return x;
};

//获取y轴坐标
var getY = function(priority, x){
	var section = 329 - (3.29 * priority);
	return  Math.sqrt(Math.pow((RADIUS - ((RADIUS / 100) * priority)), 2) - x*x + 1);
};

//判断该区域是否有足够的空间可以绘制, 返回0表示不能, 返回1表示可以
var isDrawAble = function(name, pos) {
	var i = 0;
	var flag = 0;
	
	for (;i < posArray.length;) {
		if (Math.abs(posArray[i].position.x - pos.x) < 60 && Math.abs(posArray[i].position.y - pos.y) < 40) {
			
			if (name != posArray[i].title) {
				flag = 1;
			} else {
				//console.log('name ' + name + ' pos name ' + posArray[i].title);
			}
			
			break;
		}
		i++;
	}
			
	if (flag == 0) {
		updateArr(name, pos);
		return 1;
	}
	
	return 0;
};

//更新指定标题元素的位置信息
var updateArr = function(name, pos) {
	var isExist = 0;
	
	for (var i = 0; i < posArray.length; i++) {
		if (posArray[i].title == name) {
			posArray[i].position.x = pos.x;
			posArray[i].position.y = pos.y;
			isExist = 1;
			break;
		}
	}
	
	if (isExist == 0) {
		posArray.push({title : name, position : pos});
	}
}

//绘制圆形
var drawCircle = function(ctx, radius) {
	ctx.fillStyle = '#3C6B25';
	ctx.globalAlpha = 0.05;
	// Draw a cricle
	ctx.beginPath();
	ctx.arc( 500, 360, radius, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.stroke();
};
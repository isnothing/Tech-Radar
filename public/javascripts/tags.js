var techArr = {'加载中...':1000};
var socket = io.connect('192.168.140.32');
socket.on('result', function (data) {
	document.getElementById("img").innerHTML = '';
	techArr = {'加载中...':1000};
	if (data == null) {
		techArr = {'没有数据':1000};
	} else {
		delete techArr["加载中..."];
		delete techArr["没有数据"];
		for (var i in data) {
			techArr[data[i].title] = data[i].priority;
		}
		socket.emit('my other event', { my: 'data' });
		/*console.log(techArr);*/
	}
	
	drawImg.ready(techArr , "img");
});

var drawImg = {
	canvasDom: null,
	data:[], //数据
	ctx: null, //花边
	finImgData : null , //最终图片
	finImgMsg: null, //存放是否已写信息
	colorArr : [ //颜色选择
		'#3C6B15',
		'#6b4b38',
		'#eb9a2f',
		'#12acab',
		'#eb9a2f',
	],
	
	ready : function( data ,  containerId ){
		this.data = data;
		this.canvasDom = document.createElement("canvas");
		this.canvasDom.setAttribute("width", 1000);
		this.canvasDom.setAttribute("height", 780);
		this.canvasDom.style.backgroundColor  = 'white';
		var containerDom = document.getElementById(containerId);
		containerDom.appendChild(this.canvasDom);
		
		this.ctx = this.canvasDom.getContext('2d');
		this.finImgData = this.ctx.createImageData(1000 , 780);
		this.finImgMsg = [];
		
		for(var i=0 ; i<1000 ; i++){
			this.finImgMsg[i] = [];
			for(var j=0 ; j<780 ; j++){
				this.finImgMsg[i][j] = 0;
			}
		}
		
		this.caculateData();
		//log(this.data)
		this.draw();
	},
	
	/**
	 * 计算标签大小
	 */
	caculateData : function(){
		var dataArr = [];
		var obj ;
		for(var name in this.data ){
			dataArr.push( {name:name , count : this.data[name]}) 
		}
		dataArr.sort(function(x , y){
			if(Math.floor(x.count) == Math.floor(y.count)){
				return 0;
			}
			if( Math.floor(x.count) > Math.floor(y.count)){
				return -1;
			}else{
				return 1;
			}
		})
		var shift=-6;
		for(var i =0 ; i< dataArr.length ; i++){
			if(i==0){
				dataArr[0].count = 68;
				continue;
			}
			if(shift < 0){
				shift ++
			}
			dataArr[i] .count = Math.floor(dataArr[i-1].count  * 99/ 100)+shift;
			dataArr[i] .count = dataArr[i] .count;
			/*if(dataArr[i] .count < 13){
				dataArr[i] .count = 17;
			}*/
			log(dataArr[i] .name + " " + dataArr[i] .count);
		}
		
		
		this.data = dataArr;
		
	},
	/**
	 * 开始画
	 */
	draw : function(){
		for(var i = 0 ; i< this.data.length ; i++){
			this.drawWord(this.data[i].name , 20);
		}

		this.ctx.putImageData(this.finImgData ,0,0);		//将图像数据放回
		this.drawCricle();
	},
	drawCricle : function() {
	this.ctx.fillStyle = '#3C6B15';
	this.ctx.globalAlpha = 0.05;
	// Draw the cricle1
	this.ctx.beginPath();
	this.ctx.arc(500, 390, 360, 0, 2*Math.PI);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.lineWidth = 1;
	this.ctx.stroke();

	// Draw the cricle2
	this.ctx.beginPath();
	this.ctx.arc(500, 390, 240, 0, 2*Math.PI);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.lineWidth = 1;
	this.ctx.stroke();

	// Draw the cricle3
	this.ctx.beginPath();
	this.ctx.arc(500, 390, 120, 0, 2*Math.PI);
	this.ctx.closePath();
	this.ctx.fill();
	this.ctx.lineWidth = 1;
	this.ctx.stroke();
	},
	/**
	 * 单一一个标签画
	 */
	drawWord: function(word , priority){
		var fillStyle = this.colorArr[ random(this.colorArr.length-1)];
		this.ctx.fillStyle = fillStyle;
		this.ctx.font = "900 " + priority + "px   微软雅黑";
		var w =this.ctx.measureText(word).width;
		this.ctx.textBaseline = "top";
		this.ctx.fillText(word ,0 ,0 );
		var wordImgData = this.ctx.getImageData( 0 , 0 , w , priority +10 );
		this.ctx.clearRect(0 ,0 , 1000 ,780 );
		//初始化查找点
		
		var centerPoint = this.getCenterPoint(priority);
		var i = 0;
		while (i<1000){
			if(centerPoint.isFullRound()){
				centerPoint.clearRound();
			}
			var pos = centerPoint.getCenterPos(priority);
			pos.x = 1000/2 +pos.x*6 - 50;
			pos.y = 780/2 +pos.y*6;
			
			if(this.isAbleDraw(wordImgData  , pos.x , pos.y)){
				for(var i = 0 ; i < wordImgData.width  ; i++){
					for(var j=0 ; j < wordImgData.height ; j++){
						var  point= getXY(wordImgData , i  ,j );
						if( point[3]!=0 ){
							setXY(this.finImgData ,pos.x+i,pos.y+j,point);
							this.finImgMsg[pos.x+i-1][pos.y+j-1] = 1;
						}
					}
				}
				break;
			}
			i++;
			centerPoint = this.getCenterPoint( centerPoint);
		}
	},
	
	/**
	 * 是否可以画
	 */
	isAbleDraw : function ( wordImg, x , y){
		var w = wordImg.width + 5;
		var h = wordImg.height + 5;
		
		for(var i = 0 ; i <  w ; i++){
			for(var j = 0 ; j < h ; j++){
				var wordPoint = getXY(wordImg , i ,j);
				//检测文字图片上该点是否有痕迹，不全为白为有痕迹
				if(wordPoint[3]!=0 ){
					var finx = x+ i -1;
					var finy = y + j - 1;
					if(finx <0 || finx >= 1000 ||finy <0 || finy >=780){
						return false;
					}
					
					if(this.finImgMsg[finx][finy] == 1){
						return false;
					}
				}
			}
		}
		
		
		
		return true;
	},
	
	/**
	 * 用于标签的位置选择
	 */
	getCenterPoint : function(centerPoint){
		
		//没有传入centerPoint,默认初始化
		if( typeof centerPoint != 'object'){
			//centerPoint对象，用于存储以往已经选择的点的信息
			var centerPoint = {
				round : 1, //第几圈
				choose : [], //已选择的点
				nowChoose : null,
				revert : 0,
				/**
				 * 随机选择点
				 */
				randPoint : function (){
					var chooseCount  = this.round == 1 ?  1 : this.round * 2 + (this.round - 2) * 2; //总共可以选择的点
					//所有情况已经遍历了，增加一环 ,重置
					if(this.choose.length == chooseCount ){
						this.round++;
						this.choose = [];
						this.revert = 0;
						return this.randPoint();
					}
					
					while(true){
						this.nowChoose = random(chooseCount-1);
						if(!inArray(this.nowChoose , this.choose)){
							this.choose.push(this.nowChoose);
							
							break;
						}
					} 
					
					return this.nowChoose;
				},
				getCenterPos:function(priority){
					var shift = 10; //偏移率
					var shiftw = random(1) ? random( priority*shift) : -random( priority*shift);
					var shifth = random(1) ? random( priority*shift) : -random( priority*shift);
					var pos = {
						x : 0,
						y : 0
					}
					
					if(this.nowChoose === null){
						return false;
					}
				
					if(this.round != 1){
						var quadrant = Math.floor((this.nowChoose) / (this.round-1)); //第几象限
						var distance =  (this.nowChoose+1) % this.round;//象限的偏移
						
						//log(quadrant)
						
						switch(quadrant){
							case 0 :
								pos.x = priority / 2  *  distance  ;
								pos.y = priority / 2 *  (this.round -distance) ;
								break;
							case 1 :
								pos.x = priority / 2  *  (this.round -distance);
								pos.y = priority / 2 *  (-distance) ;
								break;
							case 2 :
								pos.x = priority / 2  *  (-distance);
								pos.y = priority / 2 *  -(this.round - distance) ;
								break;
							case 3 :
								pos.x = priority / 2  * -(this.round - distance) ;
								pos.y = priority / 2 * distance;;
								break;
						}
					}
					
				
					pos.x +=  shift;
					pos.y +=  shift;
					
					pos.x = Math.floor(pos.x - priority/2)
					pos.y = Math.floor(pos.y - priority/2)
					return pos;
					
				},
				isFullRound: function(){
					if(this.revert) return false;
					var chooseCount  = this.round == 1 ?  1 : this.round * 2 + (this.round - 2) * 2; //总共可以选择的点
					return this.choose.length == chooseCount;
				},
				clearRound:function(){
					this.choose = [];
					this.revert = 1;
				}
			};
		
		}
		
		centerPoint.randPoint();
		return  centerPoint;
	}
	
}

function random(num){
	return Math.floor(Math.random() *( num+1));
}
function log(str){
	console.log(str);
}

/**
 * imgData根据坐标获取
 */
function getXY(imgData ,x, y){
	var res = []; 
	var w = imgData.width;
	var h = imgData.height;
	
	var pos = ( y * w + x) * 4;
	
	res[0] =  imgData.data[pos];
	res[1] =  imgData.data[pos+1];
	res[2] =  imgData.data[pos+2];
	res[3] =  imgData.data[pos+3];
	return res;
}
/**
 * imgData根据坐标修改
 */
function setXY(imgData ,x, y,res){
	var w = imgData.width;
	var h = imgData.height;
	
	var pos = ( y * w + x) * 4;
	
	imgData.data[pos] = res[0] ;
	imgData.data[pos+1] = res[1] ;
	imgData.data[pos+2] = res[2] ;
	imgData.data[pos+3] = res[3] ;
}

/**
 *将重心坐标改成边缘坐标
 * 适用于x和y轴
 */
function center2abs(center , w , pos ){
	return center - Math.floor(w/2)+pos;
}

function inArray(son , arr){
	for(var i = 0 ; i < arr.length ; i++){
		if(arr[i] == son){
			return true;
		}
	}
	return false;
}

function changeImg(){
	var containerDom = document.getElementById("img");
	containerDom.innerHTML = '';
	drawImg.ready(techArr , "img");
}
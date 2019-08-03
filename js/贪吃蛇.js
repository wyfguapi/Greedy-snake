var span = document.querySelector("span");

var html = document.querySelector('html');

//获取开始游戏按钮
var button = document.querySelector('button');

//获取游戏暂停按钮
var input = document.querySelector('input');

//获取内容对象
var content = document.querySelector('.content')
//var snake = [{x:1,y:1},{x:2,y:1},{x:3,y:1}]
//创建变量蛇的身子
var snakeList = [];

//游戏间隔函数的id
var intervalGameId = 0;

//默认是左边的方向，右{x:1,y:0},上{x:0,y:-1},下{x:0,y:1}
var direction = {
	x:-1,
	y:0
}

//设置得分变量
var score = 0;

//设置游戏盒子大小
var contSizeX = 30;
var contSizeY = 20;

function renderCont(x,y){
	contSizeX = x;
	contSizeY = y;
	content.innerHTML = ""
	console.log([content])
	var size = content.clientWidth/x;
	for(var i=0;i<y;i++){
		for(j=0;j<x;j++){
			var newdiv = document.createElement('div');
			newdiv.className = 'contItem';
			newdiv.id = "x" + j + "y" + i;
			newdiv.style.width = size + "px";
			newdiv.style.height = size +"px"
			content.appendChild(newdiv);
		}
	}
}

//随机出蛇的数组
function randomSnake(start,end){
	snakeList = []
	
	//随机出蛇头的位置
	x = parseInt(Math.random()*(end-start)) + start;
	y = parseInt(Math.random()*(end-start)) + start;
	snakeList.push({x:x,y:y})
	snakeList.push({x:(x+1),y:y})
	snakeList.push({x:(x+2),y:y})
}

//根据蛇的数组，渲染蛇到cont地图对象上面，实际上就是 改变蛇坐标上的样式名
function renderSnake(){
	snakeList.forEach(function(item,index){
		
		//通过坐标，拼凑出id选择器
		var selector = '#x'+item.x+"y"+item.y;
		var snakediv = document.querySelector(selector);
		snakediv.className = "contItem snake"
//		console.log(item.x,item.y);
//		console.log(snakeList)
	})
}


function renderFood(){
	do{
		//随机出食物的坐标
		x = parseInt(Math.random()*contSizeX);
		y = parseInt(Math.random()*contSizeY);
		var selector = '#x'+x+"y"+y;
		var fooddiv = document.querySelector(selector);
		
		//百分之十的机率会随机出红色的食物，吃到就会使蛇的身体减一
		if(Math.random()<0.2){
			fooddiv.dataset.food = 'redstar';
		}
	}while(fooddiv.className != "contItem")
	
	fooddiv.className = "contItem" + ' food'
}

function isFood(x,y){
	var selector = '#x'+x+"y"+y;
	var fooddiv = document.querySelector(selector);
	
//	console.log(selector);
//	console.log(fooddiv.className);
	
	if(fooddiv.className =="contItem food"){
		return true;
	}else{
		return false;
	}
}

function isSnakeBody(x,y){
	var selector = '#x'+x+"y"+y;
	var fooddiv = document.querySelector(selector);
	
//	console.log(selector);
//	console.log(fooddiv.className);

	if(fooddiv.className == "contItem snake"){
		return true;
	}else{
		return false;
	}
}

if(html.className.indexOf('mobile')!=-1){
	renderCont(15,20);
}else{
	//渲染地图
	renderCont(30,20);
}

function gaming(){
	intervalGameId = setInterval(function(){
		
		//新的蛇头，坐标求出来
		var x = snakeList[0].x + direction.x;
		if(x>(contSizeX-1)){
			x = 0;
		}
		if(x<0){
			x = contSizeX-1
		}
		var y = snakeList[0].y + direction.y;
		if(y>(contSizeY-1)){
			y = 0;
		}
		if(y<0){
			y = contSizeY-1
		}
		var snakeHeader = {x:x,y:y};
		if(snakeHeader.x==15){
			console.log(snakeHeader)
		}
		
		//是不是蛇的身体
		//是不是食物
		//是不是一些炸弹
		//console.log(isfood(snakeHeader.x,snakeHeader.y));
		//console.log(snakeHeader.x,snakeHeader.y);
		if(isFood(snakeHeader.x,snakeHeader.y)){
			var selector = '#x' + snakeHeader.x + "y" + snakeHeader.y;
			var newdiv = document.querySelector(selector);
			newdiv.className = 'contItem';
			
			//将新的蛇头坐标插入到snakeList数组里面
			snakeList.unshift(snakeHeader)
			renderFood()
			score ++;
			span.innerHTML = score;
			if(newdiv.dataset.food == 'redstar'&&snakeList.length>4){
				
				var snakeFooter = snakeList.pop();
				//console.log(snakeFooter)
				
				//将蛇尾恢复成正常样子
				var selector = '#x' + snakeFooter.x + "y" +snakeFooter.y;
				var delDiv = document.querySelector(selector);
				delDiv.className = 'contItem';
				
				var snakeFooter = snakeList.pop();
				//console.log(snakeFooter)
				
				//将蛇尾恢复成正常样子
				var selector = '#x' + snakeFooter.x + "y" +snakeFooter.y;
				var delDiv = document.querySelector(selector);
				delDiv.className = 'contItem';
			}
		}else if(isSnakeBody(snakeHeader.x,snakeHeader.y)){
			if(html.className.indexOf('mobile')!=-1){
				if(!localStorage.tcsMaxScore){
					localStorage.tcsMaxScore = score;
					wyf1("<div>你创造了一个新的记录！</div> <div>你的当前的分是："+score+"</div>")
				}else if(score>parseInt(localStorage.tcsMaxScore)){
					localStorage.tcsMaxScore = score;
					wyf1("<div>你创造了一个新的记录！</div> <div>你的当前的分是："+score+"</div>")
				}else{
					wyf1("<div>游戏结束！历史纪录最高是："+localStorage.tcsMaxScore+"!!!</div><div>你的当前的分是："+score+"</div>")
				}
				
			}else{
				
				if(!localStorage.tcsMaxScore){
					localStorage.tcsMaxScore = score;
					alert("你创造了一个新的记录！你的当前的分是："+score)
				}else if(score>parseInt(localStorage.tcsMaxScore)){
					localStorage.tcsMaxScore = score;
					alert("你创造了一个新的记录！你的当前的分是："+score)
				}else{
					alert("游戏结束！历史纪录最高是："+localStorage.tcsMaxScore+"!!!you are loser!你的当前的分是："+score)
				}
			}
			
			clearInterval(intervalGameId)
		}else{
			snakeList.unshift(snakeHeader)
			
			//删除蛇尾
			var snakeFooter = snakeList.pop();
			
			var selector = '#x'+snakeFooter.x+"y"+snakeFooter.y;
			var delDiv = document.querySelector(selector);
			delDiv.className = 'contItem';
		}
		
		//然后将蛇渲染出来
		renderSnake();
		
	},100)
}

button.onclick = function(){
	//开始游戏
	//渲染地图
	if(html.className.indexOf('mobile')!=-1){
		renderCont(15,20);
		content.style.top = '1.5rem'
	}else{
		//渲染地图
		renderCont(30,20);
	}
	
	//随机生成蛇的列表
	randomSnake(5,10);
	
	//渲染蛇
	renderSnake();
	renderFood()
	direction = {x:-1,y:0}
	score = 0;
	gaming()
}

//监听上下左右按键事件
html.onkeydown = function(e){
	console.log(e);
	
	//当按了右键，要想往右这个方向走，那么就必须之前的方向不能是左边
	if(e.key=='ArrowRight'&&direction.x!=-1){
		direction = {x:1,y:0};
	}
	if(e.key=='ArrowLeft'&&direction.x!=1){
		direction = {x:-1,y:0};
	}
	if(e.key=='ArrowDown'&&direction.y!=-1){
		direction = {x:0,y:1};
	}
	if(e.key=='ArrowUp'&&direction.y!=1){
		direction = {x:0,y:-1};
	}
	
}

//移动端监听滑动事件
wyf.listen('slideLeft',function(){
	direction = {x:-1,y:0};
})
wyf.listen('slideRight',function(){
	direction = {x:1,y:0};
})
wyf.listen('slideTop',function(){
	direction = {x:0,y:-1};
})
wyf.listen('slideBottom',function(){
	direction = {x:0,y:1};
})

input.onclick = function(){
	if(input.value == "暂停游戏"){
		clearInterval(intervalGameId)
		input.value = "继续游戏"
	}else{
		gaming()
		input.value = "暂停游戏"
	}
}






var wyf = {
	event:{
		//存放上下左右滑动的时候，调用的函数
		slideLeft:[],
		slideRight:[],
		slideTop:[],
		slideBottom:[]
	},
	listen:function(slideName,fn){
		
		var isHas = wyf.event.hasOwnProperty(slideName)
		//console.log(isHas)
		if(isHas){
			wyf.event[slideName].push(fn)
		}else{
			console.log('事件名输入错误，请输入这个四个事件名：slideLeft,slideRight,slideTop,slideBottom')
		}
		
	},
	removeListen:function(slideName,fn){
		var isHas = wyf.event.hasOwnProperty(slideName)
		//console.log(isHas)
		if(isHas){
			wyf.event[slideName].forEach(function(item,index){
				if(fn==item){
					wyf.event[slideName].splice(index,1);
				}
			})
		}else{
			console.log('事件名输入错误，请输入这个四个事件名：slideLeft,slideRight,slideTop,slideBottom')
		}
	},
	removeListenAll:function(slideName){
		wyf.event[slideName] = []
	},
	init:function(){
		var html = document.querySelector("html");
		//变量用于记录触摸起始点的位置
		var xStart = 0;
		var yStart = 0;
		var xEnd = 0;
		var yEnd = 0
		//滑动的距离坐标
		var x = 0;
		var y = 0;
		var direction = null;
		
		
		//触摸开始
		html.addEventListener('touchstart',function(event){
			//console.log(event)
			xStart = event.touches[0].pageX;
			yStart = event.touches[0].pageY;
		})
		//触摸移动
		html.addEventListener('touchmove',function(event){
			//console.log(event)
			xEnd = event.touches[0].pageX;
			yEnd = event.touches[0].pageY;
		})
		//触摸结束
		html.addEventListener('touchend',function(event){
			//console.log(event)
			x = xEnd - xStart;
			y = yEnd - yStart;
			//计算滑动的距离值
			//console.log(x,y)
			var xAbs =  Math.abs(x)
			var yAbs =  Math.abs(y)
			//判断x,y谁比较大，根据谁比较大，决定是水平滑动还是竖直滑动，并且滑动的距离必须是大于100px;
			
			if(xAbs>yAbs&&xAbs>100){
				//console.log('水平滑动')
				if(x>0){
					//console.log("向右滑动")
					direction = 'slideRight';
					//调用向右滑动的事件
					wyf.event[direction].forEach(function(item,index){
						item(direction)
					})
//					wyf.event.slideRight.forEach(function(item,index){
//						item(direction)
//					})
					
					
				}else{
					//console.log('向左滑动')
					direction = 'slideLeft'
					wyf.event[direction].forEach(function(item,index){
						item(direction)
					})
				}
			}else if(yAbs>100){
				//console.log('竖直滑动')
				if(y>0){
					//console.log("向下滑动")
					direction = 'slideBottom';
					wyf.event[direction].forEach(function(item,index){
						item(direction)
					})
				}else{
					//console.log('向上滑动')
					direction = 'slideTop';
					wyf.event[direction].forEach(function(item,index){
						item(direction)
					})
				}
			}
			//console.log('direction:',direction);
		})
	}
}
		
			
			
wyf.init()		








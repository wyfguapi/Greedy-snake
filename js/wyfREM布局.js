(function(){
	function wyf(){
		var html = document.querySelector('html');
		html.style.fontSize = innerWidth/7.5 + 'px';
		var userAgent = navigator.userAgent;
		console.log(userAgent)
		
		//字符串indexOf可以查找字符是否有想要查找的内容，查找的结果是查找的内容在字符串里面第几个位置，如果找不到就返回-1
		//var result = userAgent.indexOf("Android")
		//console.log(result)
		
		if(userAgent.indexOf("Android")!= -1||userAgent.indexOf("iPhone")!= -1||userAgent.indexOf("iPad")!=-1){
			html.className = "mobile"
		}else{
			html.className = "pc"
		}
		
		if(innerWidth<320){
			html.className += " lt320 lt640 lt960 lt1200 ";
		}else if(innerWidth<640){
			html.className += " gt320 lt640 lt960 lt1200 ";
		}else if(innerWidth<960){
			html.className += " gt320 gt640 lt960 lt1200 ";
		}else if(innerWidth<1200){
			html.className += " gt320 gt640 gt960 lt1200 ";
		}else{
			html.className += " gt320 gt640 gt960 gt1200 ";
		}
	}
	window.onresize = function(){
		wyf()
	}
	wyf()
})()

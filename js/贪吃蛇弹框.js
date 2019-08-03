function wyf1(content){
	
	var body = document.querySelector('body');
	var head = document.querySelector('head');
	var alerDiv = null;
	
	
	//在JS里面设置弹框的CSS样式
	var alerStyle = document.createElement('style');
	alerStyle.innerHTML = `
	*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	}
	.alertContain{
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.alert{
		width: 6rem;
		height: 4rem;
		background: #FFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		border-radius: 15px;
		box-shadow: 0 10px 20px #333;
		overflow: hidden;
		padding: 0 0 0.1rem 0;
		margin:50% auto;
	}
	.alert h3{
		height: 0.8rem;
		line-height: 0.8rem;
		width: 100%;
		padding: 0 0.3rem;
		border-bottom: 0.01rem solid #ccc;
		background: skyblue;
		color: #fff;
		font-size: 0.3rem;
	}
	.alert div{
		width: 100%;
		height: auto;
		padding: 0.2rem 0.3rem;
		font-size: 0.3rem;
	}
	.alert button{
		width: 1.5rem;
		margin-top: 0.15rem;
		height: 0.5rem;
		background: skyblue;
		color: #FFF;
		border: none;
		border-radius: 0.15rem;
		
	}
	`
	
	//在head元素里面插入alerstyle(CSS样式标签)
	head.appendChild(alerStyle);
	
	//创建弹框div
	alerDiv = document.createElement('div');
	
	//设置元素对象的class名字(类名)
	alerDiv.className = "alterContain"
	
	//100vw为浏览器100%宽度
	//100vh为浏览器100%高度
	alerDiv.style.width = '100vw';
	alerDiv.style.height = '100vh';
	alerDiv.style.position = 'fixed';
	alerDiv.style.top = '0';
	alerDiv.style.left = '0';
	alerDiv.style.zIndex = '100'
	
	//r-->red,g-->green,b-->blue,a-->opacity (透明度)；
	alerDiv.style.background = 'rgba(0,0,0,0.6)';
	
	//设置弹框div的内容，${content}，这种写法可以将content的内容插入到字符串中
	alerDiv.innerHTML=`
	<div class="alert">
		<h3>温馨提示</h3>
		<div>${content}</div>
		<button class="confirm">重新游戏</button>
	</div>
	`
	
	//将弹框插入到body上
	body.appendChild(alerDiv);
	
	//获取重新游戏的按钮元素
	var confirm = document.querySelector(".confirm")
	
	//设定重新游戏按钮的点击事件
	confirm.onclick = function(){
		
		//当被点击的时候，删除alertDiv弹框
		alerDiv.parentElement.removeChild(alerDiv);
		
		//当被点击的时候，重新加载游戏界面
		location.reload()
	}
}

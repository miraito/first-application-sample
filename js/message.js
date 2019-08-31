// スタートメッセージ作成
var startMessage = function(scene){
	var msg = new Sprite(259,58);
	msg.image = game.assets['images/text/q_start.png'];
	// msg.frame = 2;
	msg.moveTo(334,150);
	msg.count = 0;
	msg.opacity = 0;
	scene.addChild(msg);
	msg.tl
	.fadeIn(10)
	.delay(30)
	.fadeOut(10)
	.then(function(){scene.removeChild(msg)});
	// msg.addEventListener(Event.ENTER_FRAME,function(){
	// 	if(this.x > 164){
	// 		if(this.x - 64 > 164){
	// 			this.x -= 64;	
	// 		}else{
	// 			this.x = 164
	// 		}
	// 	}else if(this.x == 164){
	// 		this.count++;
	// 	}
	// 	if(this.count > 15){
	// 		this.x -=64;
	// 	}
	// 	if(this.x < -600){
	// 		scene.removeChild(this);
	// 	}
	// })
	return msg;
}
var phaseMessage = function(scene){
	// var msg = new Sprite(600,60);
	var msg = new Sprite(188,48);
	msg.image = game.assets['images/text/phase.png'];
	// msg.frame = 10;
	msg.moveTo(370,250);
	msg.scaleY = 0;
	// msg.scaleX = 0.5;
	msg.tick = 0;
	msg.count = 0;
	var speed = 0.4;
	msg.addEventListener(Event.ENTER_FRAME,function(){
		if(this.tick == 0){
			this.scaleY +=speed;
			if(this.scaleY >= 0.5)this.tick++;
		}else if(this.tick == 1){
			this.scaleY -=speed;
			if(this.scaleY <= -0.5)this.tick++;
		}else if(this.tick == 2){
			this.scaleY += speed;
			if(this.scaleY >= 0.5)this.tick++;
		}else if(this.tick == 3){
			this.count++;
			if(this.count > 15){
				this.scaleY -= 0.3;
				if(this.scaleY <= 0){
					is_action = true;
					scene.removeChild(this);		
				}
			}
		}
		
	});
	scene.addChild(msg);
}
// ターン終了
var trunEndMessage = function(scene){
	// var msg = new Sprite(560,60);
	var msg = new Sprite(228,61);
	// var image = new Surface(560,60);
	// var tip = game.assets['images/msg/msg2.png'];
	// image.draw(tip,0,180,240,60,0,0,240,60);
	// var tip = game.assets['images/msg/msg2.png'];
	// image.draw(tip,480,300,240,60,220,0,240,60);
	// msg.image = image;
	msg.image = game.assets['images/text/next.png'];
	msg.moveTo(800,150);
	msg.scaleY = 0;
	msg.count = 0;
	msg.num = 0;
	scene.addChild(msg);
	msg.tl.moveTo(350,150,10)
	.and()
	.waitUntil(function(){
		if(msg.scaleY < 1){
			msg.scaleY +=0.2
		}
		if(msg.x < 351)return true;
	})
	.delay(30)
	.moveTo(-228,150,10)
	.and()
	.waitUntil(function(){
		if(msg.scaleY > 0){
			msg.scaleY -= 0.3;	
		}else{
			return true;
		}
	})
	.then(function(){
		scene.removeChild(msg);
	})
	
	// msg.addEventListener(Event.ENTER_FRAME,function(){
	// 	if(this.x > 214){
	// 		if(this.x - 64 > 214){
	// 			this.x -= 64;	
	// 		}else{
	// 			this.x = 214
	// 		}
	// 	}else if(this.x == 214){
	// 		this.count++;
	// 	}
	// 	if(this.count > 30){
	// 		this.x -=64;
	// 		if(this.scaleY > 0){
	// 			this.scaleY -= 0.3;	
	// 		}
	// 	}else{
	// 		// if(this.num !==  720){
	// 		// 	this.num +=30;
	// 		// 	this.rotate(this.num);	
	// 		// }
	// 		if( this.scaleY < 1 ) this.scaleY +=0.2;
	// 	}
	// 	if(this.x < -600){
	// 		scene.removeChild(this);
	// 	}
	// })
}
var sceneClear = function(){
	var msg = new Sprite(202,44);
	msg.image = game.assets['images/text/clear.png'];

	return msg;
}
var epilogueMessage = function(){
	var msg = new Sprite(77,31);
	msg.image = game.assets['images/text/epilogue.png'];
	return	msg;
}
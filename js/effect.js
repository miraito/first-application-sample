var zan = function(scene,chara){
	var x = chara.x;
	var y = chara.y;
	var zan2 = new Sprite(120,120);
	zan2.image = game.assets['images/effect/zan0.png'];
	zan2.flag = true;
	zan2.addEventListener(Event.ENTER_FRAME,function(){
		if(this.flag == true){
			this.frame = this.age % 8;
			if(this.frame === 7){
				this.flag = false;
			}
		}
	});
	var zan1 = new Sprite(120,120);
	zan1.image = game.assets['images/effect/zan1.png'];
	zan1.flag = true;
	zan1.addEventListener(Event.ENTER_FRAME,function(){
		if(this.flag == true){
			this.frame = this.age % 8;
			if(this.frame === 7){
				this.flag = false;
			}
		}
	});
	var zan = new Group;
	zan.moveTo(x-48,y-48);
	zan.flag = true;
	zan.addChild(zan2);
	zan.addEventListener(Event.ENTER_FRAME,function(){
		if(zan2.frame === 5)this.addChild(zan1);
		if(zan2.frame === 7)zan2.opacity = 0;
		if(zan1.frame === 7){
			scene.removeChild(this);
			this.flag = false;
		}
		// if(this.age > 20)this.flag = false;
	});
	scene.addChild(zan);
	return zan;
};
var zan2 = function(scene,chara,black1){
	var x = chara.x;
	var y = chara.y;
	var zan2 = new Sprite(120,120);
	zan2.image = game.assets['images/effect/zan1_0.png'];
	zan2.flag = true;
	zan2.addEventListener(Event.ENTER_FRAME,function(){
		if(this.flag == true){
			this.frame = this.age % 8;
			if(this.frame === 7){
				this.flag = false;
			}
		}
	});
	var zan1 = new Sprite(120,120);
	zan1.image = game.assets['images/effect/zan1_1.png'];
	zan1.flag = true;
	zan1.addEventListener(Event.ENTER_FRAME,function(){
		if(this.flag == true){
			this.frame = this.age % 8;
			if(this.frame === 7){
				this.flag = false;
			}
		}
	});
	var zan = new Group;
	zan.moveTo(x-48,y-48);
	zan.flag = true;
	zan.addChild(zan2);
	zan.addEventListener(Event.ENTER_FRAME,function(){
		if(zan2.frame === 5)this.addChild(zan1);
		if(zan2.frame === 7)zan2.opacity = 0;
		if(zan1.frame === 7){
			scene.removeChild(this);
			this.flag = false;
		}
		// if(this.age > 20)this.flag = false;
	});
	scene.addChild(zan);
	return zan;
}
var fire = function(scene,chara){
	var x = chara.x;
	var y = chara.y;
	var effect = new Sprite(120,120);
	var tip = game.assets['images/effect/fire.png'];
	var image = new Surface(1200,120);
	image.draw(tip,0,0,1200,120,0,0,1200,120);
	effect.image = image;
	effect.tl.waitUntil(function(){
		if(effect.age%2 === 0){
			effect.frame = (effect.age/2)%10
		}
		if( effect.frame === 9 ){
			this.flag = false;
			scene.removeChild(effect);
			return true;
		}
	})
	effect.moveTo(x-48,y-48);
	effect.flag = true;
	scene.addChild(effect);
	return effect;
}
var red_beam = function(scene,chara){
	var x = chara.x;
	var y = chara.y;
	var effect = new Sprite(120,120);
	effect.image = game.assets['images/effect/red_beam.png'];
	effect.opacity = 0.8;
	var loop = 0;
	effect.tl.waitUntil(function(){
		if(effect.age%2 === 0){
			effect.frame = (effect.age/2)%10
		}
		if( effect.frame === 9 ){
			loop++;
		}
		if( loop >= 2 ){
			scene.removeChild(effect);
			return true;
		}
	});
	effect.moveTo(x-48,y-48);
	effect.flag = true;
	// scene.addChild(effect);
	scene.insertBefore(effect,chara);
};
var shiki_0 = function(scene,chara,black1){
	var x = chara.x;
	var y = chara.y;
	var effect = new Sprite(120,120);
	effect.image = game.assets['images/effect/shiki_0.png'];
	effect.opacity = 0.9;
	effect.tl.waitUntil(function(){
		if(effect.age%2 === 0){
			effect.frame = (effect.age/2)%10
		}
		if( effect.frame === 9 ){
			this.flag = false;
			scene.removeChild(effect);
			return true;
		}
	})
	effect.moveTo(x-48,y-48);
	effect.flag = true;
	scene.addChild(effect);
};
var black_dragon = function(scene,chara,black1){
	var x = chara.x;
	var y = chara.y;
	var effect = new Sprite(80,64);
	effect.image = game.assets['images/effect/dragon.png']
	effect.frame = 67;
	effect.moveTo(800,200);
	effect.anim = [67,66,67,68];
	effect.scale(6,6);
	effect.tl.moveTo(0,y+12,15).and().waitUntil(function(){
		if( effect.age % 2 === 0 ){
			effect.frame = effect.anim[effect.age/2 % 4];
		}
		if(effect.x === 0){
			scene.removeChild(effect);
			return true;
		}
	})
	

	var effect2 = new Sprite(640,480);
	effect2.image = game.assets['images/effect/gamenfire.png'];
	effect2.width = 800;
	effect2.tl.waitUntil(function(){
		if( effect2.age % 2 === 0 ){
			effect2.frame = effect2.age/2 % 5;
		}
		if(effect.x === 0){
			scene.removeChild(effect2);
			return true;
		}
	});
	scene.insertBefore(effect2,chara);
	scene.insertBefore(effect,black1);

};
var eichi = function(scene,chara,black1){
	var x = chara.x;
	var y = chara.y;
	var effect = new Sprite(120,120);
	effect.image = game.assets['images/effect/eichi.png'];
	effect.opacity = 0.9;
	effect.tl.waitUntil(function(){
		if(effect.age%2 === 0){
			effect.frame = (effect.age/2)%10
		}
		if( effect.frame === 9 ){
			this.flag = false;
			scene.removeChild(effect);
			return true;
		}
	})
	effect.moveTo(x-48,y-48);
	effect.flag = true;
	scene.addChild(effect);
}
var battleBg = function(){
	var bg = new Sprite(800,448);
	var image = new Surface(2400,448);
	var tip = game.assets['images/bg/battle0.jpg'];
	for( var i = 0; i < 3; i++ ){
		image.draw(tip,0,0,800,500,800 * i,0,800,500);	
	}
	bg.image = game.assets['images/bg/battle0.jpg'];
	return bg;
};
var addplayer = function(chara,x,y){
	var player = new Sprite(32,32);
	player.anim = [
		1,0,1,2,
		4,3,4,5,
		7,6,7,8,
		10,9,10,11
	];
	player.frame = 7;
	player.dir = STAY;
	player.default_dir = player.dir;
	player.addEventListener(Event.ENTER_FRAME,function(){
		if( this.dir !== this.default_dir ){
			if(this.dir == STAY){
				this.frame = 7;
			}else{
				this.frame = this.anim[ (4*this.dir) + 1 ]
			}
			this.default_dir = this.dir;
		}
		if( this.dir !== STAY ){
			if( this.age % 10 == 0 ){
				this.frame = this.anim[(this.age/10)%4 + (4*this.dir)];
			}
		}
	});
	player.image = game.assets[chara.status.image];
	player.status = chara.status;
	player.moveTo(x,y);
	return player;
}
var addcom = function(chara,x,y){
	var player = new Sprite(32,32);
	player.anim = [
		1,0,1,2,
		4,3,4,5,
		7,6,7,8,
		10,9,10,11
	];
	player.frame = 4;
	player.dir = STAY;
	player.default_dir = player.dir;
	player.addEventListener(Event.ENTER_FRAME,function(){
		if( this.dir !== this.default_dir ){
			if(this.dir == STAY){
				this.frame = 4;
			}else{
				this.frame = this.anim[ (4*this.dir) + 1 ];
			}
			this.default_dir = this.dir;
		}
		if( this.dir !== STAY ){
			if( this.age % 10 == 0 ){
				this.frame = this.anim[(this.age/10)%4 + (4*this.dir)];
			}
		}
	});
	player.image = game.assets[chara.status.image];
	player.status = chara.status;
	player.moveTo(x,y);
	return player;
};
var addblack = function(x,y,x1,y1){
	var black = new Sprite(x1,y1);
	black.backgroundColor = 'black';
	// var image = new Surface(x1,y1);
	// image.fillRect(0,0,x1,y1);
	// black.image = image;
	black.moveTo(x,y);
	return black;
};

var addgage = function(x,y,color){
	var gage = new Sprite(x,y);
	var tip = new Surface(x,y);
	tip.setColor(color);
	tip.fillRect(0,0,x,y);
	gage.image = tip;
	return gage;
};

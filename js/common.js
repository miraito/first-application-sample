// 左メニュー背景
var bg1 = function(){
	var bg = new Sprite(128,450);
	bg.backgroundColor = 'black';
	// bg.backgroundColor = 'rgb(75,62,21)';
	// var image = new Surface(60,60);
	// var tip = game.assets['images/bg0.png'];
	// for( var i = 0; i < 128; i+=60){
	// 	for( var j = 0; j < 450; j+=60){
	// 		image.draw(tip,0,0,60,60,i,j,60,60);		
	// 	}
	// }
	// bg.image = image;
	return bg;
}
// ラベル作成
var labelBase = function(text,x,y,color){
	var label = new Label(text);
	label.color = color;
	label.font = " 14px 'ＭＳ Ｐ明朝'";
	label.moveTo(x,y);
	return label;
}
var labelBase_i = function(text,x,y,color){
	var label = new Label(text);
	label.color = color;
	label.font = "italic 14px 'ＭＳ Ｐ明朝'";
	label.moveTo(x,y);
	return label;
}
// ボタン作成
var addbutton = function(num,x,y){
	var button = new Sprite(100,30);
	button.image = game.assets['images/button/' + num + '.png'];
	//button.scale(0.5,0.5);
	button.moveTo(x,y);
	return button;
}
// キャラクター作成
var addchara = function(img){
	var chara = new Sprite(32,32);
	chara.anim = [
		1,0,1,2,
		4,3,4,5,
		7,6,7,8,
		10,9,10,11
	];
	chara.dir = STAY;
	chara.default_dir = chara.dir;
	chara.image = game.assets[img];
	chara.addEventListener(Event.ENTER_FRAME,function(){
		if( this.dir !== this.default_dir ){
			if(this.dir == STAY){
				this.frame = this.anim[ (4*this.default_dir) + 1 ];
			}else{
				this.frame = this.anim[ (4*this.dir) + 1 ];
			}
			this.default_dir = this.dir;
		}
		if( this.dir !== STAY ){
			if( this.age % 10 === 0 ){
				this.frame = this.anim[(this.age/10)%4 + (4*this.dir)];
			}
		}else{

		}
	});
	return chara;
}

// メッセージ作成
var addmsg = function(num){
	var msg = new Sprite(600,60);
	msg.image = game.assets['images/msg/msg1.png'];
	msg.frame = num;
	return msg;
}
var startmsg = function(){
	var msg = addmsg()
}

var addStatusText = function(list){
	var text = list.name + ' : ' + list.job;
	return text;
}

var addBaseMap = function(x,y){
	var map = new Sprite( x,y );
	var tip = game.assets['images/map0.png'];
	var image = new Surface(x,y);
	for(var i = 0; i < x; i += 32){
		for(var j = 0; j < y; j += 32){
			image.draw(tip,240,64,48,48,i,j,32,32);
		}
	}
	// var tip2 = game.assets['images/map0_1.png'];
	// image.draw(tip2,448,208,32,48,32*2,32*2,32,32)
	map.image = image;
	map.moveTo(0,0);
	return map;
}
var endMark = function(){
	var mark = new Sprite(16,16);
	mark.image = game.assets['images/icon0.png'];
	mark.frame = 20;
	mark.scale(0.75,0.75)
	return mark;
}
var endMark_e = function(){
	var mark = new Sprite(16,16);
	mark.image = game.assets['images/icon0.png'];
	mark.frame = 19;
	mark.scale(0.75,0.75)
	return mark;
}

var slow_message = function( label,text_base,timer ){
	var count = label.text.length;
	if( count < text_base.length ){
		label.text = text_base.substring(0,count+1);
	}else{
		clearInterval(timer);
	}
};
function get_message(label,text_base){
	var timer = setInterval(function(){slow_message(label,text_base,timer)},50);
}

var get_height_of_group = function(group){
	var check = 0;
	for( var i = 0; i < group.childNodes.length; i++){
		if( check < group.childNodes[i].y ) check = i;
	}
	var result = group.childNodes[check].y + group.childNodes[check].height;
	return result;
}
var get_width_of_group = function(group){
	var check = 0;
	for( var i = 0; i < group.childNodes.length; i++){
		if( check < group.childNodes[i].x ) check = i;
	}
	var result = group.childNodes[check].x + group.childNodes[check].width;
	return result;
}
var random = function(num){
	return Math.floor(Math.random()*num);
};
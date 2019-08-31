// 下window 背景作成
var windowBase = function(){
	var window_base = new Sprite(672,112);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(672,112);
	image.draw(tip,0,0,64,64,0,0,672,112);
	window_base.image = image;
	window_base.moveTo(128,352);
	return window_base;
};
var windowBase_b = function(){
	var window_base = new Sprite(800,112);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(800,112);
	image.draw(tip,0,0,64,64,0,0,800,112);
	window_base.image = image;
	window_base.moveTo(0,352);
	return window_base;
};
// 下window 作成
var footWindow = function(){
	var lu = new Sprite(16,16);
	lu.image = game.assets['images/frame.png'];
	lu.frame = 4;
	lu.moveTo(128,352);

	var ru = new Sprite(16,16);
	ru.image = game.assets['images/frame.png'];
	ru.frame = 7;
	ru.moveTo(784,352);

	var ld = new Sprite(16,16);
	ld.image = game.assets['images/frame.png'];
	ld.frame = 28;
	ld.moveTo(128,432);

	var rd = new Sprite(16,16);
	rd.image = game.assets['images/frame.png'];
	rd.frame = 31;
	rd.moveTo(784,432);

	var u_line = new Sprite(672,16);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(672,16);
	image.draw(tip,80,0,32,16,0,0,672,16);
	u_line.image = image;
	u_line.moveTo(128,352);

	var d_line = new Sprite(672,16);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(672,16);
	image.draw(tip,80,48,32,16,0,0,672,16);
	d_line.image = image;
	d_line.moveTo(128,432);

	var l_line = new Sprite(16,64);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(16,64);
	image.draw(tip,64,16,16,32,0,0,16,64);
	l_line.image = image;
	l_line.moveTo(128,368);

	var r_line = new Sprite(16,64);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(16,64);
	image.draw(tip,112,16,16,32,0,0,16,64);
	r_line.image = image;
	r_line.moveTo(784,368);

	var foot_window = new Group();
	foot_window.addChild(u_line);
	foot_window.addChild(d_line);
	foot_window.addChild(l_line);
	foot_window.addChild(r_line);
	foot_window.addChild(lu);
	foot_window.addChild(ru);
	foot_window.addChild(ld);
	foot_window.addChild(rd);

	return foot_window;
};
var talkWindow = function(x,y,face_image,talk_label){
	var window_base = new Sprite( x,y );
	var tip = game.assets['images/frame.png'];
	var image = new Surface(x,y);
	image.draw(tip,0,0,64,64,0,0,x,y);
	window_base.image = image;
	window_base.opacity = 0.9;

	var lu = new Sprite(16,16);
	lu.image = game.assets['images/frame.png'];
	lu.frame = 4;
	lu.moveTo(0,0);

	var ru = new Sprite(16,16);
	ru.image = game.assets['images/frame.png'];
	ru.frame = 7;
	ru.moveTo(x-16,0);

	var ld = new Sprite(16,16);
	ld.image = game.assets['images/frame.png'];
	ld.frame = 28;
	ld.moveTo(0,y-16);

	var rd = new Sprite(16,16);
	rd.image = game.assets['images/frame.png'];
	rd.frame = 31;
	rd.moveTo(x-16,y-16);

	var u_line = new Sprite(x,16);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(x,16);
	image.draw(tip,80,0,32,16,0,0,x,16);
	u_line.image = image;
	u_line.moveTo(0,0);

	var d_line = new Sprite(x,16);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(x,16);
	image.draw(tip,80,48,32,16,0,0,x,16);
	d_line.image = image;
	d_line.moveTo(0,y-16);

	var l_line = new Sprite(16,y);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(16,y);
	image.draw(tip,64,16,16,32,0,0,16,y);
	l_line.image = image;
	l_line.moveTo(0,0);

	var r_line = new Sprite(16,100);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(16,100);
	image.draw(tip,112,16,16,32,0,0,16,100);
	r_line.image = image;
	r_line.moveTo(x-16,0);

	talk_label.moveTo( 110,20 );

	var foot_window = new Group();
	foot_window.addChild(window_base);
	foot_window.addChild(face_image);
	foot_window.addChild(talk_label);
	foot_window.addChild(u_line);
	foot_window.addChild(d_line);
	foot_window.addChild(l_line);
	foot_window.addChild(r_line);
	foot_window.addChild(lu);
	foot_window.addChild(ru);
	foot_window.addChild(ld);
	foot_window.addChild(rd);

	return foot_window;
};
var battleWindow = function(scene,menu1,menu2,menu3,menu4){
	var window_base = new Sprite(100,140);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(100,140);
	var opacity = 0.9;
	image.draw(tip,0,0,64,64,0,0,100,140);
	window_base.image = image;
	window_base.opacity = opacity;
	window_base.moveTo(0,0);

	var lu = new Sprite(16,16);
	lu.image = game.assets['images/frame2.png'];
	lu.frame = 4;
	// lu.opacity = opacity;
	lu.moveTo(0,0);

	var ru = new Sprite(16,16);
	ru.image = game.assets['images/frame2.png'];
	ru.frame = 7;
	// ru.opacity = opacity;
	ru.moveTo(84,0);

	var ld = new Sprite(16,16);
	ld.image = game.assets['images/frame2.png'];
	ld.frame = 28;
	// ld.opacity = opacity;
	ld.moveTo(0,124);

	var rd = new Sprite(16,16);
	rd.image = game.assets['images/frame2.png'];
	rd.frame = 31;
	// rd.opacity = opacity;
	rd.moveTo(84,124);

	var u_line = new Sprite(100,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(672,16);
	image.draw(tip,80,0,32,16,0,0,100,16);
	u_line.image = image;
	u_line.moveTo(0,0);

	var d_line = new Sprite(100,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(672,16);
	image.draw(tip,80,48,32,16,0,0,100,16);
	d_line.image = image;
	d_line.moveTo(0,124);

	var l_line = new Sprite(16,140);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,64,16,16,32,0,0,16,140);
	l_line.image = image;
	l_line.moveTo(0,0);

	var r_line = new Sprite(16,140);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,112,16,16,32,0,0,16,140);
	r_line.image = image;
	r_line.moveTo(84,0);

	var menu = labelBase('Action',0,0);
	menu.color = 'rgb(202,204,178)';
	menu.font = "16px 'ＭＳ Ｐ明朝'";
	menu.moveTo(16,8)
	menu.opacity = 0;

	var battle_window = new Group();
	battle_window.addChild(window_base);
	battle_window.addChild(menu);
	battle_window.addChild(u_line);
	battle_window.addChild(d_line);
	battle_window.addChild(l_line);
	battle_window.addChild(r_line);
	battle_window.addChild(lu);
	battle_window.addChild(ru);
	battle_window.addChild(ld);
	battle_window.addChild(rd);

	battle_window.dir = CLOSE;
	battle_window.scaleY = 0;
	battle_window.is_menu = false;
	battle_window.addEventListener(Event.ENTER_FRAME,function(){
		if( this.dir == OPEN){
			if( this.scaleY != 1){
				if( this.scaleY < 1 ){
					this.scaleY += 0.15;
				}else if(this.scaleY >= 1){
					this.scaleY = 1;
					this.dir = WAIT;
				}	
			}else{ this.dir = WAIT; }
		}else if( this.dir == CLOSE ){
			if( this.scaleY != 0 ){
				if( this.scaleY > 0 ){
					this.scaleY -= 0.15;
				}
				if( this.scaleY < 0.2 ){
					this.scaleY = 0;
					// this.moveTo(1000,1000);
				}	
			}
		}
		if( this.scaleY === 1 ){
			if( this.is_menu === false ){
				menu1.moveTo(this.x+16,this.y+32);
				scene.insertBefore(menu1,att_window);
				if( menu2 !== '' ){
					menu2.moveTo(this.x+16,this.y+52);
					scene.insertBefore(menu2,att_window);	
				}
				if( menu3 !== '' ){
					menu3.moveTo(this.x+16,this.y+72);
					scene.insertBefore(menu3,att_window);	
				}
				if( menu4 !== '' ){
					menu4.moveTo(this.x+16,this.y+92);
					scene.insertBefore(menu4,att_window);	
				}
				menu.opacity = 1;
				//this.is_menu = true; // quest で追加したアクションでtrueにする
			}
		}else{
			menu.opacity = 0;
			scene.removeChild(menu1);
			if( menu2 !== '' ){
				scene.removeChild(menu2);
			}
			if( menu3 !== '' ){
				scene.removeChild(menu3);
			}
			if( menu4 !== '' ){
				scene.removeChild(menu4);
			}
			this.is_menu = false;
		}
	});
	return battle_window;
};
var battleWindowMini = function(scene,menu1){
	var window_base = new Sprite(100,48);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(100,48);
	var opacity = 0.9;
	image.draw(tip,0,0,64,64,0,0,100,48);
	window_base.image = image;
	window_base.opacity = opacity;
	window_base.moveTo(0,0);

	var lu = new Sprite(16,16);
	lu.image = game.assets['images/frame2.png'];
	lu.frame = 4;
	// lu.opacity = opacity;
	lu.moveTo(0,0);

	var ru = new Sprite(16,16);
	ru.image = game.assets['images/frame2.png'];
	ru.frame = 7;
	// ru.opacity = opacity;
	ru.moveTo(84,0);

	var ld = new Sprite(16,16);
	ld.image = game.assets['images/frame2.png'];
	ld.frame = 28;
	// ld.opacity = opacity;
	ld.moveTo(0,34);

	var rd = new Sprite(16,16);
	rd.image = game.assets['images/frame2.png'];
	rd.frame = 31;
	// rd.opacity = opacity;
	rd.moveTo(84,34);

	var u_line = new Sprite(100,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(100,16);
	image.draw(tip,80,0,32,16,0,0,100,16);
	u_line.image = image;
	u_line.moveTo(0,0);

	var d_line = new Sprite(100,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(100,16);
	image.draw(tip,80,48,32,16,0,0,100,16);
	d_line.image = image;
	d_line.moveTo(0,34);

	var l_line = new Sprite(16,48);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,64,16,16,32,0,0,16,48);
	l_line.image = image;
	l_line.moveTo(0,0);

	var r_line = new Sprite(16,48);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,112,16,16,32,0,0,16,48);
	r_line.image = image;
	r_line.moveTo(84,0);

	var battle_window = new Group();
	battle_window.addChild(window_base);
	battle_window.addChild(u_line);
	battle_window.addChild(d_line);
	battle_window.addChild(l_line);
	battle_window.addChild(r_line);
	battle_window.addChild(lu);
	battle_window.addChild(ru);
	battle_window.addChild(ld);
	battle_window.addChild(rd);

	battle_window.dir = CLOSE;
	battle_window.scaleY = 0;
	battle_window.addEventListener(Event.ENTER_FRAME,function(){
		if( this.dir == OPEN){
			if( this.scaleY != 1){
				if( this.scaleY < 1 ){
					this.scaleY += 0.15;
				}else if(this.scaleY >= 1){
					this.scaleY = 1;
					this.dir = WAIT;
				}	
			}else{ this.dir = WAIT; }
		}else if( this.dir == CLOSE ){
			if( this.scaleY != 0 ){
				if( this.scaleY > 0 ){
					this.scaleY -= 0.15;
				}
				if( this.scaleY < 0.2 ){
					this.scaleY = 0;
					this.moveTo(1000,1000);
				}	
			}
		}
		if( this.scaleY === 1 ){
			menu1.moveTo(this.x+16,this.y+20);
			scene.addChild(menu1);
			
		}else{
			scene.removeChild(menu1);
		}
	});
	return battle_window;
};
var ntBattleWindow = function(scene,menu){
	var h = menu.length*8 + 16*2 + (menu.length-1)*12;
	var window_base = new Sprite(180,h);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(180,h);
	var opacity = 0.9;
	image.draw(tip,0,0,64,64,0,0,180,h);
	window_base.image = image;
	window_base.opacity = opacity;
	window_base.moveTo(0,0);

	var lu = new Sprite(16,16);
	lu.image = game.assets['images/frame2.png'];
	lu.frame = 4;
	// lu.opacity = opacity;
	lu.moveTo(0,0);

	var ru = new Sprite(16,16);
	ru.image = game.assets['images/frame2.png'];
	ru.frame = 7;
	// ru.opacity = opacity;
	ru.moveTo(164,0);

	var ld = new Sprite(16,16);
	ld.image = game.assets['images/frame2.png'];
	ld.frame = 28;
	// ld.opacity = opacity;
	ld.moveTo(0,h-16);

	var rd = new Sprite(16,16);
	rd.image = game.assets['images/frame2.png'];
	rd.frame = 31;
	// rd.opacity = opacity;
	rd.moveTo(164,h-16);

	var u_line = new Sprite(180,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(180,16);
	image.draw(tip,80,0,32,16,0,0,180,16);
	u_line.image = image;
	u_line.moveTo(0,0);

	var d_line = new Sprite(180,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(180,16);
	image.draw(tip,80,48,32,16,0,0,180,16);
	d_line.image = image;
	d_line.moveTo(0,h-16);

	var l_line = new Sprite(16,h);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,64,16,16,32,0,0,16,h);
	l_line.image = image;
	l_line.moveTo(0,0);

	var r_line = new Sprite(16,h);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,112,16,16,32,0,0,16,h);
	r_line.image = image;
	r_line.moveTo(164,0);

	var battle_window = new Group();
	battle_window.addChild(window_base);
	battle_window.addChild(u_line);
	battle_window.addChild(d_line);
	battle_window.addChild(l_line);
	battle_window.addChild(r_line);
	battle_window.addChild(lu);
	battle_window.addChild(ru);
	battle_window.addChild(ld);
	battle_window.addChild(rd);

	battle_window.dir = CLOSE;
	battle_window.scaleY = 0;
	battle_window.is_menu = false;
	battle_window.addEventListener(Event.ENTER_FRAME,function(){
		if( this.dir == OPEN){
			if( this.scaleY != 1){
				if( this.scaleY < 1 ){
					this.scaleY += 0.15;
				}else if(this.scaleY >= 1){
					this.scaleY = 1;
					this.dir = WAIT;
				}	
			}else{ this.dir = WAIT; }
		}else if( this.dir == CLOSE ){
			if( this.scaleY != 0 ){
				if( this.scaleY > 0 ){
					this.scaleY -= 0.15;
				}
				if( this.scaleY < 0.2 ){
					this.scaleY = 0;
					this.moveTo(1000,1000);
				}	
			}
		}
		if( this.scaleY === 1 ){
			if( this.is_menu === false ){
				for( var i = 0; i < menu.length; i++){
					if( i === 0 ){
						menu[i].moveTo(this.x+16,this.y+16);
					}else{
						menu[i].moveTo(this.x+16,menu[i-1].y+20);
					}
					scene.addChild(menu[i]);	
				}
				this.is_menu = true;
			}
		}else{
			for( var i = 0; i < menu.length; i++){
				scene.removeChild(menu[i]);	
			}
			this.is_menu = false;
		}
	});
	return battle_window;
};
var infoWindow = function(scene,x,y,list,default_menu){
	var window_base = new Sprite(x,y);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(x,y);
	var opacity = 0.9;
	image.draw(tip,0,0,64,64,0,0,x,y);
	window_base.image = image;
	window_base.opacity = opacity;
	window_base.moveTo(0,0);

	var lu = new Sprite(16,16);
	lu.image = game.assets['images/frame2.png'];
	lu.frame = 4;
	// lu.opacity = opacity;
	lu.moveTo(0,0);

	var ru = new Sprite(16,16);
	ru.image = game.assets['images/frame2.png'];
	ru.frame = 7;
	// ru.opacity = opacity;
	ru.moveTo(x-16,0);

	var ld = new Sprite(16,16);
	ld.image = game.assets['images/frame2.png'];
	ld.frame = 28;
	// ld.opacity = opacity;
	ld.moveTo(0,y-16);

	var rd = new Sprite(16,16);
	rd.image = game.assets['images/frame2.png'];
	rd.frame = 31;
	// rd.opacity = opacity;
	rd.moveTo(x-16,y-16);

	var u_line = new Sprite(x,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(x,16);
	image.draw(tip,80,0,32,16,0,0,x,16);
	u_line.image = image;
	u_line.moveTo(0,0);

	var d_line = new Sprite(x,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(x,16);
	image.draw(tip,80,48,32,16,0,0,x,16);
	d_line.image = image;
	d_line.moveTo(0,y-16);

	var l_line = new Sprite(16,y);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,64,16,16,32,0,0,16,y);
	l_line.image = image;
	l_line.moveTo(0,0);

	var r_line = new Sprite(16,y);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,112,16,16,32,0,0,16,y);
	r_line.image = image;
	r_line.moveTo(x-16,0);

	var battle_window = new Group();
	battle_window.addChild(window_base);
	battle_window.addChild(u_line);
	battle_window.addChild(d_line);
	battle_window.addChild(l_line);
	battle_window.addChild(r_line);
	battle_window.addChild(lu);
	battle_window.addChild(ru);
	battle_window.addChild(ld);
	battle_window.addChild(rd);

	battle_window.dir = CLOSE;
	battle_window.scaleY = 0;
	battle_window.is_menu = false;
	
	battle_window.addEventListener(Event.ENTER_FRAME,function(){
		if( this.dir == OPEN){
			if( this.scaleY != 1){
				if( this.scaleY < 1 ){
					this.scaleY += 0.15;
				}else if(this.scaleY >= 1){
					this.scaleY = 1;
					this.dir = WAIT;
				}	
			}else{ this.dir = WAIT; }
		}else if( this.dir == CLOSE ){
			if( this.scaleY != 0 ){
				if( this.scaleY > 0 ){
					this.scaleY -= 0.15;
				}
				if( this.scaleY < 0.2 ){
					this.scaleY = 0;
				}	
			}
		}
		if( this.scaleY === 1 ){
			if( this.is_menu === false ){
				default_menu[0].moveTo( this.x+32,this.y+24 );
				default_menu[1].moveTo( this.x+32,this.y+64 );
				default_menu[2].moveTo( this.x+32,this.y+128 );
				for(var i = 0; i < default_menu.length; i++){
					scene.addChild(default_menu[i]);
				}
				list[0].moveTo(this.x+216,this.y+24);
				list[1].moveTo(this.x+48,this.y+96);
				list[2].moveTo(this.x+48,this.y+160);
				for( var i = 0; i < list.length; i++){
					scene.addChild(list[i]);	
				}
				this.is_list = true;
			}
		}else{
			for( var i = 0; i < list.length; i++){
				scene.removeChild(list[i]);	
			}
			for( var i = 0; i < default_menu.length; i++){
				scene.removeChild(default_menu[i]);	
			}
			this.is_menu = false;
		}
	});

	battle_window.addEventListener(Event.TOUCH_START,function(){
		if(this.dir === WAIT){
			this.dir = CLOSE;
			is_action = true;
			is_info_window = false;
		}
	});
	return battle_window;
};
var listWindow = function(scene,x,y,default_menu){
	var window_base = new Sprite(x,y);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(x,y);
	var opacity = 0.9;
	image.draw(tip,0,0,64,64,0,0,x,y);
	window_base.image = image;
	window_base.opacity = opacity;
	window_base.moveTo(0,0);

	var lu = new Sprite(16,16);
	lu.image = game.assets['images/frame2.png'];
	lu.frame = 4;
	// lu.opacity = opacity;
	lu.moveTo(0,0);

	var ru = new Sprite(16,16);
	ru.image = game.assets['images/frame2.png'];
	ru.frame = 7;
	// ru.opacity = opacity;
	ru.moveTo(x-16,0);

	var ld = new Sprite(16,16);
	ld.image = game.assets['images/frame2.png'];
	ld.frame = 28;
	// ld.opacity = opacity;
	ld.moveTo(0,y-16);

	var rd = new Sprite(16,16);
	rd.image = game.assets['images/frame2.png'];
	rd.frame = 31;
	// rd.opacity = opacity;
	rd.moveTo(x-16,y-16);

	var u_line = new Sprite(x,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(x,16);
	image.draw(tip,80,0,32,16,0,0,x,16);
	u_line.image = image;
	u_line.moveTo(0,0);

	var d_line = new Sprite(x,16);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(x,16);
	image.draw(tip,80,48,32,16,0,0,x,16);
	d_line.image = image;
	d_line.moveTo(0,y-16);

	var l_line = new Sprite(16,y);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,64,16,16,32,0,0,16,y);
	l_line.image = image;
	l_line.moveTo(0,0);

	var r_line = new Sprite(16,y);
	var tip = game.assets['images/frame2.png'];
	var image = new Surface(16,64);
	image.draw(tip,112,16,16,32,0,0,16,y);
	r_line.image = image;
	r_line.moveTo(x-16,0);

	var battle_window = new Group();
	battle_window.addChild(window_base);
	battle_window.addChild(u_line);
	battle_window.addChild(d_line);
	battle_window.addChild(l_line);
	battle_window.addChild(r_line);
	battle_window.addChild(lu);
	battle_window.addChild(ru);
	battle_window.addChild(ld);
	battle_window.addChild(rd);

	battle_window.dir = CLOSE;
	battle_window.scaleY = 0;
	battle_window.is_menu = false;

	var player_label = [];
	var enemy_label = [];
	
	
	battle_window.addEventListener(Event.ENTER_FRAME,function(){
		if( this.dir == OPEN){
			if( this.scaleY != 1){
				if( this.scaleY < 1 ){
					this.scaleY += 0.15;
				}else if(this.scaleY >= 1){
					this.scaleY = 1;
					this.dir = WAIT;
				}	
			}else{ this.dir = WAIT; }
		}else if( this.dir == CLOSE ){
			if( this.scaleY != 0 ){
				if( this.scaleY > 0 ){
					this.scaleY -= 0.15;
				}
				if( this.scaleY < 0.2 ){
					this.scaleY = 0;
				}	
			}
		}
		if( this.scaleY === 1 ){
			if( this.is_menu === false ){
				default_menu[0].moveTo( this.x+32,this.y+32 );
				default_menu[1].moveTo( this.x+32,this.y+160 );
				// default_menu[2].moveTo( this.x+32,this.y+128 );
				for( var i = 0; i < default_menu.length; i++){
					scene.addChild(default_menu[i]);
				}
				player_label = [];
				enemy_label = [];
				for( var i = 0; i < battle.chara.length; i++){
					player_label[i] = labelBase(battle.chara[i].status.name,0,0);
					var check = true;
					for( var j = 0; j < arrange.dead.p.length; j++){
						if( battle.chara[i].number === arrange.dead.p[j] ){
							check = false;
							break;
						}
					}
					if(check){
						player_label[i].color = 'whitesmoke';
					}else{
						player_label[i].color = 'rgb(51,51,51)';	
					}
					player_label[i].moveTo(this.x + 32 + (104 * (i%5)),this.y+64+(32*Math.floor(i/5)));
					scene.addChild(player_label[i]);
				}
				for( var i = 0; i < battle.enemy.length; i++){
					enemy_label[i] = labelBase(battle.enemy[i].status.name,0,0);
					var check = true;
					for( var j = 0; j < arrange.dead.e.length; j++){
						if( battle.enemy[i].number === arrange.dead.e[j] ){
							check = false;
							break;
						}
					}
					if(check){
						enemy_label[i].color = 'whitesmoke';
					}else{
						enemy_label[i].color = 'rgb(51,51,51)';	
					}
					enemy_label[i].moveTo(this.x + 32 + (104 * (i%5)),this.y+192+(32*Math.floor(i/5)));
					scene.addChild(enemy_label[i]);
				}
				this.is_menu = true;
			}
		}else{
			for( var i = 0; i < default_menu.length; i++){
				scene.removeChild(default_menu[i]);	
			}
			for( var i = 0; i < player_label.length; i++){
				scene.removeChild(player_label[i]);
			}
			for( var i = 0; i < enemy_label.length; i++){
				scene.removeChild(enemy_label[i]);
			}
			this.is_menu = false;
		}
	});

	battle_window.addEventListener(Event.TOUCH_START,function(){
		if(this.dir === WAIT){
			this.dir = CLOSE;
			is_action = true;
			is_info_window = false;
		}
	});
	return battle_window;
};


// var s_window = function(scene,x,y){
// 	var window_base = new Sprite(x,y);
// 	var tip = game.assets['images/frame2.png'];
// 	var image = new Surface(x,y);
// 	var opacity = 0.9;
// 	image.draw(tip,0,0,64,64,0,0,x,y);
// 	window_base.image = image;
// 	window_base.opacity = opacity;
// 	window_base.moveTo(0,0);

// 	var lu = new Sprite(16,16);
// 	lu.image = game.assets['images/frame2.png'];
// 	lu.frame = 4;
// 	// lu.opacity = opacity;
// 	lu.moveTo(0,0);

// 	var ru = new Sprite(16,16);
// 	ru.image = game.assets['images/frame2.png'];
// 	ru.frame = 7;
// 	// ru.opacity = opacity;
// 	ru.moveTo(x-16,0);

// 	var ld = new Sprite(16,16);
// 	ld.image = game.assets['images/frame2.png'];
// 	ld.frame = 28;
// 	// ld.opacity = opacity;
// 	ld.moveTo(0,y-16);

// 	var rd = new Sprite(16,16);
// 	rd.image = game.assets['images/frame2.png'];
// 	rd.frame = 31;
// 	// rd.opacity = opacity;
// 	rd.moveTo(x-16,y-16);

// 	var u_line = new Sprite(x,16);
// 	var tip = game.assets['images/frame2.png'];
// 	var image = new Surface(x,16);
// 	image.draw(tip,80,0,32,16,0,0,x,16);
// 	u_line.image = image;
// 	u_line.moveTo(0,0);

// 	var d_line = new Sprite(x,16);
// 	var tip = game.assets['images/frame2.png'];
// 	var image = new Surface(x,16);
// 	image.draw(tip,80,48,32,16,0,0,x,16);
// 	d_line.image = image;
// 	d_line.moveTo(0,y-16);

// 	var l_line = new Sprite(16,y);
// 	var tip = game.assets['images/frame2.png'];
// 	var image = new Surface(16,64);
// 	image.draw(tip,64,16,16,32,0,0,16,y);
// 	l_line.image = image;
// 	l_line.moveTo(0,0);

// 	var r_line = new Sprite(16,y);
// 	var tip = game.assets['images/frame2.png'];
// 	var image = new Surface(16,64);
// 	image.draw(tip,112,16,16,32,0,0,16,y);
// 	r_line.image = image;
// 	r_line.moveTo(x-16,0);

// 	var battle_window = new Group();
// 	battle_window.addChild(window_base);
// 	battle_window.addChild(u_line);
// 	battle_window.addChild(d_line);
// 	battle_window.addChild(l_line);
// 	battle_window.addChild(r_line);
// 	battle_window.addChild(lu);
// 	battle_window.addChild(ru);
// 	battle_window.addChild(ld);
// 	battle_window.addChild(rd);

// 	battle_window.dir = OPEN;
// 	battle_window.scaleY = 0;
// 	battle_window.is_menu = false;
// 	battle_window.addEventListener(Event.ENTER_FRAME,function(){
// 		if( this.dir == OPEN){
// 			if( this.scaleY != 1){
// 				if( this.scaleY < 1 ){
// 					this.scaleY += 0.15;
// 				}else if(this.scaleY >= 1){
// 					this.scaleY = 1;
// 					this.dir = WAIT;
// 				}	
// 			}else{ this.dir = WAIT; }
// 		}else if( this.dir == CLOSE ){
// 			if( this.scaleY != 0 ){
// 				if( this.scaleY > 0 ){
// 					this.scaleY -= 0.15;
// 				}
// 				if( this.scaleY < 0.2 ){
// 					this.scaleY = 0;
// 				}	
// 			}
// 		}
// 		if( this.scaleY === 1 ){
// 			if( this.is_menu === false ){	
// 				this.is_menu = true;
// 			}
// 		}else{
// 			this.is_menu = false;
// 		}
// 	});
// 	battle_window.addEventListener(Event.TOUCH_START,function(){
// 		if(this.dir === WAIT){
// 			this.dir = CLOSE;
// 		}
// 	});
// 	return battle_window;
// }
var removeWindow = function(e,battle_window,item_window){
	var is_chara = false;
	for(var i = 0; i < battle.chara.length; i++){
		if( (battle.chara[i].x <= e.x && e.x <= battle.chara[i].x+32) &&
		(battle.chara[i].y <= e.y && e.y <= battle.chara[i].y+32) ){
			is_chara = true;
			break;
		}
	}
	// if( is_chara === true ){
	// 	if( item_window.dir === OPEN ){
	// 		item_window.dir = CLOSE;
	// 	}
	// }

	var b_height = get_height_of_group(battle_window);
	var b_width = get_width_of_group(battle_window);
	if((battle_window.x <= e.x && e.x <= battle_window.x+b_height) && 
		(battle_window.y <= e.y && e.y <= battle_window.y+b_width)){
		is_chara = true;
	}
	if( !is_chara ){
		if( att_window.dir !== CLOSE ){
			if( (att_window.x <= e.x && e.x <= att_window.x+180) && 
				(att_window.y <= e.y && e.y <= att_window.y+180) ){
				is_chara = true;
			}	
		}
	}
	if( moveend_window.dir === WAIT ){
		var m_height = get_height_of_group(moveend_window);
		var m_width = get_width_of_group(moveend_window);
		if( (moveend_window.x <= e.x && e.x <= moveend_window.x+m_height) && 
			(moveend_window.y <= e.y && e.y <= moveend_window.y+m_width) ){
			is_chara = true;
		}
	}
	if( item_window.dir === WAIT ){
		var i_height = get_height_of_group(item_window);
		var i_width = get_width_of_group(item_window);
		if( (item_window.x <= e.x && e.x <= item_window.x+i_width) &&
			(item_window.y <= e.y && e.y <= item_window.y+i_height) ){
			is_chara = true;
		}
	}
	// キャラ、window 上以外をクリックならwindow を消去
	if( !is_chara ){
		battle_window.dir = CLOSE;
		if( att_window.dir !== CLOSE ){
			att_window.dir = CLOSE;	
		}
		if( item_window.dir !== CLOSE ){
			item_window.dir = CLOSE;
		}
	}
	return is_chara;
};


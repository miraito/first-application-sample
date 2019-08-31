var setLocation = function(){
	for(var i = 0; i < arrange.battlemap.length; i++){
		for(var j = 0; j < arrange.battlemap[i].length; j++){
			for(var k = 0; k < battle.chara.length; k++){
				// 味方キャラ位置登録
				if((arrange.battlemap[i][j].x === battle.chara[k].x) && 
					(arrange.battlemap[i][j].y === battle.chara[k].y)){
					arrange.chara[i][j] = battle.chara[k].number;
					arrange.detect[i][j] = 1;
				}
			}
			for(var l = 0; l < battle.enemy.length; l++){
				// 敵キャラ位置登録
				if((arrange.battlemap[i][j].x === battle.enemy[l].x) && 
					(arrange.battlemap[i][j].y === battle.enemy[l].y)){
					arrange.enemy[i][j] = battle.enemy[l].number;
					arrange.detect[i][j] = 2;
				}
			}
		}
	}
};

var phaseBg = function(){
	var phase_bg = new Group();

	var bgbg = new Sprite(112,36);
	bgbg.backgroundColor = 'olive';
	bgbg.moveTo(0,0);

	phase_bg.addChild(bgbg);

	var bg = new Sprite(110,34);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(110,34);
	image.draw( tip,0,0,64,64,0,0,110,34 );
	bg.image = image;
	bg.moveTo(1,1);

	phase_bg.addChild(bg);
	phase_bg.moveTo(8,40);
	return phase_bg;
};
var menuBg = function(){
	var menu_bg = new Group();
	
	var bgbg = new Sprite(112,150);
	bgbg.backgroundColor = 'olive';
	bgbg.moveTo(0,0);

	menu_bg.addChild(bgbg);

	var bg = new Sprite(110,148);
	var tip = game.assets['images/frame.png'];
	var image = new Surface(110,198);
	image.draw( tip,0,0,64,64,0,0,110,198 );
	bg.image = image;
	bg.moveTo(1,1);

	menu_bg.addChild(bg);
	menu_bg.moveTo(8,290)	
	return menu_bg;
};

var add_triangle = function(list){
	var triangle = new Array();
	var triangle_line = new Group();
	for( var i = 0; i < list.length; i++ ){
		triangle[i] = new Sprite(16,16);
		var image = new Surface(16,16);
		if( list[i] === 'p' ){
			var tip = game.assets['images/icon/triangle_blue.gif'];
		}else if( list[i] === 'e' ){
			var tip = game.assets['images/icon/triangle_red.gif'];
		}
		image.draw(tip,0,0,11,11,0,0,16,16);
		triangle[i].image = image;
		triangle[i].moveTo(0,24*i);
		//triangle_line.addChild(triangle[i]);
	}
	return triangle;
};
var add_triangle_line = function( triangle_line,triangle){
	for( var i = 0; i < 6; i++ ){
		if( i <= triangle.length-1 ){
			triangle_line.addChild(triangle[i]);
		}else{
			break;
		}
	}
	triangle_line.moveTo(40,113);
	triangle_line.defaultY = triangle_line.y;
	triangle_line.flag = false;
	triangle_line.addEventListener(Event.ENTER_FRAME,function(){
		this.toY = this.defaultY-performed*24;
		if( this.toY < this.y ){
			if( this.flag === false ){
				this.removeChild(triangle[performed-1]);
				if( triangle.length-1 >= performed+5 ){
					this.addChild(triangle[performed+5])	
				}
				this.flag = true;
			}
			this.y -= 2;	
		}else{
			if(this.flag === true)this.flag = false;
		}
	});
	return triangle_line;
};
var endSet = function(scene,chara,bg){
	// まずはキャラ位置情報と衝突情報を消す。
	for( var i = 0; i < arrange.chara.length; i++ ){
		for( var j = 0; j < arrange.chara[i].length; j++ ){
			if( arrange.chara[i][j] === select_chara){
				arrange.chara[i][j] = 0;
				arrange.detect[i][j] = 0;
			}
		}
	}
	// 次に位置情報と衝突情報追加
	for( var i = 0; i < arrange.battlemap.length; i++ ){
		for( var j = 0; j < arrange.battlemap[i].length; j++ ){
			if( chara.x === arrange.battlemap[i][j].x && chara.y === arrange.battlemap[i][j].y ){
				arrange.chara[i][j] = chara.number;
				arrange.detect[i][j] = 1;
			}
		}
	}
	//endマーク出す (キャラのインデックス番号と対応)
	for( var i = 0; i < battle.chara.length; i++ ){
		if(battle.chara[i].number === chara.number){
			end_mark[i] = endMark();
			end_mark[i].moveTo(chara.x+18,chara.y+18);
			scene.insertBefore(end_mark[i],bg);
		}
	}
	is_action = false;
	chara.opacity = 0.8;
	chara.acted = true;
	performed++;　// 行動済み人数を足す
};
var endSet_e = function(scene,enemy,bg){
	// まずはキャラ位置情報と衝突情報を消す。
	for( var i = 0; i < arrange.enemy.length; i++ ){
		for( var j = 0; j < arrange.enemy[i].length; j++ ){
			if( arrange.enemy[i][j] === enemy.number){
				arrange.enemy[i][j] = 0;
				arrange.detect[i][j] = 0;
			}
		}
	}
	// 次に位置情報と衝突情報追加
	for( var i = 0; i < arrange.battlemap.length; i++ ){
		for( var j = 0; j < arrange.battlemap[i].length; j++ ){
			if( enemy.x === arrange.battlemap[i][j].x && enemy.y === arrange.battlemap[i][j].y ){
				arrange.enemy[i][j] = enemy.number;
				arrange.detect[i][j] = 2;
			}
		}
	}
	// エンドマーク出す
	for( var i = 0; i < battle.enemy.length; i++ ){
		if(battle.enemy[i].number === enemy.number){
			end_mark_e[i] = endMark_e();
			end_mark_e[i].moveTo(enemy.x+18,enemy.y+18);
			scene.insertBefore(end_mark_e[i],bg);
		}
	}
	enemy.opacity = 0.8;
	enemy.on = false;
	performed++;　// 行動済み人数を足す
	act_enemy++; // 行動予定敵キャラを次へ
};
var turnOrder = function(p,e){
	var order = new Array();
	var sum = p + e;
	if( p == e){
		for(var i = 0; i < sum; i++){
			if( i % 2 == 0 ){
				order[i] = 'p';
			}else{
				order[i] = 'e';
			}
		}
		return order;
	}else if( p < e ){
		var more = e;
		var more_name = 'e';
		var less = p;
		var less_name = 'p';
	}else{
		var more = p;
		var more_name = 'p';
		var less = e;
		var less_name = 'e';
	}
	
	var a = Math.floor(more / (less+1));
	var b = more - (a * ( less+1 ));
	var count = 0;
	label1: while( count < sum ){
		for(var i = 0; i < a; i++){
			order[count] = more_name;
			if((count+1) == sum){
				break label1;
			}
			count++;
		}
		if( b > 0 ){
			order[count] = more_name;
			if((count+1) == sum) break;
			count++;
			b--;
		}
		order[count] = less_name;
		count++;
	}
	return order;
};
var playerTurn = function( str ){
	if( str == 'p' ){
		return true;
	}else{
		return false;
	}
};

var addicon_arm = function(){
	var icon = new Sprite(15,15)
	var tip = game.assets['images/icon/arm.png'];
	var image = new Surface(15,15);
	image.draw(tip,0,0,20,20,0,0,15,15);
	icon.image = image;
	icon.moveTo(128+96+32+150+16,448-96+16);
	return icon;
}
var addicon_shield = function(){
	var icon = new Sprite(15,15)
	var tip = game.assets['images/icon/shield.png'];
	var image = new Surface(15,15);
	image.draw(tip,0,0,20,20,0,0,15,15);
	icon.image = image;
	icon.moveTo(128+96+32+150+16,448-96+48);
	return icon;
}
var phase_p = function(){
	var logo = new Sprite(48,25);
	logo.image = game.assets['images/text/player.png'];
	return logo;
}
var phase_e = function(){
	var logo = new Sprite(55,25);
	logo.image = game.assets['images/text/enemy.png'];
	return logo;
}
var addQuestMenu_1 = function(){
	var logo = new Sprite(69,21);
	logo.image = game.assets['images/text/q_info.png'];
	logo.addEventListener(Event.TOUCH_START,function(){
		if(battle.view === 5){
			if( menu1_window.dir === CLOSE ){
				if(is_moveend_window === false && is_info_window === false){
					menu1_window.dir = OPEN;
					is_action = false;
					is_info_window = true;
				}
			}else if( menu1_window.dir === WAIT){
				menu1_window.dir = CLOSE;
				is_action = true;
				is_info_window = false;
			}

		}
	});
	return logo;
};
var addQuestMenu_2 = function(scene){
	var logo = new Sprite(63,17);
	logo.image = game.assets['images/text/unit_list.png'];
	logo.addEventListener(Event.TOUCH_START,function(){
		if(battle.view === 5){
			if( menu2_window.dir === CLOSE ){
				if(is_moveend_window === false && is_info_window === false){
					scene.addChild(menu2_window);
					menu2_window.dir = OPEN;
					is_action = false;
					is_info_window = true;
				}
			}else if( menu2_window.dir === WAIT){
				menu2_window.dir = CLOSE;
				is_action = true;
				is_info_window = false;
			}

		}
	});
	return logo;
};
var addStatusMenu = function(){
	var image = new Sprite(96,96);

}
var addStart = function(){
	var logo = new Sprite(45,19);
	logo.image = game.assets['images/text/start.png'];
	logo.opacity = 0.5;
	return logo;
};
var toEpilogue = function(scene){
	var black = new Sprite(800,224);
	black.backgroundColor = 'black';
	black.moveTo(0,-224);
	var black2 = new Sprite(800,224);
	black2.moveTo(0,448);
	black2.backgroundColor = 'black';

	scene.addChild(black);
	scene.addChild(black2);

	var epilogue_message = epilogueMessage();
	epilogue_message.moveTo(361,208);

	scene.tl.then(function(){
		black.tl.moveTo(0,0,12);
		black2.tl.moveTo(0,224,12);
	})
	.waitUntil(function(){if(black.y === 0)return true})
	.delay(10)
	.then(function(){scene.addChild(epilogue_message);})
	.then(function(){
		epilogue_message.tl
		.scaleTo(1,0,4)
		.scaleTo(1,1,4)
		.scaleTo(1,0,4)
		.scaleTo(1,1,4)
		.delay(10)
		.moveTo(720,10,20);
	})
	.waitUntil(function(){if( epilogue_message.x === 720 )return true;})
	.delay(10)
	.then(function(){game.pushScene(add_epilogue_1())});// TODO 汎用性まだなし
}
var gameOver = function(scene){
	var white = new Sprite(800,448);
	white.backgroundColor = 'white';
	white.opacity = 0;
	scene.addChild(white);
	white.tl.fadeIn(90);
	var logo = new Sprite(238,69);
	logo.image = game.assets['images/text/gameover.png'];
	logo.opacity = 0;
	logo.moveTo(281,189);
	scene.addChild(logo);
	logo.tl.fadeIn(90).delay(150).then(function(){
		game.pushScene(addMenuScene());
	});

}
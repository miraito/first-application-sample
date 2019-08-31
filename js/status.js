var statusWindow = function(scene,x,y){
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
	battle_window.moveTo(100,24);
	var layoutX = [
			battle_window.x+16,
			battle_window.x+16+96+16,
			battle_window.x+16+96+48,
			battle_window.x+16+96+166+48,
			battle_window.x+16+96+166+80,
			battle_window.x+504+48,
			battle_window.x+300+16,
			battle_window.x+16+75,
			battle_window.x+150+16,
			battle_window.x+150+16+75,
		]
	var layoutY = [
			battle_window.y+16,
			battle_window.y+16+32,
			battle_window.y+16+64,
			battle_window.y+16+80,
			battle_window.y+16+96+16,
			battle_window.y+16+96+48,
			battle_window.y+16+96+80,
			battle_window.y+16+96+112,
			battle_window.y+16+96+144,
			battle_window.y+16+96+176,
			battle_window.y+16+96+208,
		]
	battle_window.info_materials = {
		name :  '',
		job :  '',
		arm : '',
		shield : '',
		att : '',
		def : '',
		int : '',
		move : '',
		speed : '',
		hp : '',
		maxhp : '',
		arm_result : ''
	}
	battle_window.info_parts = {
		hp : battle_window.info_materials.hp,
		maxhp : battle_window.info_materials.maxhp,
		arm_result : battle_window.info_materials.arm_result,
		icon_0 : addicon_arm(),
		icon_1 : addicon_shield()
	}
	battle_window.info_parts.icon_0.moveTo(layoutX[3],layoutY[0]);
	battle_window.info_parts.icon_1.moveTo(layoutX[3],layoutY[1]);
	battle_window.info_label = {
		name :  labelBase(battle_window.info_materials.name,layoutX[1],layoutY[0],'whitesmoke'),
		job :  labelBase(battle_window.info_materials.job,layoutX[1],layoutY[1],'whitesmoke'),
		arm : labelBase(battle_window.info_materials.arm,layoutX[4],layoutY[0],'whitesmoke'),
		arm_result : labelBase(' + '+battle_window.info_parts.arm_result ,layoutX[5],layoutY[0],'cyan'),
		shield : labelBase(battle_window.info_materials.shield,layoutX[4],layoutY[1],'whitesmoke'),
		title_1 : labelBase('ステータス',layoutX[0],layoutY[4],'gold'),
		title_2 : labelBase('アイテム',layoutX[6],layoutY[4],'gold'),
		title_3 : labelBase('スキル',layoutX[0],layoutY[9],'gold'),
		hp_b : labelBase_i('hp',layoutX[1]+1,layoutY[3],'rgb(25,25,25)'),
		hp_l : labelBase_i('hp',layoutX[1],layoutY[3],'darkorange'),
		hp : labelBase(battle_window.info_parts.hp + ' / ' + battle_window.info_parts.maxhp,layoutX[2],layoutY[3],'whitesmoke'), 
		att_b : labelBase_i('att',layoutX[0]+1,layoutY[5],'rgb(25,25,25)'),
		att_l : labelBase_i('att',layoutX[0],layoutY[5],'darkorange'),
		att : labelBase(battle_window.info_materials.att,layoutX[7],layoutY[5],'whitesmoke'),
		def_b : labelBase_i('def',layoutX[0]+1,layoutY[6],'rgb(25,25,25)'),
		def_l : labelBase_i('def',layoutX[0],layoutY[6],'darkorange'),
		def : labelBase(battle_window.info_materials.def,layoutX[7],layoutY[6],'whitesmoke'),
		int_b : labelBase_i('int',layoutX[0]+1,layoutY[7],'rgb(25,25,25)'),
		int_l : labelBase_i('int',layoutX[0],layoutY[7],'darkorange'),
		int : labelBase(battle_window.info_materials.int,layoutX[7],layoutY[7],'whitesmoke'),
		move_b : labelBase_i('move',layoutX[0]+1,layoutY[8],'rgb(25,25,25)'),
		move_l : labelBase_i('move',layoutX[0],layoutY[8],'darkorange'),
		move : labelBase(battle_window.info_materials.move,layoutX[7],layoutY[8],'whitesmoke'),
		speed_b : labelBase_i('speed',layoutX[8]+1,layoutY[5],'rgb(25,25,25)'),
		speed_l : labelBase_i('speed',layoutX[8],layoutY[5],'darkorange'),
		speed : labelBase(battle_window.info_materials.speed,layoutX[9],layoutY[5],'whitesmoke'),
		item : [],
		skill : [],
		explanation : [],
		close : labelBase('閉じる',layoutX[5],layoutY[10]+56,'yellow')

	};
	for( var i = 0; i < 8; i++){
		battle_window.info_label.item[i] = labelBase('',layoutX[6]+(134*(i%2)) ,layoutY[5]+(32*Math.floor(i/2)),'whitesmoke' );
	}
	for( var i = 0; i < 3; i++ ){
		battle_window.info_label.skill[i] = labelBase( '',layoutX[0],layoutY[10]+(24*i),'cyan');
	}
	for( var i = 0; i < 3; i++ ){
		battle_window.info_label.explanation[i] = labelBase('',layoutX[8],layoutY[10]+(24*i),'whitesmoke');
		battle_window.info_label.explanation[i].width = 472;
	}
	battle_window.gage = {
			base : addgage( 152,11,'darkgoldenrod' ),
			red : addgage( 150,9,'rgb(255,0,51)' ),
			life : addgage( 150,9,'rgb(0,153,102)')
		}
	battle_window.gage.base.moveTo(layoutX[1],layoutY[2]);
	battle_window.gage.red.moveTo(layoutX[1]+1,layoutY[2]+1);
	battle_window.gage.life.moveTo(layoutX[1]+1,layoutY[2]+1);

	battle_window.face_image = new Sprite(96,96);

	battle_window.face_image.moveTo(layoutX[0],layoutY[0]);
	battle_window.face_image.image = '';
	battle_window.info_label.close.addEventListener(Event.TOUCH_START,function(){
		if(battle_window.dir === WAIT){
			battle_window.dir = CLOSE;
			is_action = true;
			is_info_window = false;
		}
	});


	
	
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
				for( var i = 0; i < battle_window.info_label.item.length; i++){
					scene.addChild(battle_window.info_label.item[i]);
				}
				for( var i = 0; i < battle_window.info_label.skill.length; i++){
					scene.addChild(battle_window.info_label.skill[i]);
				}
				for( var i = 0; i < battle_window.info_label.explanation.length; i++){
					scene.addChild(battle_window.info_label.explanation[i]);
				}
				scene.addChild(this.face_image);
				scene.addChild(this.info_parts.icon_0);
				scene.addChild(this.info_parts.icon_1);
				scene.addChild(this.gage.base);
				scene.addChild(this.gage.red);
				scene.addChild(this.gage.life);
				scene.addChild(this.info_label.name);
				scene.addChild(this.info_label.job);
				scene.addChild(this.info_label.arm);
				scene.addChild(this.info_label.arm_result);
				scene.addChild(this.info_label.shield);
				scene.addChild(this.info_label.title_1);
				scene.addChild(this.info_label.title_2);
				scene.addChild(this.info_label.title_3);
				scene.addChild(this.info_label.hp_b);
				scene.addChild(this.info_label.hp_l);
				scene.addChild(this.info_label.hp);
				scene.addChild(this.info_label.att_b);
				scene.addChild(this.info_label.att_l);
				scene.addChild(this.info_label.att);
				scene.addChild(this.info_label.def_b);
				scene.addChild(this.info_label.def_l);
				scene.addChild(this.info_label.def);
				scene.addChild(this.info_label.int_b);
				scene.addChild(this.info_label.int_l);
				scene.addChild(this.info_label.int);
				scene.addChild(this.info_label.move_b);
				scene.addChild(this.info_label.move_l);
				scene.addChild(this.info_label.move);
				scene.addChild(this.info_label.speed_b);
				scene.addChild(this.info_label.speed_l);
				scene.addChild(this.info_label.speed);			
				scene.addChild(this.info_label.close);			
				this.is_menu = true;
			}
		}else{
			for( var i = 0; i < battle_window.info_label.item.length; i++){
				scene.removeChild(battle_window.info_label.item[i]);
			}
			for( var i = 0; i < battle_window.info_label.skill.length; i++){
				scene.removeChild(battle_window.info_label.skill[i]);
			}
			for( var i = 0; i < battle_window.info_label.explanation.length; i++){
				scene.removeChild(battle_window.info_label.explanation[i]);
			}
			scene.removeChild(this.face_image);
			scene.removeChild(this.info_parts.icon_0);
			scene.removeChild(this.info_parts.icon_1);
			scene.removeChild(this.gage.base);
			scene.removeChild(this.gage.red);
			scene.removeChild(this.gage.life);
			scene.removeChild(this.info_label.name);
			scene.removeChild(this.info_label.job);
			scene.removeChild(this.info_label.arm);
			scene.removeChild(this.info_label.arm_result);
			scene.removeChild(this.info_label.shield);
			scene.removeChild(this.info_label.title_1);
			scene.removeChild(this.info_label.title_2);
			scene.removeChild(this.info_label.title_3);
			scene.removeChild(this.info_label.hp_b);
			scene.removeChild(this.info_label.hp_l);
			scene.removeChild(this.info_label.hp);
			scene.removeChild(this.info_label.att_b);
			scene.removeChild(this.info_label.att_l);
			scene.removeChild(this.info_label.att);
			scene.removeChild(this.info_label.def_b);
			scene.removeChild(this.info_label.def_l);
			scene.removeChild(this.info_label.def);
			scene.removeChild(this.info_label.int_b);
			scene.removeChild(this.info_label.int_l);
			scene.removeChild(this.info_label.int);
			scene.removeChild(this.info_label.move_b);
			scene.removeChild(this.info_label.move_l);
			scene.removeChild(this.info_label.move);
			scene.removeChild(this.info_label.speed_b);
			scene.removeChild(this.info_label.speed_l);
			scene.removeChild(this.info_label.speed);
			scene.removeChild(this.info_label.close);
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

var statusSet = function(chara){
	var arm_result = get_arm_att(chara.status.equip.arm);
	var skill_explanation = new Array();
	for(var i = 0; i < chara.status.skill.length; i++){
		skill_explanation[i] = get_explanation_by_name(chara.status.skill[i]);
	}

	status_window.info_label.name.text = chara.status.name;
	status_window.info_label.job.text = chara.status.job;
	status_window.info_label.arm.text = chara.status.equip.arm;
	status_window.info_label.arm_result.text = '＋ '+arm_result;
	status_window.info_label.shield.text = chara.status.equip.shield;
	status_window.info_label.att.text = chara.status.att;
	status_window.info_label.def.text = chara.status.def;
	status_window.info_label.int.text = chara.status.int;
	status_window.info_label.move.text = chara.status.move;
	status_window.info_label.speed.text = chara.status.speed;
	status_window.info_label.hp.text = chara.status.hp + ' / ' + chara.status.maxhp;
	status_window.gage.life.width = Math.floor(150 * chara.status.hp/chara.status.maxhp);
	status_window.face_image.image = game.assets[chara.status.window_image];
	for(var i = 0; i < status_window.info_label.item.length; i++){
		if( i < chara.status.items.items.length){
			status_window.info_label.item[i].text = chara.status.items.items[i];
		}else{
			status_window.info_label.item[i].text = '';
		}
	}
	for( var i = 0; i < status_window.info_label.skill.length; i++){
		if( i < chara.status.skill.length ){
			status_window.info_label.skill[i].text = chara.status.skill[i];
		}else{
			status_window.info_label.skill[i].text = '';
		}
	}
	for( var i = 0; i < status_window.info_label.explanation.length; i++){
		if( i < skill_explanation.length ){
			status_window.info_label.explanation[i].text = skill_explanation[i];
		}else{
			status_window.info_label.explanation[i].text = '';
		}
	}
	
}
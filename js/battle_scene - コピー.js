var addbattleScene = function(chara,enemy){
	var scene = new Scene();
	scene.backgroundColor = 'black';
	// 背景画像
	var bg = battleBg();
	bg.scaleY = 0.75;
	bg.moveTo(128,0);
	scene.addChild(bg);

	// メモ フィールド->544 真ん中->372 並びで中央->328,424
	var CENTER = 372;
	var C_LEFT = 328;
	var C_RIGHT = 424;

	// バトル用クローン作成（player）
	var player = addplayer(chara,CENTER,232);
	player.scale(1.5,1.5);
	// バトル用クローン作成（com）
	var com = addcom(enemy,680,232);
	com.scale(1.5,1.5);
	var window_base = windowBase_b();

	// 周り黒背景
	var black1 = addblack( 0,0,128,448 );
	var black2 = addblack( 672,0,128,448 );
	var black3 = addblack( 0,0,800,224 );
	var black4 = addblack( 0,208,800,208 );

	// キャラの名前
	var name = labelBase( player.status.name,0,-100,'cyan' );
	// 敵の名前
	var e_name = labelBase( com.status.name,0,-100,'yellow' );
	// 攻撃名
	var attack_name = player.status.attack_name;
	// 繋ぎ文章１
	var battle_text1 = labelBase('',0,0,'whitesmoke')
	// 繋ぎ文章２
	var battle_text2 = labelBase('',0,0,'whitesmoke')


	// scene.addChild(player);
	// scene.addChild(com);

	// scene.addChild(black1);
	// scene.addChild(black2);
	// scene.addChild(black3);
	// scene.addChild(black4);

	// scene.addChild(battle_text1);
	// scene.addChild(battle_text2);
	// scene.addChild(name);
	// scene.addChild(e_name);

	// player ライフゲージ
	var gage_base1 = addgage( 154,13,'rgb(51,51,51)' );
	gage_base1.moveTo(198,58);
	scene.addChild(gage_base1);
	var life_gage = addgage( 150,9,'rgb(255,0,51)' );
	life_gage.moveTo(200,60);
	scene.addChild(life_gage);
	var life = addgage( 150,9,'rgb(0,153,102)' );
	life.moveTo(200,60);
	scene.addChild(life);

	var maxhp = player.status.maxhp;
	var starthp = player.status.hp;
	var hp = starthp;
	life.addEventListener(Event.ENTER_FRAME,function(){
		if( this.width > 0 ){
			this.width = Math.floor(150 * starthp/maxhp);
		}else{
			this.width = 0;
		}
		if( starthp !== hp ){
			if( starthp > 0 )starthp--;
		}
	});
	// ゲージラベル
	var hp_t = starthp + ' / ' + maxhp;
	var hplabel = labelBase(starthp,275,40,'whitesmoke');
	hplabel.addEventListener(Event.ENTER_FRAME,function(){
		this.text = starthp + ' / ' + maxhp;
	});
	scene.addChild(hplabel);
	// ゲージネーム
	var gage_name_label = labelBase( player.status.name,200,40,'whitesmoke' );
	scene.addChild(gage_name_label);


	// enemy ライフゲージ
	var gage_base_e = addgage( 154,13,'rgb(51,51,51)' );
	gage_base_e.moveTo(446,58);
	scene.addChild(gage_base_e);
	var life_gage_e = addgage( 150,9,'rgb(255,0,51)' );
	life_gage_e.moveTo(448,60);
	scene.addChild(life_gage_e);
	var life_e = addgage( 150,9,'rgb(0,153,102)' );
	life_e.moveTo(448,60);
	scene.addChild(life_e);
	var maxhp_e = com.status.maxhp;
	var starthp_e = com.status.hp;
	var hp_e = starthp_e;
	life_e.addEventListener(Event.ENTER_FRAME,function(){
		if( this.width > 0 ){
			this.width = Math.floor(150 * starthp_e/maxhp_e);
		}else{
			this.width = 0;
		}
		if( starthp_e !== hp_e ){
			if( starthp_e > 0 )starthp_e--;
		}
	});

	// ゲージラベル
	var hp_t_e = starthp_e + ' / ' + maxhp_e;
	var hplabel_e = labelBase(starthp_e,523,40,'whitesmoke');
	hplabel_e.addEventListener(Event.ENTER_FRAME,function(){
		this.text = starthp_e + ' / ' + maxhp_e;
	});
	scene.addChild(hplabel_e);
	// ゲージネーム
	var gage_name_label_e = labelBase( com.status.name,448,40 ,'whitesmoke');
	scene.addChild(gage_name_label_e);


//====================================戦闘計算開始
	// 攻撃に必要な物準備
	var att_elements = {
		hit : 50,
		critical_base : 0,
		critical_pulus : 0,
		times : 1,
		scale : 1,
	}
	var def_elements = {
		hit : 50,
		critical_base : 0,
		critical_pulus : 0,
		times : 1,
		scale : 1,
	}



	// 攻撃、防御共にスキルがあるかチェック
	var att_skill = new Array();
	var def_skill = new Array();
	att_skill = attSkillCheck(chara);
	def_skill = defSkillCheck(enemy);




	// player 武器タイプ識別
	var type = get_type_by_name(player.status.equip.arm);
	// effect タイプ識別
	var effect_no = get_effect_by_name(player.status.equip.arm);

	// 与ダメ
	if( type === 'attack' ){
		if( player.status.att - com.status.def > 0 ){
			damage = player.status.att - com.status.def;
		}else{
			damage = 0;
		}
	}else if( type === 'spell' ){
		if( player.status.att - com.status.int > 0 ){
			damage = player.status.att - com.status.int;
		}else{
			damage = 0;
		}
	}
	
	black3.tl.moveTo(0,-160,)
	// var count = 0;
	// var cut = 0;
	// var effect;
	// var next = false;
	// var c1flag = true;
	// var c2flag = true;
	// var c5flag = true;
	// var c6flag = true;
	// var c7flag = true;

	// var c12flag = true;

	
	
	// scene.addEventListener(Event.ENTER_FRAME,function(){
	// 	if( cut === 0 ){ // 枠展開
	// 		black3.y -=8;
	// 		black4.y +=8;
	// 		if(black3.y === -160) cut++;
	// 	}else if( cut === 1){ // 構え
	// 		if( c1flag === true ){
	// 			battle_text1.text = 'の攻撃！';
	// 			name.moveTo(224,388);
	// 			battle_text1.moveTo(304,388);
	// 			player.image = game.assets[player.status.image2];
	// 			c1flag = false;
	// 			count = 0;
	// 		}else{
	// 			count++;
	// 		}
	// 		player.scaleX = -1.5;
	// 		if(this.age % 5 === 0){
	// 			player.frame = player.status.banim[0];	
	// 		}
			
	// 		if(count > 40){
	// 			player.scaleX = 1.5;
	// 			player.image = game.assets[player.status.image];
	// 			if( type === 'attack' ){ // 分岐
	// 				cut = 2;	
	// 			}else if( type === 'spell' ){
	// 				count = 0;
	// 				cut = 7;
	// 			}
				
	// 		}
	// 	// attack type 用　(cut 2 ～ 6)
	// 	}else if( cut === 2){　 // 移動  
	// 		if( bg.x > - 128){
	// 			bg.x -=8;	
	// 		}else{
	// 			cut++;
	// 		}
	// 		player.dir = RIGHT;
	// 		player.x += 16;
	// 	}else if( cut === 3 ){　// 画面高速
	// 		if( c2flag === true ){
	// 			count = 0;
	// 			c2flag = false;
	// 		}
	// 		if( bg.x > - 128){
	// 			bg.x -=32;
	// 		}else{
	// 			bg.x = 128;
	// 		}
	// 		player.x += 16;
	// 		count++;
	// 		if( count > 20 ){
	// 			bg.moveTo(128,0);
	// 			player.x = 128-48;
	// 			cut++;
	// 		}
	// 	}else if( cut === 4 ){　// 到着
	// 		if(bg.x > -128){
	// 			bg.x -=16;
	// 			com.x -=16;
	// 		}
	// 		if(player.x < C_LEFT){
	// 			player.x += 16;
	// 		}else{
	// 			player.dir = STAY;
	// 			cut++;
	// 		}
	// 	}else if( cut === 5 ){//攻撃モーション開始
	// 		if( c5flag === true ){
	// 			count = 0;
	// 			c5flag = false;	
	// 		}
	// 		count++;
	// 		if(count > 15){
	// 			if( this.age % 10 === 0){
	// 				player.scaleX = -1.5;
	// 				player.image = game.assets[player.status.image2];
	// 				player.frame = player.status.banim[ (this.age / 10) % 3 ];
	// 				if( player.frame === player.status.banim[2] )cut++;
	// 			}
	// 		}
	// 	}else if( cut === 6 ){ // エフェクト発動
	// 		if(c6flag === true){
	// 			effect = effect_type[effect_no](scene,com.x,com.y);
	// 			c6flag = false;
	// 			battle_text1.text = 'の ' + attack_name + ' ！！';
	// 			e_name.moveTo(224,408);
	// 			battle_text2.moveTo(294,408);
	// 			battle_text2.text = 'に '　+ damage + ' のダメージ！！';
	// 			hp_e -= damage;
	// 			count = 0;
	// 		}else{
	// 			if( damage >= com.status.hp ){　// たおした場合は相手を消す処理を挟んで next をtrueに
	// 				if( effect.flag == true || count !== 0){
	// 					count++;
	// 					if( count > 10 ){
	// 						if( com.opacity > 0.2 ){
	// 							com.opacity -= 0.2;
	// 						}else {
	// 							com.opacity = 0;
	// 							next = true;
	// 						}
	// 					}
	// 				}
	// 			}else{
	// 				next = true;
	// 			}
	// 			if( next === true) cut = 12;
	// 		}
	// 	}else if( cut === 7 ){
	// 		scene.tl
	// 		.delay(15)
	// 		.then(function(){
	// 			console.log(player);
	// 			player.scaleX = -1.5;
	// 			player.image = game.assets[player.status.image2];
	// 		})
	// 		.waitUntil(function(){
	// 			player.frame = player.status.banim[ (player.age / 10) % 3 ];
	// 			if( player.frame === player.status.banim[2] ){
	// 				return true;
	// 			}
	// 		})
	// 		.waitUntil(function(){
	// 			bg.x -=8;
	// 			player.x -=8;
	// 			if( bg.x <= - 128)return true;
	// 		})
	// 		.waitUntil(function(){
	// 			count++;
	// 			if( bg.x > - 128){
	// 				bg.x -=32;
	// 			}else{
	// 				bg.x = 128;
	// 			}
	// 			if(player.x > 128-32){
	// 				player.x -=32;
	// 			}else{
	// 				scene.removeChild(player);
	// 			}
	// 			if(count === 20){
	// 				count = 0;
	// 				return true;
	// 			}
	// 		})
	// 		.then(function(){
	// 			bg.moveTo(128,0);
	// 		})
	// 		.waitUntil(function(){
	// 			if(bg.x > -128){
	// 				bg.x -=16;
	// 				com.x -=16;
	// 			}else{return true;}
	// 		})
	// 		.delay(15)
	// 		.then(function(){
	// 			effect = effect_type[effect_no](scene,com.x,com.y);
	// 			battle_text1.text = 'の ' + attack_name + ' ！！';
	// 			e_name.moveTo(224,408);
	// 			battle_text2.moveTo(294,408);
	// 			battle_text2.text = 'に '　+ damage + ' のダメージ！！';
	// 			hp_e -= damage;
	// 			count = 0;
	// 		})
	// 		.waitUntil(function(){
	// 			console.log(effect);
	// 			if( effect.flag === true)return true;
	// 		})
	// 		.delay(10)
	// 		.waitUntil(function(){
	// 			console.log('rrrr');
	// 			if( damage >= com.status.hp ){
	// 				com.tl.fadeOut(5);
	// 				if(com.opacity <= 0)return true;
	// 			}else{
	// 				return true;
	// 			}
	// 		})
	// 		.then(function(){
	// 			cut = 12;
	// 		})
	// 	}


	// 	if( cut === 12 ){ // 戦闘終了(暗転)
	// 		if( c12flag === true ){
	// 			count = 0;
	// 			c12flag = false;
	// 		}else{
	// 			count++
	// 			if( count > 30 ){
	// 				black3.y +=8;
	// 				black4.y -=8;
	// 			}
	// 			if( black3.y >= 0 ){
	// 				cut++
	// 			}
	// 		}
	// 	}else if( cut === 13 ){ // 各種ステータスを反映させてからシーンを戻す
	// 		if( enemy.status.hp - damage > 0 ){
	// 			enemy.status.hp -= damage;
	// 		}else{
	// 			enemy.status.hp = 0;
	// 			enemy.status.liv = false;

	// 		}
	// 		is_countup = true;
	// 		game.popScene(this);
	// 	}
	// });
	return scene;
};
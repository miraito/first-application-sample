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
	var black4 = addblack( 0,224,800,224 );

	// キャラの名前
	var name = labelBase( player.status.name,0,-100,'cyan' );
	// 敵の名前
	var e_name = labelBase( com.status.name,0,-100,'yellow' );
	
	// 繋ぎ文章１
	var battle_text1 = labelBase('',0,0,'whitesmoke')
	// 繋ぎ文章２
	var battle_text2 = labelBase('',0,0,'whitesmoke')


	scene.addChild(player);
	scene.addChild(com);

	scene.addChild(black1);
	scene.addChild(black2);
	scene.addChild(black3);
	scene.addChild(black4);

	scene.addChild(battle_text1);
	scene.addChild(battle_text2);
	scene.addChild(name);
	scene.addChild(e_name);

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
			if( hp < starthp ){
				if( starthp > 0 )starthp--;
			}else{
				if( starthp < maxhp )starthp++;
			}
			// if( starthp > 0 )starthp--;
		}
	});
	// ゲージラベル
	var hp_t = starthp + ' / ' + maxhp;
	var hplabel = labelBase(starthp,315,40,'whitesmoke');
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
	var hplabel_e = labelBase(starthp_e,563,40,'whitesmoke');
	hplabel_e.addEventListener(Event.ENTER_FRAME,function(){
		this.text = starthp_e + ' / ' + maxhp_e;
	});
	scene.addChild(hplabel_e);
	// ゲージネーム
	var gage_name_label_e = labelBase( com.status.name,448,40 ,'whitesmoke');
	scene.addChild(gage_name_label_e);


//====================================戦闘計算開始
	
	// 攻撃、防御共にスキルがあるかチェック
	var att_skill = false;
	var def_skill = false;
	att_skill = attSkillCheck(chara);
	def_skill = defSkillCheck(enemy);


	var att_skill_elements = {
		critical_probability : 0,
		att_correction : 0,
		def_correction : 0,
		times : 1,
		add_damage : 0,
		add_hp : false,
		damage_change : 0,
		attack_name : player.status.attack_name
	};
	var def_skill_elements = {
		att_correction : 0,
		def_correction : 0
	};

	// 補正要素があったら足す（未実装）
	if(false){
		att_skill_elements.critical_probability += 0;// キャラ、武器による補正値
		def_skill_elements.critical_probability += 0;// キャラ、武器による補正値
	}


	var att_skill_name;
	var att_condition;
	var att_skill_flag = false;
	var att_skill_effect_no;
	var att_action_effect_no;
	if(att_skill){ // スキルがある場合は名前を取得して発動判定
		att_skill_name = get_attskill_name_by_chara(chara);
		// スキル発動条件取得
		att_condition = get_skill_condition_by_name(att_skill_name);
		// スキル発動判定
		att_skill_flag = att_condition(chara,enemy,att_skill_elements);
		att_skill_effect_no = get_effect_no_by_name(att_skill_name);
		att_action_effect_no = get_action_effect_no_by_name(att_skill_name);;
	}
	var def_skill_name;
	var def_condition;
	var def_skill_flag = false;
	if(def_skill){ // ある場合は名前を取得
		def_skill_name = get_defskill_name_by_chara(chara);
		// スキル発動条件取得
		def_condition = get_skill_condition_by_name(def_skill_name);
		// スキル発動判定
		def_skill_flag = def_condition(chara,enemy,def_skill_elements);
	}


	// =======================================戦闘に必要な補正値をプラスしてから戦闘計算開始
	var att_critical = 5; // クリティカル発生率
	var att_times = 1; // 攻撃回数

	// 攻撃側
	if( (att_critical + att_skill_elements.critical_probability) < 100 ){
		att_critical += att_skill_elements.critical_probability;
	}else{
		att_critical = 100;
	}
	
	player.status.att += att_skill_elements.att_correction;
	player.status.def += att_skill_elements.att_correction;
	att_times += att_skill_elements.times;

	// 防御側
	enemy.status.att += att_skill_elements.def_correction;
	enemy.status.def += def_skill_elements.def_correction;


	// player 武器タイプ識別
	var type = get_type_by_name(player.status.equip.arm);

	// effect タイプ識別
	var effect_no = get_effect_by_name(player.status.equip.arm);


	// 攻撃名
	var attack_name;
	if( type === 'attack'){
		attack_name = att_skill_elements.attack_name;
	}else if(type === 'spell'){
		attack_name = player.status.equip.arm;
	}


	// 与ダメ
	var damage;
	var real_att;
	var critical_flag = false;
	if( type === 'attack' ){
		if( att_critical > random(100)){
			real_att = Math.floor(player.status.att * 1.2);
			critical_flag = true;
		}else{
			real_att = player.status.att;
		}
		if( real_att - com.status.def > 0 ){
			damage = real_att - com.status.def;
		}else{
			damage = 0;
		}
	}else if( type === 'spell' ){ // 魔法はクリティカル無し
		if( player.status.att - com.status.int > 0 ){
			damage = player.status.att - com.status.int;
		}else{
			damage = 0;
		}
	}
	// 追加ダメージを足す。default 0 
	damage += att_skill_elements.add_damage;
	// ダメージチェンジ
	if( att_skill_elements.damage_change !== 0 ){
		damage = att_skill_elements.damage_change;
	}
	
	// アニメーション素材関数準備
	var next = true;
	var no = 0;
	var to_next = function(){
		no++;
		next = true;
	}
	var default_cut1 = function(){
		next = false;
		black3.tl.moveTo(0,-160,10);		
		black4.tl.moveTo(0,384,10).then(function(){to_next();});
	};
	var default_cut2 = function(){
		next = false;
		battle_text1.text = 'の攻撃！';
		name.moveTo(224,388);
		battle_text1.moveTo(304,388);
		player.image = game.assets[player.status.image2];
		player.scaleX = -1.5;
		player.frame = player.status.banim[0];
		player.tl.delay(30).then(function(){
			if( type === 'attack' ){ // 分岐
				player.scaleX = 1.5;
				player.image = game.assets[player.status.image];
			}else if( type === 'spell' ){

			}
		}).then(function(){to_next();});
	};
	var att_cut1 = function(){
		next = false;
		var count = 0;
		scene.tl.then(function(){
			player.dir = RIGHT;
		})
		.waitUntil(function(){
			if( bg.x > - 64){
				bg.x -=16;	
			}else{
				return true;
			}
			player.x += 32;
		})
		.waitUntil(function(){
			if( bg.x > - 128){
				bg.x -=32;
			}else{
				bg.x = 128;
			}
			player.x += 32;
			count++;
			if(count > 30){
				return true;
			}

		})
		.then(function(){
			bg.moveTo(128,0);
			player.x = 128-48;
		})
		.then(function(){to_next();})
	};
	var att_cut2 = function(){
		next = false;
		bg.tl.waitUntil(function(){
			if(bg.x > -128){
				bg.x -=16;
				com.x -=16;
			}
			if(player.x < C_LEFT){
				player.x += 16;
			}else{
				player.dir = STAY;
				return true;
			}
		})
		.then(function(){to_next();});
	}
	var att_cut3 =function(){
		next = false;
		player.tl.delay(15)
			.waitUntil(function(){
				if( player.age % 10 === 0 ){
					if( player.scaleX !== -1.5 ){
						player.scaleX = -1.5;	
					}
					player.image = game.assets[player.status.image2];
					player.frame = player.status.banim[ (player.age / 10) % 3 ];
				}
				if( player.frame === player.status.banim[2] ){
					to_next();
					return true;
				}
			})
	};
	var spell_cut1 = function(){
		next = false;
		var count = 0;
		player.tl.then(function(){
			player.scaleX = -1.5;
			player.image = game.assets[player.status.image2];	
		})
		.waitUntil(function(){
			player.frame = player.status.banim[ (player.age / 10) % 3 ];
			if( player.frame === player.status.banim[2] ){
				return true;
			}	
		})
		.waitUntil(function(){
			bg.x -=8;
			player.x -=8;
			if( bg.x <= - 128)return true;
		})
		.waitUntil(function(){
			if( bg.x > - 128){
				bg.x -=32;
			}else{
				bg.x = 128;
			}
			if(player.x > 128-32){
				player.x -=32;
			}else{
				
			}
			count++;
			if(count === 20){
				scene.removeChild(player);
				return true;
			}
		})
		.then(function(){
			bg.moveTo(128,0);
			to_next();
		})
	}
	var spell_cut2 = function(){
		next = false;
		bg.tl.waitUntil(function(){
			if(bg.x > -128){
				bg.x -=16;
				com.x -=16;
			}else{return true;}
		})
		.delay(15)
		.then(function(){
			to_next();
		})
	};
	var att_cutin = function(){
		next = false;
		var cutin = new Sprite(300,79);//300,79
		var tip = game.assets[player.status.cutin_image];
		var image = new Surface(300,79);
		image.draw(tip,0,0,300,79,0,0,300,79);//544,143
		if( player.scaleX !== -1.5 ){
			player.scaleX = -1.5;	
		}
		player.image = game.assets[player.status.image2];

		cutin.image = image;
		
		cutin.moveTo(672,100);
		cutin.scaleY = 0;
		scene.insertBefore(cutin,black4);
		cutin.tl
		.delay(15)
		.then(function(){
			if( type === 'attack' ){
				skill_effect_type[att_skill_effect_no](scene,player);	
			}
		})
		.and()
		.scaleTo(1,1,10)
		.and()
		.moveTo(128,100,10)
		.and()
		.then(function(){
			battle_text1.text = 'の ' + att_skill_name + ' 発動！！';
			console.log(battle_text1.text);
		})
		.delay(30)
		.then(function(){
			scene.removeChild(cutin);
			to_next();
		});

	};
	var def_cutin = function(){
		next = false;
		var cutin = new Sprite(300,79);//300,79
		var tip = game.assets[enemy.status.cutin_image];
		var image = new Surface(300,79);
		image.draw(tip,0,0,300,79,0,0,300,79);//544,143

		cutin.image = image;
		console.log('effect_no',att_skill_effect_no)
		skill_effect_type[att_skill_effect_no](scene,player);
		cutin.moveTo(-172,100);
		cutin.scaleY = 0;
		scene.insertBefore(cutin,black4);
		cutin.tl
		.scaleTo(1,1,10)
		.and()
		.moveTo(372,100,10)
		.and()
		.then(function(){
			battle_text1.text = 'の ' + att_skill_name + ' 発動！！';
			console.log(battle_text1.text);
		})
		.delay(30)
		.then(function(){
			scene.removeChild(cutin);
			to_next();
		});

	};
	var default_set = function(){
		battle_text1.color = 'whitesmoke';
		battle_text1.text = 'の ' + attack_name + ' ！！';
		e_name.moveTo(224,408);
		battle_text2.moveTo(294,408);
		battle_text2.text = 'に '　+ damage + ' のダメージ！！';
		if( att_skill_elements.add_hp === true ){
			battle_text1.tl
				.then(function(){
				battle_text1.color = 'yellow';
				battle_text1.text = damage + ' のダメージ！　' + damage + '吸収！！'
				if( hp + damage < player.status.maxhp ){
					hp += damage;
				}else{
					hp = player.status.maxhp;
				}
				hp_e -= damage;
			})
			.delay(30)
			.then(function(){
				to_next();
			});
		}else{
			hp_e -= damage;	
			to_next();
		}
	};
	var cut_attack = function(){
		next = false;
		var effect;
		if( att_skill_flag ){
			effect = action_effect_type[att_action_effect_no](scene,com,black1);
		}else{
			effect = effect_type[effect_no](scene,com,black1);
		}
		if( critical_flag ){
			scene.removeChild(name);
			battle_text1.color = 'yellow';
			battle_text1.text = 'クリティカル！！';	
			battle_text1.tl.delay(30)
			.then(function(){
				scene.addChild(name);
				default_set();
			})
		}else{
			default_set();
		}
	};
	var cut_dead = function(){
		next = false;
		com.tl.delay(10)
		.fadeOut(5)
		.then(function(){to_next();})
	};
	var default_cut3 = function(){
		next = false;
		black3.tl.delay(45)
			.moveTo(0,0,20);
		black4.tl.delay(45)
			.moveTo(0,224,20).delay(10).then(function(){
				to_next();
			});
	};
	var last_cut = function(){
		next = false;
		if( enemy.status.hp - damage > 0 ){
			enemy.status.hp -= damage;
		}else{
			enemy.status.hp = 0;
			enemy.status.liv = false;
		}
		chara.status.hp = hp;
		is_countup = true;
		game.popScene(this);
	}

	//=================action_list 作成
	var action_list = [
		default_cut1,
		default_cut2,
	];
	if( type === 'attack' ){ // 攻撃タイプ毎のアクション追加
		action_list.push(att_cut1);
		action_list.push(att_cut2);
		if(att_skill_flag){ // attスキル発動チェック。攻撃画面追加
			action_list.push(att_cutin);
		}
		if(def_skill_flag){
			action_list.push(def_cutin);
		}
		action_list.push(att_cut3);
	}else if( type === 'spell' ){
		action_list.push(spell_cut1);
		action_list.push(spell_cut2);
		if(att_skill_flag){ // attスキル発動チェック。攻撃画面追加
			action_list.push(att_cutin);
		}
		if(def_skill_flag){
			action_list.push(def_cutin);
		}
	}
	
	
	if(type === 'attack'){
		action_list.push(cut_attack);
	}else if( type == 'spell' ){
		action_list.push(cut_attack);
	}
	
	if( damage >= com.status.hp ){
		action_list.push(cut_dead);
	}
	action_list.push(default_cut3);
	action_list.push(last_cut);



	console.log('スキルフラグ',att_skill_flag);
	console.log('攻撃力',real_att,'ダメージ',damage);

	scene.addEventListener(Event.ENTER_FRAME,function(){
		if( no < action_list.length ){
			if(next){
				action_list[no]();
			}
		}
	});
	

	var cut_spell = function(){
		effect = effect_type[effect_no](scene,com.x,com.y);
		battle_text1.text = 'の ' + attack_name + ' ！！';
		e_name.moveTo(224,408);
		battle_text2.moveTo(294,408);
		battle_text2.text = 'に '　+ damage + ' のダメージ！！';
		hp_e -= damage;
	};

	
	return scene;
};
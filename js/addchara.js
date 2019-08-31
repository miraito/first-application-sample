// メニューキャラ作成
var menuChara = function(list,x,y){
	var base = new list();
	var chara = addchara(base.image);
	chara.status = base;
	chara.opacity = 0.5;
	chara.moveTo(x,y);
	chara.dir = STAY;
	var text = addStatusText(base);
	chara.addEventListener(Event.TOUCH_START,function(e){
		battle.info_label.name.text = text;
		window_image.image = game.assets[this.status.window_image];
	});
	return chara;
}
// 戦闘画面キャラクター作成
var battleChara = function(scene,list,x,y,bg,shoki,battle_window,item_window,life_gage){
	var base = new list();
	var chara = addchara(base.image);
	chara.items = { arms : [], items : [] };
	for( var i = 0; i < base.items.arms.length; i++){
		chara.items.arms.push(get_arm_by_name(base.items.arms[i]));
	}
	for( var i = 0; i < base.items.items.length; i++){
		chara.items.items.push(get_item_by_name(base.items.items[i]));
	}
	chara.status = base;
	chara.moveTo(x,y);
	chara.flag = false;
	chara.lineflag = false;
	chara.default_flag = chara.lineflag;
	chara.place = {};
	chara.place.x = chara.x;
	chara.place.y = chara.y;
	chara.acted = false;
	var text = addStatusText(base);
	// 戦闘画面配置時のタッチアクション

	chara.addEventListener(Event.TOUCH_START,function(e){
		// 配置中アクション
		if( battle.view == 5 ){
			if(battle.flag === false ){
				// タッチスタートと同時に配置判定をfalseに
				for(var i = 0; i < shoki.length; i++){
					if( (this.x >= arrange.battlemap[shoki[i][0]][shoki[i][1]].x && 
						this.x <= arrange.battlemap[shoki[i][0]][shoki[i][1]].x+32) &&
						(this.y >= arrange.battlemap[shoki[i][0]][shoki[i][1]].y && 
						this.y < arrange.battlemap[shoki[i][0]][shoki[i][1]].y+32) ){
						arrange.battlemap[shoki[i][0]][shoki[i][1]].shoki = false;
					}
				}	
			}else{
				// クエスト開始後window 開け閉め処理
				if(player_turn){
					// エンドウィンドが出てない　＆　移動中でない（move_resultが未登録）場合
					if( !is_moveend_window && move_result.length === 0 && is_countup === false
					&& is_att_range === false && is_action === true ){
						if( this.acted === false ){
							var toX;
							if( this.x > 800 - 32*5 ){
								toX = this.x-148;
							}else{
								toX = this.x + 80;
							}
							battle_window.moveTo(toX,this.y-16);
							if( battle_window.dir === CLOSE){
								battle_window.dir = OPEN;
							}
							if( battle_window.dir == WAIT ){
								battle_window.scaleY = 0;
								battle_window.dir = OPEN;
							}
							if(att_window.dir !== CLOSE){
								att_window.dir = CLOSE;
								att_window.moveTo(1000,1000);
							}
							if(item_window.dir !== CLOSE){
								item_window.dir = CLOSE;
								item_window.moveTo(1000,1000);
							}
						}
					}
				}
			}
			battle.info_label.name.text = this.status.name;
			battle.info_label.job.text = this.status.job;
			battle.info_label.lv.text = 'Lv ' + this.status.lv;
			battle.info_label.arm.text = this.status.equip.arm;

			scene.addChild(icon.arm);
			scene.addChild(icon.shield);

			scene.addChild(battle.info_label.att_b);
			scene.addChild(battle.info_label.att_l);
			scene.addChild(battle.info_label.def_b);
			scene.addChild(battle.info_label.def_l);
			scene.addChild(battle.info_label.int_b);
			scene.addChild(battle.info_label.int_l);
			scene.addChild(battle.info_label.move_b);
			scene.addChild(battle.info_label.move_l);
			scene.addChild(battle.info_label.speed_b);
			scene.addChild(battle.info_label.speed_l);
			scene.addChild(battle.info_label.hp_b);
			scene.addChild(battle.info_label.hp_l);
			battle.info_label.att.text = this.status.att;
			battle.info_label.def.text = this.status.def;
			battle.info_label.int.text = this.status.int;
			battle.info_label.move.text = this.status.move;
			battle.info_label.speed.text = this.status.speed;
			
			window_image.image = game.assets[this.status.window_image];

			life.maxhp = this.status.maxhp;
			life.starthp = this.status.hp;
			life.hp = life.starthp;
			scene.addChild(life_gage);
			life_label.starthp = this.status.hp;
			life_label.maxhp = this.status.maxhp;
			scene.addChild(life_label);
		}

	});

	chara.addEventListener(Event.TOUCH_MOVE,function(e){
		if( battle.view == 5 ){
			// 配置中アクション
			if(battle.flag === false){
				// 移動処理
				chara.x = e.x-16;
				chara.y = e.y-16;
				// レイヤー順入れ替え処理
				if( this.x > 128 -16){
					this.lineflag = true;
				}else{
					this.lineflag = false;
				}
				if( this.default_flag !== this.lineflag ){
					if( this.lineflag == true ){
						scene.removeChild(this);
						scene.insertBefore(this,bg);
					}else{
						scene.removeChild(this);
						scene.addChild(this);
					}
				}
				this.default_flag = this.lineflag;
			}else{
				//console.log('bbb');
			}
		}
	});

	chara.addEventListener(Event.TOUCH_END,function(e){
		if( battle.view == 5 ){
			// 配置中アクション
			if(battle.flag === false){
				// メニュー上で離した場合移動座標に初期位置を代入
				if( e.x < 128){
					chara.place.x = x;
					chara.place.y = y;
				}else{
					// map 上で離した場合、shoki位置内かどうか判定。shoki位置内なら移動座標にshoki位置を代入
					for(var i = 0; i < shoki.length; i++){
						if( (e.x >= arrange.battlemap[shoki[i][0]][shoki[i][1]].x && 
							e.x < arrange.battlemap[shoki[i][0]][shoki[i][1]].x+32) &&
							(e.y >= arrange.battlemap[shoki[i][0]][shoki[i][1]].y && 
							e.y < arrange.battlemap[shoki[i][0]][shoki[i][1]].y+32) && 
							arrange.battlemap[shoki[i][0]][shoki[i][1]].shoki !== true ){
							chara.place.x = arrange.battlemap[shoki[i][0]][shoki[i][1]].x;
							chara.place.y = arrange.battlemap[shoki[i][0]][shoki[i][1]].y;
							break;
						}
					}
				}
				
				// place座標に移動
				this.moveTo(chara.place.x,chara.place.y);
				// 移動場所が初期位置でlineflagがtrueになっていたらfalseに戻してレイヤー順変更
				if( chara.place.x == x && chara.place.y == y ){
					if( this.lineflag == true ){
						this.lineflag = false;
						scene.removeChild(this);
						scene.addChild(this);	
					}
				}
				// 戻り位置がshoki だった場合配置判定をtrueに戻す
				for( var i = 0; i < shoki.length; i++){
					if((chara.place.x >= arrange.battlemap[shoki[i][0]][shoki[i][1]].x && 
						chara.place.x < arrange.battlemap[shoki[i][0]][shoki[i][1]].x+32) &&
					 (chara.place.y >= arrange.battlemap[shoki[i][0]][shoki[i][1]].y && 
					 chara.place.y < arrange.battlemap[shoki[i][0]][shoki[i][1]].y+32) && 
					 arrange.battlemap[shoki[i][0]][shoki[i][1]].shoki !== true){
						arrange.battlemap[shoki[i][0]][shoki[i][1]].shoki = true;
					}
				}
				// 移動位置がメニュー上なら配置完了判定をfalseに。（trueだとmapと共に動く）
				if( this.x >= 128 ){
					this.flag = true;
				}else{
					this.flag = false;
				}
			}else{
				//console.log('hhh');
			}
		}
	});
	chara.addEventListener(Event.ENTER_FRAME,function(){
		
		//console.log(this.flag);
	});
	return chara;
}
var enemyChara = function(scene,list,shoki,life_gage){
	var base = new list();
	var x = arrange.battlemap[shoki[0]][shoki[1]].x;
	var y = arrange.battlemap[shoki[0]][shoki[1]].y;
	var chara = addchara(base.image);
	chara.dir = STAY;
	chara.status  = base;
	chara.moveTo(x,y);
	var text = addStatusText(base);
	chara.addEventListener(Event.TOUCH_START,function(e){
		// 配置中アクション
		if( battle.view === 5 ){
			if(this.status.window_image){
				window_image.image = game.assets[this.status.window_image];	
			}else{
				window_image.image = '';
			}
			// battle.info_label.name.text = base.name;
			// battle.info_label.job.text = base.job;
			battle.info_label.name.text = this.status.name;
			battle.info_label.job.text = this.status.job;
			battle.info_label.lv.text = 'Lv ' + this.status.lv;
			battle.info_label.arm.text = this.status.equip.arm;

			scene.addChild(icon.arm);
			scene.addChild(icon.shield);

			scene.addChild(battle.info_label.att_b);
			scene.addChild(battle.info_label.att_l);
			scene.addChild(battle.info_label.def_b);
			scene.addChild(battle.info_label.def_l);
			scene.addChild(battle.info_label.int_b);
			scene.addChild(battle.info_label.int_l);
			scene.addChild(battle.info_label.move_b);
			scene.addChild(battle.info_label.move_l);
			scene.addChild(battle.info_label.speed_b);
			scene.addChild(battle.info_label.speed_l);
			scene.addChild(battle.info_label.hp_b);
			scene.addChild(battle.info_label.hp_l);
			battle.info_label.att.text = this.status.att;
			battle.info_label.def.text = this.status.def;
			battle.info_label.int.text = this.status.int;
			battle.info_label.move.text = this.status.move;
			battle.info_label.speed.text = this.status.speed;
			
			window_image.image = game.assets[this.status.window_image];

			life.maxhp = this.status.maxhp;
			life.starthp = this.status.hp;
			life.hp = life.starthp;
			scene.addChild(life_gage);
			life_label.starthp = this.status.hp;
			life_label.maxhp = this.status.maxhp;
			scene.addChild(life_label);
		}
	});
	return chara;
}
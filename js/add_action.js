var addCharaTouch = function(scene){
	for(var i = 0; i < battle.chara.length; i++){
		// タッチ
		battle.chara[i].addEventListener(Event.TOUCH_START,function(){
			if(player_turn){
				// エンドウィンドが出てない　＆　移動中でない（move_resultが未登録）場合 その他フラグも
				if( !is_moveend_window && move_result.length == 0 && is_countup === false
					&& is_att_range === false && is_action === true){
					if( this.acted === false ){
						select_chara = this.number;
					}
				}
			}
		});
		// 移動
		moveStart(scene,battle.chara[i]); // 移動処理追加
	}	
};
var addEnemyAction = function(scene,bg,life_gage){
	for(var i = 0; i < battle.enemy.length; i++){
		battle.enemy[i].addEventListener(Event.TOUCH_START,function(e){
			if(player_turn){
				// エンドウィンドが出てない　＆　移動中でない（move_resultが未登録）場合
				if( !is_moveend_window && move_result.length == 0 && is_countup === false 
					&& is_att_range === false && is_action === true){
					select_chara = this.number;
				}
				// 攻撃レンジが出てる時攻撃
				if( is_att_range === true ){
					var search = false;
					for( var i = 0; i < range_tip_a.length; i++ ){
						if( range_tip_a[i].x === this.x && range_tip_a[i].y === this.y ){
							search = true;
						}
					}
					if(search){// 攻撃されたのが自分ならば
						att_window.dir = CLOSE; //window閉める
						att_window.moveTo(1000,1000);
						// 攻撃したキャラ判別
						for(var i = 0; i < battle.chara.length; i++){
							if( battle.chara[i].number === select_chara ){
								var chara = battle.chara[i];
								break;
							}
						}
						// 位置情報等確定
						endSet(scene,chara,bg);
						chara.dir = STAY;
						for( var i = 0; i < range_tip_a.length; i++ ){
							scene.removeChild(range_tip_a[i]);
						}
						scene.removeChild(battle.info_label.att_b);
						scene.removeChild(battle.info_label.att_l);
						scene.removeChild(battle.info_label.def_b);
						scene.removeChild(battle.info_label.def_l);
						scene.removeChild(battle.info_label.int_b);
						scene.removeChild(battle.info_label.int_l);
						scene.removeChild(battle.info_label.move_b);
						scene.removeChild(battle.info_label.move_l);
						scene.removeChild(battle.info_label.speed_b);
						scene.removeChild(battle.info_label.speed_l);
						scene.removeChild(battle.info_label.hp_b);
						scene.removeChild(battle.info_label.hp_l);
						scene.removeChild(life_gage);
						scene.removeChild(life_label);
						battle.info_label.att.text = '';
						battle.info_label.def.text = '';
						battle.info_label.int.text = '';
						battle.info_label.move.text = '';
						battle.info_label.speed.text = '';
						window_image.image = '';
						is_att_range = false;
						this.to_battle = true;
					}else{
						console.log('俺じゃないな');
					}
				}
			}
		});
		battle.enemy[i].addEventListener(Event.ENTER_FRAME,function(){
			if( this.to_battle === true ){
				// 攻撃したキャラ判別
				for(var i = 0; i < battle.chara.length; i++){
					if( battle.chara[i].number === select_chara ){
						var chara = battle.chara[i]; 
						break;
					}
				}
				this.to_battle = false;
				game.pushScene(addbattleScene(chara,this));
			}
		});
		// 移動処理追加
		moveStart_e(scene,battle.enemy[i],bg);
	}
};

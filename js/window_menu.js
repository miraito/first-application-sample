var battleMenu1 = function(){
	var battle_menu = labelBase('移動',0,0);
	battle_menu.font = "14px 'ＭＳ Ｐ明朝'";
	battle_menu.color = 'whitesmoke';
	return battle_menu;
}
var battleMenu2 = function(scene){
	var battle_menu = labelBase('攻撃',0,0);
	battle_menu.font = "14px 'ＭＳ Ｐ明朝'";
	battle_menu.color = 'whitesmoke';
	battle_menu.addEventListener(Event.TOUCH_START,function(e){
		if( att_window.dir === CLOSE){
			// メニューラベル作成
			var att_menu = attMenu(scene);
			// ラベルを入れてwindow作成
			att_window = ntBattleWindow(scene,att_menu);
			scene.addChild(att_window);
			attWindowOpen(targetChara());
		}
		//attackRange(scene);
	});
	return battle_menu;
}
var battleMenu3 = function(scene,item_window,item_menu,bg){
	var battle_menu = labelBase('アイテム',0,0);
	battle_menu.color = 'whitesmoke';
	battle_menu.addEventListener(Event.TOUCH_START,function(){
		if(item_window.dir === CLOSE){
			for(var i = 0; i < item_menu.length; i++){ // 初期化(newArrayだと参照渡しが切れるから空label代入)
				item_menu[i] = labelBase('');
			}
			item_menu = itemMenu(scene,item_menu,item_window,bg);
			//item_window = ntBattleWindow(scene,item_menu);
			item_window.moveTo( battle_window.x + 32,battle_window.y + 16 );
			item_window.dir = OPEN;
			scene.addChild(item_window);
		}
	});
	return battle_menu;
};
var battleMenu4 = function(scene,bg,battle_window){
	var battle_menu = labelBase('待機',0,0);
	battle_menu.color = 'whitesmoke';
	battle_menu.addEventListener(Event.TOUCH_START,function(e){
		for(var i = 0; i < battle.chara.length; i++){
			if( battle.chara[i].number === select_chara ){
				var move_chara = battle.chara[i]; 
				break;
			}
		}
		move_chara.dir = STAY;
		endSet(scene,move_chara,bg);
		battle_window.dir = CLOSE;　//moveend_windowを消してフラグオフ
		att_window.dir = CLOSE;
		is_moveend_window = false;
		is_countup = true;
	});
	return battle_menu;
}
var battleMenu5 = function(scene){
	var battle_menu = labelBase('ステータス');
	battle_menu.color = 'whitesmoke'
	battle_menu.addEventListener(Event.TOUCH_START,function(){
		console.log(select_chara);
		if( status_window.dir === CLOSE ){
			if( is_action === true && is_info_window === false ){
				scene.addChild(status_window);
				var chara = targetChara();
				statusSet(chara);
				status_window.dir = OPEN;
				is_action = false;
				is_info_window = true;	
			}
		}else if( status_window.dir === WAIT){
				status_window.dir = CLOSE;
				is_action = true;
				is_info_window = false;
			}
	})
	return battle_menu;
}
var endMenu1 = function(scene){
	var battle_menu = labelBase('攻撃',0,0);
	battle_menu.font = "14px 'ＭＳ Ｐ明朝'";
	battle_menu.color = 'whitesmoke';
	battle_menu.addEventListener(Event.TOUCH_START,function(e){
		var att_menu = attMenu(scene);
		if( att_window.dir === CLOSE ){
			att_window = ntBattleWindow(scene,att_menu);
			scene.addChild(att_window);
			attWindowOpen(targetChara());
		}
		//attackRange(scene);
	});
	return battle_menu;
}
var endMenu2 = function(scene,item_window,item_menu,bg){
	var battle_menu = labelBase('アイテム',0,0);
	battle_menu.color = 'whitesmoke';
	battle_menu.addEventListener(Event.TOUCH_START,function(){
		if(item_window.dir === CLOSE){
			for(var i = 0; i < item_menu.length; i++){ // 初期化(newArrayだと参照渡しが切れるから空label代入)
				item_menu[i] = labelBase('');
			}
			item_menu = itemMenu(scene,item_menu,item_window,bg);
			//item_window = ntBattleWindow(scene,item_menu);
			item_window.moveTo( moveend_window.x + 32,moveend_window.y + 16 );
			item_window.dir = OPEN;
			scene.addChild(item_window);
		}
	});
	return battle_menu;
}
var endMenu3 = function(){
	var battle_menu = labelBase('キャンセル',0,0);
	battle_menu.font = "14px 'ＭＳ Ｐ明朝'";
	battle_menu.color = 'whitesmoke';
	battle_menu.addEventListener(Event.TOUCH_START,function(e){
		for(var i = 0; i < battle.chara.length; i++){
			if( battle.chara[i].number === select_chara ){
				var move_chara = battle.chara[i]; 
				break;
			}
		}
		for( var i = 0; i < arrange.chara.length; i++ ){
			for( var j = 0; j < arrange.chara[i].length; j ++){
				if(arrange.chara[i][j] == select_chara ){
					var default_place = arrange.battlemap[i][j];
				}
			}
		}
		move_chara.moveTo(default_place.x,default_place.y);
		move_chara.dir = DOWN;
		moveend_window.dir = CLOSE; // キャンセルされたらmoveend_windowを消してフラグオフ
		is_moveend_window = false;
	});
	return battle_menu;
}
var endMenu4 = function(scene,bg){
	var battle_menu = labelBase('待機',0,0);
	battle_menu.font = "14px 'ＭＳ Ｐ明朝'";
	battle_menu.color = 'whitesmoke';
	battle_menu.addEventListener(Event.TOUCH_START,function(){
		var chara = targetChara();
		chara.dir = STAY;
		endSet(scene,chara,bg);
		moveend_window.dir = CLOSE;　//moveend_windowを消してフラグオフ
		is_moveend_window = false;
		is_countup = true;
	});
	return battle_menu;
}
var attMenu = function(scene){
	// 武器メニューラベル格納配列
	var arm_array = new Array();
	var chara = targetChara();
	for( var i = 0; i < chara.items.arms.length; i++ ){
		var arm_label;
		if( chara.status.equip.arm === chara.items.arms[i].name ){
			arm_label = labelBase(chara.items.arms[i].name + ' E');
		}else{
			arm_label = labelBase(chara.items.arms[i].name);	
		}
		arm_label.font = "14px 'ＭＳ Ｐ明朝'";
		arm_label.color = 'whitesmoke';
		arm_label.addEventListener(Event.TOUCH_START,function(){
			// 攻撃できるキャラがいたらレンジチップを出す
			attackRange(scene);
			// 押した武器によって装備情報を変更
			var chara = targetChara();
			if( this.text !== chara.status.equip.arm + ' E' ){
				chara.status.equip.arm = this.text;
				var type = get_type_by_name(this.text);
				if( type === 'attack'){
					chara.status.att = chara.status.pow + get_arm_att(this.text);
				}else if( type === 'spell' ){
					chara.status.att = chara.status.int + get_arm_att(this.text);
				}
				
			}
		});
		arm_array.push(arm_label);
	}
	var battle_menu = labelBase('キャンセル',0,0);
	battle_menu.font = "14px 'ＭＳ Ｐ明朝'";
	battle_menu.color = 'whitesmoke';
	battle_menu.addEventListener(Event.TOUCH_START,function(e){
		att_window.dir = CLOSE; // キャンセルされたらatt_windowを消す
	});
	arm_array.push(battle_menu);
	return arm_array;
};
var itemMenu = function(scene,item_array,item_window,bg){
	// 武器メニューラベル格納配列
	var chara = targetChara();
	for( var i = 0; i < chara.items.items.length; i++ ){
		var item_label;
		if( i < item_array.length ){
			item_label = labelBase(chara.items.items[i].name,0,0,'whitesmoke');
			item_array[i] = item_label;
			item_array[i].this_number = i;
			item_label.addEventListener(Event.TOUCH_START,function(){
console.log(this.text + 'を使うぞー');
				if( chara.items.items[this.this_number].type === 'heal' ){
					var result = chara.items.items[this.this_number].result;
					var time;
					if( chara.status.hp + result <= chara.status.maxhp ){
						time = result;
						chara.status.hp += result;
						life.hp += result;
					}else{
						time = chara.status.maxhp - chara.status.hp;
						chara.status.hp = chara.status.maxhp;
						life.hp = chara.status.maxhp;
					}
					var interval_time = Math.floor(time * 1000 / game.fps); // ミリ秒に直す
					// setTimeout(function(){is_countup = true;},interval_time);
					chara.tl.delay(time).then(function(){is_countup = true;});
					item_window.dir = CLOSE;
					battle_window.dir = CLOSE;
					moveend_window.dir = CLOSE;
					is_moveend_window = false;
					chara.dir = STAY;
					endSet(scene,chara,bg);
				}
				// アイテムをリストから消す処理
				chara.items.items.splice(this.this_number,1);
				chara.status.items.items.splice(this.this_number,1);
//				console.log(chara.items.items);
			});
		}
	}
	// var battle_menu = labelBase('キャンセル',0,0);
	// battle_menu.font = "14px 'ＭＳ Ｐ明朝'";
	// battle_menu.color = 'whitesmoke';
	// battle_menu.addEventListener(Event.TOUCH_START,function(e){
	// 	att_window.dir = CLOSE; // キャンセルされたらatt_windowを消す
	// });
	// item_array.push(battle_menu);
	return item_array;
};
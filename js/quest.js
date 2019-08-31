var quest = function(num,list){
	var scene = new Scene();
	// 左メニュー、下メニュー　を除いて　14 * 7 ( 672 * 336 )
// alert('敵攻撃時にHPの上の名前ラベルが無い');


	// battle.view = 5;
	//初期化
	arrange.dead.e = [];
	arrange.dead.p = [];
	is_countup = true;
	performed = 0;
	act_enemy = 0;
	//quest_info からnum(questname)に応じてmapと初期位置情報取得
	var info = {
		x : map_info[num][0],
		y : map_info[num][1],
		shoki : shoki_info[num],
		detect : detect_info[num]
	};
	//========================== 取得した情報を元にmap配置
	// map grid情報配列
	arrange.battlemap　= addgridLocation(info.x,info.y);
	
	// キャラ位置情報配列
	arrange.chara = addlocation(info.x,info.y);
	arrange.enemy = addlocation(info.x,info.y);
	// 衝突判定配列
	arrange.detect = addlocation(info.x,info.y);
	for(var i = 0; i < info.detect.length; i++){
		arrange.detect[info.detect[i][0]][info.detect[i][1]] = -1;
	}
	// 地形ごとのmove値減少値配列
	arrange.move = move_info(num);
	// 初期位置に番号ふる
	var shoki_label = shokiLabel(info.shoki);
	// map 作成（仮）
	var map = addmap(scene,shoki_label,info.x,info.y);
	// レイヤー基準用空スプライト
	div = new Label('');
	scene.addChild(div);
	//======================================================== 左メニュー作成
	var bg  = bg1();
	scene.addChild(bg);
	var triangle_line;

	var phase_log = phase_p();
	phase_log.moveTo(40,48);
	var phase_log_e = phase_e();
	phase_log_e.moveTo(37,48);
	var start_log = addStart();
	start_log.moveTo(41,50);

	// quest 開始ボタン作成
	var button_b = phaseBg();//addbutton( 1,12,384 );
	var button = new Group();
	button.addChild(button_b);
	button.addChild(start_log);
	button.addEventListener(Event.TOUCH_START,function(){
		if( start_flag === true && battle.flag === false){
			for(var i = 0; i < chara.length; i++){
				scene.removeChild(chara[i]);
			}
			for( var i = 0; i < chara_name.length; i++ ){
				scene.removeChild(chara_name[i]);
			}
			// 配置情報を配列に確定
			setLocation();
			// いらんもん消す
			for(var i = 0; i < shoki_label.length; i++){
				scene.removeChild(shoki_label[i]);	
			}
			button.removeChild(start_log);
			//scene.removeChild(this);
			// いるもん出す
			// scene.addChild(menu_label[0]);
			// 行動順を示す三角列作成
			var triangle = add_triangle(order);　// 三角配列作成
			triangle_line = new Group();
			triangle_line = add_triangle_line(triangle_line,triangle);　// グループ化
			scene.insertBefore(triangle_line,button);

			// start後　キャラのアクション追加 (タッチ, 移動)
			addCharaTouch(scene);
			// 敵のタッチアクション追加
			addEnemyAction(scene,bg,life_gage);
			// 移動コマンド押した時に移動範囲を出す処理追加
			battle_menu1.addEventListener(Event.TOUCH_START,function(){
				if(player_turn){
					is_range = true;
					for(var i = 0; i < battle.chara.length; i++){
						if( battle.chara[i].number ===  select_chara){
							moveRange(map,battle.chara[i],info.x,info.y,scene,'p');
							battle_window.dir = CLOSE;
						}
					}	
				}
			});
			// 敵にも追加（範囲表示のみ）
			for(var i = 0; i < battle.enemy.length; i++){
				battle.enemy[i].addEventListener(Event.TOUCH_START,function(){
					if(player_turn && is_att_range === false && is_countup === false){	
						// is_actionがfalseのときは出さない。(is_actionがfalseだとselect_charaが書き換わらないようにしているから)
						if( move_result.length === 0 && is_action === true){ // キャラ移動中は出さない（被り防止）
							if( is_moveend_window === false ){
								if(this.x < 640){
									enemy_window.moveTo(this.x +48,this.y - 16);	
								}else{
									enemy_window.moveTo(this.x -196,this.y - 16);
								}
								if( enemy_window.dir === CLOSE ){
									enemy_window.dir = OPEN;
								}else if( enemy_window.dir === WAIT ){
									enemy_window.scaleY = 0;
									enemy_window.dir = OPEN;
								}
								
							}
							is_range = true;
							moveRange(map,this,info.x,info.y,scene,'e');
						}
						
					}
				})
			}
			// battle_wiondow 出す
			scene.addChild(battle_window);
			//scene.addChild(att_window);
			startMessage(scene);
			battle.flag = true;
		}
	})
	// var phase_bg = phaseBg();//moveTo(8,34)
	//scene.addChild(phase_bg);
	// var phase_label = labelBase('',40,42);
	// phase_label.color = 'darkgoldenrod';
	// scene.addChild(phase_label);


	var turn_no = 1;
	var turn_label = labelBase('ターン : '+turn_no,32,16,'whitesmoke');
	turn_label.font = "bold 14px 'ＭＳ Ｐ明朝'";
	scene.addChild(turn_label);
	// scene.addChild(phase_label);
	scene.addChild(button);
	// scene.addChild(start_log);
	var menu_bg = menuBg(); // moveTo(8,290)
	scene.addChild(menu_bg);
	var menu_label = new Array();
	menu_label[0] = addQuestMenu_1();
	menu_label[0].moveTo(29,314);
	menu_label[1] = addQuestMenu_2(scene);
	menu_label[1].moveTo(32,342);
	scene.addChild(menu_label[0]);
	scene.addChild(menu_label[1]);


	//========================================================== 下スペース
	var window_base = windowBase();
	scene.addChild(window_base);


	battle.info_label.name = labelBase('',128+96+16,448-96+16,'whitesmoke');
	battle.info_label.job = labelBase('',128+96+16,448-96+16+20,'whitesmoke');
	battle.info_label.lv = labelBase('',128+96+16+120,448-96+16+22,'whitesmoke');
	battle.info_label.lv.font = " 12px 'ＭＳ Ｐ明朝' ";

	icon.arm = addicon_arm();
	icon.shield = addicon_shield();
	battle.info_label.arm = labelBase('',128+96+32+150+16+32,448-96+16,'whitesmoke');


	battle.info_label.att_b = labelBase('att',128+96+32+150+16+1,448-24,'rgb(25,25,25)');
	battle.info_label.att_l = labelBase('att',128+96+32+150+16,448-24,'darkorange');
	battle.info_label.att = labelBase('',128+96+32+150+16+40,448-24,'whitesmoke');
	battle.info_label.att_b.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.att_l.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.def_b = labelBase('def',128+96+32+150+86+1,448-24,'rgb(25,25,25)');
	battle.info_label.def_l = labelBase('def',128+96+32+150+86,448-24,'darkorange');
	battle.info_label.def = labelBase('',128+96+32+150+86+40,448-24,'whitesmoke');
	battle.info_label.def_b.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.def_l.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.int_b = labelBase('int',128+96+32+150+156+1,448-24,'rgb(25,25,25)');
	battle.info_label.int_l = labelBase('int',128+96+32+150+156,448-24,'darkorange');
	battle.info_label.int = labelBase('',128+96+32+150+156+40,448-24,'whitesmoke');
	battle.info_label.int_b.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.int_l.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.move_b = labelBase('move',128+96+32+150+226+1,448-24,'rgb(25,25,25)');
	battle.info_label.move_l = labelBase('move',128+96+32+150+226,448-24,'darkorange');
	battle.info_label.move = labelBase('',128+96+32+150+226+40,448-24,'whitesmoke');
	battle.info_label.move_b.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.move_l.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.speed_b = labelBase('speed',128+96+32+150+296+1,448-24,'rgb(25,25,25)');
	battle.info_label.speed_l = labelBase('speed',128+96+32+150+296,448-24,'darkorange');
	battle.info_label.speed = labelBase('',128+96+32+150+296+50,448-24,'whitesmoke');
	battle.info_label.speed_b.font = "italic 14px 'ＭＳ Ｐ明朝'";
	battle.info_label.speed_l.font = "italic 14px 'ＭＳ Ｐ明朝'";


	
	


	scene.addChild(battle.info_label.name);
	scene.addChild(battle.info_label.job);
	scene.addChild(battle.info_label.lv);
	scene.addChild(battle.info_label.arm);
	scene.addChild(battle.info_label.att);
	scene.addChild(battle.info_label.def);
	scene.addChild(battle.info_label.int);
	scene.addChild(battle.info_label.move);
	scene.addChild(battle.info_label.speed);

	window_image = new Sprite(96,96);
	window_image.moveTo(128,448-96);
	scene.addChild(window_image);
	// ライフゲージ
	var gage_base1 = addgage( 152,11,'darkgoldenrod' );
	var red_gage = addgage( 150,9,'rgb(255,0,51)' );
	red_gage.moveTo(1,1);
	life = addgage( 150,9,'rgb(0,153,102)');
	life.moveTo(1,1);
	life.maxhp = 10;
	life.starthp = 10;
	life.hp = life.starthp;
	life.addEventListener(Event.ENTER_FRAME,function(){
		if( this.width >= 0 ){
			this.width = Math.floor(150 * this.starthp/this.maxhp);
		}else{
			this.width = 0;
		}
		if( this.starthp !== this.hp ){
			if( this.hp < this.starthp ){
				if( this.starthp > 0 )this.starthp--;
			}else{
				if( this.starthp < this.maxhp )this.starthp++;
			}
			
		}
	});
	var life_gage = new Group();
	life_gage.moveTo(128+96+16,448-37);
	life_gage.addChild(gage_base1);
	life_gage.addChild(red_gage);
	life_gage.addChild(life);

	battle.info_label.hp_b = labelBase('Hp',128+96+16+1,448-20,'rgb(25,25,25)');
	battle.info_label.hp_l = labelBase('Hp',128+96+16,448-20,'darkorange');
	battle.info_label.hp_b.font = "italic 12px 'ＭＳ Ｐ明朝'";
	battle.info_label.hp_l.font = "italic 12px 'ＭＳ Ｐ明朝'";
	life_label = labelBase('',128+96+16+30,448-20);
	life_label.font = " 12px 'ＭＳ Ｐ明朝'";
	life_label.color = 'whitesmoke';
	life_label.starthp = '';
	life_label.maxhp = '';
	life_label.addEventListener(Event.ENTER_FRAME,function(){
		this.text = life.starthp + ' / ' + life.maxhp;
	});

	var foot_window = footWindow();
	scene.addChild(foot_window);

	//=============================バトル開始後必要素材準備

	var item_menu = new Array();
	for(var i = 0; i < 8; i++){ // アイテム最大8個表示用
		item_menu[i] = labelBase('');
	}
	var item_window = ntBattleWindow(scene,item_menu);
	//item_window.dir = OPEN;
	scene.addChild(item_window);

	// メニューラベル
	var battle_menu1 = battleMenu1();
	var battle_menu2 = battleMenu2(scene);
	var battle_menu3 = battleMenu3(scene,item_window,item_menu,bg); // アイテム
	var battle_menu5 = battleMenu5(scene); // ステータス

	//バトル用window
	battle_window = battleWindow(scene,battle_menu1,battle_menu2,battle_menu3,battle_menu5);
	console.log(battle_window);
	var battle_menu4 = battleMenu4(scene,bg,battle_window);
	battle_window.addEventListener(Event.ENTER_FRAME,function(){
		if( this.scaleY === 1 ){
			if( this.is_menu === false ){
				battle_menu4.moveTo(this.x+16,this.y+112);
				scene.insertBefore(battle_menu4,att_window);
				this.is_menu = true;
			}
		}else{
			scene.removeChild(battle_menu4);
			this.is_menu = false;
		}
	});
	// 移動後window作成
	var end_menu1 = endMenu1(scene);
	var end_menu2 = endMenu2(scene,item_window,item_menu,bg);
	var end_menu3 = endMenu3();
	var end_menu4 = endMenu4(scene,bg);
	var end_menu_list = [end_menu1,end_menu2,end_menu3,end_menu4];
	moveend_window = ntBattleWindow(scene,end_menu_list);

	// 敵ステータスwindow
	enemy_window_list = [battleMenu5(scene)];
	enemy_window = ntBattleWindow(scene,enemy_window_list);
	scene.addChild(enemy_window);
	// status window
	status_window = statusWindow(scene,600,400);
	// status_window.dir = OPEN;


	scene.addChild(status_window);

	// var s_window = ntBattleWindow(scene);

	

	//==================================================== 各キャラ作成
	// 敵キャラ
	// 初期化
	battle.enemy = new Array();
	for(var i = 0; i < enemy_list[num].length; i++){
		battle.enemy[i] = enemyChara(scene,enemy_list[num][i],enemy_shoki[num][i],life_gage);
		// 個体識別用キャラナンバープロパティ追加
		battle.enemy[i].number = 'e' + i ;
		battle.enemy[i].frame = 4;
		battle.enemy[i].status.touroku(scene,info.x,info.y,battle.enemy[i],bg);
		scene.insertBefore(battle.enemy[i],bg);
	}
	// キャラネーム
	var chara_name = new Array();
	for( var i = 0; i < list.length; i++){
		chara_name[i] = labelBase(list[i].name,52,64+12 + 48 * i);
		chara_name[i].color = 'black';
		chara_name[i].font = "14px 'ＭＳ Ｐ明朝'";
		//scene.addChild(chara_name[i]);
	}
	// キャラ作成
	var chara = new Array();
	// 初期化
	battle.chara = new Array();
	// メニューキャラ＆バトルキャラ作成
	for(var i = 0; i < list.length; i++){
		// メニューキャラ
		chara[i] = menuChara(list[i],12,96 + i*48);
		scene.addChild(chara[i]);
		// バトルキャラ
		battle.chara[i] = battleChara(scene,list[i],12,96+i*48,bg,info.shoki,battle_window,item_window,life_gage);
		battle.chara[i].frame = 1;
		// 個体識別用キャラナンバープロパティ追加
		battle.chara[i].number = 'p' + i ;
		scene.addChild(battle.chara[i]);
	}
	// ターン順番配列作成( 開始時 )
	var order = turnOrder(battle.chara.length,battle.enemy.length);
	// ターン処理用に合計人数を代入
	var chara_sum = battle.chara.length + battle.enemy.length;
	// ============================= シーン定期処理
	var start_flag = false;
	var is_deployed = false;
	var is_movetouch = false; // タッチアクション追加を重複しないようにフラグ管理
	scene.count = 0;
	var turn_change_count = 0;

	var enemy_survivor = new Array();
	for( var i = 0; i < battle.enemy.length; i++){
		if( battle.enemy[i].status.liv === true ){
			enemy_survivor.push(i);
		}
	}

// info window
	var menu1_list = new Array();
	menu1_list[0] = labelBase(quest_info[num].no,0,0);
	menu1_list[1] = labelBase(quest_info[num].win,0,0);
	menu1_list[2] = labelBase(quest_info[num].lose,0,0);
	for(var i = 0; i < menu1_list.length; i++){
		menu1_list[i].color = 'whitesmoke';	
	}
	var default_menu_1 = new Array();
	default_menu_1[0] = labelBase('クエスト　ナンバー',0,0);
	default_menu_1[1] = labelBase('勝利条件',0,0);
	default_menu_1[2] = labelBase('敗北条件',0,0);
	for(var i = 0; i < default_menu_1.length; i++){
		default_menu_1[i].color = 'darkorange';
	}
	menu1_window = infoWindow(scene,300,200,menu1_list,default_menu_1);
	menu1_window.moveTo(250,114);
	
	// menu1_window.dir = OPEN;

// list window
	var default_menu_2 = new Array();
	default_menu_2[0] = labelBase('player',0,0);
	default_menu_2[1] = labelBase('enemy',0,0);
	for(var i = 0; i < default_menu_2.length; i++){
		default_menu_2[i].color = 'darkorange';
	}
	menu2_window = listWindow(scene,600,400,default_menu_2);	
	menu2_window.moveTo(100,24);

	scene.addChild(menu1_window);
	scene.addChild(menu2_window);

	scene.addEventListener(Event.TOUCH_START,function(e){
		// window オープン時に味方キャラとwindow以外をクリックしたらwindow消す処理
		var is_chara = false;
		if( is_info_window === false ){
			is_chara = removeWindow(e,battle_window,item_window);	
		}
		

		// window 以外クリックで移動範囲tip削除フラグ (制作途中で作ったから今は必要か不明)
		var echek = true;
		for(var i = 0; i < battle.enemy.length; i++){
			if( (e.x >= battle.enemy[i].x && e.x <= battle.enemy[i].x+32 &&
				 e.y >= battle.enemy[i].y && e.y <=battle.enemy[i].y+32) ){
				echek = false;
				break;
			}
		}
		var wcheck = true;
		if( battle_window.scaleY !==0 ){
			if( (e.x > battle_window.x && e.x <= battle_window.x+100 &&
					 e.y > battle_window.y && e.y <=battle_window.y+100) && echek ){
				wcheck = false;
			}	
		}
		if( wcheck && echek ){
			is_range = false;
		}
		if( enemy_window.dir === OPEN || enemy_window.dir === WAIT){
			if( !(e.x > enemy_window.x && e.x <= enemy_window.x+120 &&
					 e.y > enemy_window.y && e.y <=enemy_window.y+get_height_of_group(enemy_window))){
				if( echek ){
					enemy_window.dir = CLOSE;
				}
			}
		}
		//
		// var atwincheck = false;

		// 攻撃武器選択後敵キャラ以外をクリックしたらキャンセル処理
		if( is_att_range === true && att_window.scaleY <= 0 ){
			var atcheck = false;
			for( var i = 0; i < battle.enemy.length; i++ ){
				if((e.x > battle.enemy[i].x && e.x <= battle.enemy[i].x+32 &&
					 e.y > battle.enemy[i].y && e.y <=battle.enemy[i].y+32)){
					atcheck = true;
					break;
				}
			}
			if( !atcheck ){
				for(var j = 0; j < range_tip_a.length; j++){
					scene.removeChild(range_tip_a[j]);
				}
				is_att_range = false;
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
			}
		}
	});
	scene.addEventListener(Event.ENTER_FRAME,function(){
		if(battle.view == 5 && ! is_deployed ){
			for(var i = 0; i < shoki_label.length; i++){
				scene.insertBefore(shoki_label[i],bg);
			}
			is_deployed = true;
		}
		// 全員配置完了したらstart_flag をtrue に。
		for(var i = 0; i < info.shoki.length; i++){
			if( arrange.battlemap[info.shoki[i][0]][info.shoki[i][1]].shoki === true ){
				start_flag = true;
			}else{
				start_flag = false;
				break;
			}
		}
		if( start_flag === true ){
			start_log.tl.fadeIn(15).fadeOut(10).loop();
		}
		// バトルスタート後
		if(battle.flag === true){
			if( battle.enemy.length - arrange.dead.e.length === 0 ){
				is_countup = false;
				is_action = false;
				battle.flag = false;
				scene.tl.delay(30).then(function(){toEpilogue(scene);});
				//.then(function(){game.pushScene(add_epilogue_1())});
				console.log('ステージクリアー');
			}
			if( battle.chara.length - arrange.dead.p.length === 0 ){
				is_countup = false;
				is_action = false;
				battle.flag = false;
				scene.tl.delay(30).then(function(){gameOver(scene);});
				console.log('ゲームオーバー');
			}
			// 死んだ敵チェック
			for( var i = 0; i < battle.enemy.length; i++){
				if(battle.enemy[i].status.liv === false && battle.enemy[i].x <= 800){
					arrange.dead.e.push(battle.enemy[i].number);
						for( var j = order.length-1; j >= 0; j--){
							if(order[j] === 'e'){
								order.splice(j,1);
								break;
							}
						}
						order = order.splice(performed);
						console.log(order);
						chara_sum = order.length;
						performed = 0;
						scene.removeChild(triangle_line);
						triangle = add_triangle(order);　// 三角配列作成 作り直し
						triangle_line = new Group();
						triangle_line = add_triangle_line(triangle_line,triangle);　// グループ化
						scene.insertBefore(triangle_line,button);

					var livmark = hereIndex2( battle.enemy[i] );
					// 衝突配列とキャラ位置情報消す
					arrange.detect[livmark[0]][livmark[1]] = 0;
					arrange.enemy[livmark[0]][livmark[1]] = 0;
					// end_mark はキャラ番号と対応しているからキャラ番号と同じ番号のend_markを消す
					// (end_mark が出てたらね)
					if( end_mark_e[i] !== undefined ) scene.removeChild(end_mark_e[i]);
					battle.enemy[i].moveTo(1000,1000);
					scene.removeChild(battle.enemy[i]);
				}
			}
			// 死んだ味方チェック
			for( var i = 0; i < battle.chara.length; i++){
				if(battle.chara[i].status.liv === false && battle.chara[i].y <= 800){
					arrange.dead.p.push(battle.chara[i].number);
					console.log(order);
					if( battle.chara[i].acted === false ){
						for( var j = order.length-1; j >= 0; j--){
							if(order[j] === 'p'){
								order.splice(j,1);
								break;
							}
						}
						order = order.splice(performed);
						chara_sum = order.length;
						performed = 0;
						scene.removeChild(triangle_line);
						triangle = add_triangle(order);　// 三角配列作成 作り直し
						triangle_line = new Group();
						triangle_line = add_triangle_line(triangle_line,triangle);　// グループ化
						scene.insertBefore(triangle_line,button);
					}
					var livmark = hereIndex2( battle.chara[i] );
					// 衝突配列とキャラ位置情報消す
					arrange.detect[livmark[0]][livmark[1]] = 0;
					arrange.chara[livmark[0]][livmark[1]] = 0;
					// end_mark はキャラ番号と対応しているからキャラ番号と同じ番号のend_markを消す
					// (end_mark が出てたらね)
					if( end_mark[i] !== undefined ) scene.removeChild(end_mark[i]);
					battle.chara[i].moveTo(1000,1000);
					scene.removeChild(battle.chara[i]);
				}
			}
			
			if( is_countup === true ){
				this.count++;
				if(this.count % 30 == 0){
					is_countup = false;
					console.log(order);
					player_turn = playerTurn(order[performed]);
					if(player_turn){
						scene.removeChild(phase_log_e);
						scene.addChild(phase_log);
						// phase_label.text = 'player';
						phaseMessage(this);
					}else{ // 敵ターン処理
						scene.removeChild(phase_log);
						scene.addChild(phase_log_e);
						// phase_label.text = 'com';
						var enemy_action_number = enemy_survivor[act_enemy];
						var is_liv = true;
						for( var i = 0; i < arrange.dead.e.length; i++ ){
							if( arrange.dead.e[i] === battle.enemy[enemy_action_number].number ){
								is_liv = false;
								break;
							}
						}
						if(is_liv){
							battle.enemy[enemy_action_number].status.action(enemy_action_number);
						}else{
							is_countup = true;
							this.count+=29;
							act_enemy++;
						}
					}
				}
			}else{

			}
			// 移動処理
			if( is_range === true ){
				if(is_movetouch === false){//&& is_countup === false
					for( var i = 0; i < move_tip.length; i++){
						move_tip[i].addEventListener(Event.TOUCH_START,function(e){
							if(player_turn && is_moveend_window === false && is_att_range === false && is_countup === false ){
								// tip範囲の持ち主がプレイヤーキャラか敵かを識別 
								var porc = false;
								// プレイヤーならどのキャラかも
								for(var i = 0; i < battle.chara.length; i++){
									if( battle.chara[i].number === select_chara ){
										var move_chara = battle.chara[i];
										porc = true;
										break;
									}
								}
								// tip範囲の持ち主がプレイヤーキャラならば
								if(porc == true){
									// 移動中でなければ
									if(move_result.length == 0){
										move_result = moveSearch(e,select_chara);　// 移動経路配列を受け取る	
									}
									move_chara.mcount = 1;
									//moveStart(move_chara,select_chara,e,scene); // player 移動選択時の移動処理
								}	
							}
						})
					}
					is_movetouch = true;	
				}
			}else{
				is_movetouch = false;
			}
			if( performed === chara_sum ){
				// ターン終了
				is_countup = false;
				if(triangle_line.childNodes.length === 0){
					turn_change_count++;
					if( turn_change_count === 20 ){
						trunEndMessage(scene);
					}
					if( turn_change_count > 50 ){
						performed = 0;
						act_enemy = 0;
						var c_lives = battle.chara.length - arrange.dead.p.length;
						var e_lives = battle.enemy.length - arrange.dead.e.length;
						chara_sum = c_lives + e_lives;
						order = turnOrder(c_lives,e_lives);
						console.log(order);
						for(var i = 0; i < battle.chara.length; i++){
							battle.chara[i].opacity = 1;
							battle.chara[i].acted = false;
							scene.removeChild(end_mark[i]);
						}
						for( var i = 0; i < battle.enemy.length; i++){
							battle.enemy[i].opacity = 1;
							scene.removeChild(end_mark_e[i]);
						}
						enemy_survivor = []; // 初期化
						for( var i = 0; i < battle.enemy.length; i++){
							if( battle.enemy[i].status.liv === true ){
								enemy_survivor.push(i);
							}
						}
						turn_no++;
						turn_label.text = 'ターン : ' + turn_no;

						triangle = add_triangle(order);　// 三角配列作成
						triangle_line = new Group();
						triangle_line = add_triangle_line(triangle_line,triangle);　// グループ化
						scene.insertBefore(triangle_line,button);

						is_countup = true;
						turn_change_count = 0;
					}
				}
			}
		}
	});
	return scene;
}
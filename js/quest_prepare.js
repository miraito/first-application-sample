// マップ作成
var addmap = function(scene,label,mapx,mapy){
	// 戦闘エリアサイズ 672*432 tipサイズ　32
	var x = mapx*32;
	var y = mapy*32;
	var map = map1();//addBaseMap(x,y);
	var reference = {};
	map.addEventListener(Event.TOUCH_START,function(e){
		if(battle.view == 5){
			reference.x = e.x;
			reference.y = e.y;
		}
	});
	map.addEventListener(Event.TOUCH_MOVE,function(e){
		if(battle.view == 5){
			if( move_result.length === 0 && move_result_e.length ===0 && is_moveend_window === false && is_info_window === false){
				if( reference.x < e.x){
					if( move_result.length === 0 && move_result_e.length ===0 && is_moveend_window === false){
						if(this.x + 4 <= 128 ){
							this.x +=4;
							for(var i = 0; i < label.length; i++){
								label[i].x +=4;
								if( battle.chara[i].flag === true){
									if(battle.chara[i].status.liv == true){
										battle.chara[i].x +=4;
										battle.chara[i].place.x +=4;	
									}
									
								}
							}
							for( var i = 0; i < arrange.battlemap.length; i++ ){
								for( var j = 0; j < arrange.battlemap[i].length; j++){
									arrange.battlemap[i][j].x +=4;
								}
							}
							for( var i = 0; i < move_tip.length; i++){
								move_tip[i].x +=4;
							}
							for( var i = 0; i < battle.enemy.length; i++){
								if(battle.enemy[i].status.liv == true){
									battle.enemy[i].x +=4;
								}
							}
							moveend_window.x += 4;
							for( var i = 0; i < end_mark.length; i++){
								if( end_mark[i] !== undefined){
									end_mark[i].x += 4;
								}
							}
							for( var i = 0; i < end_mark_e.length; i++){
								if( end_mark_e[i] !== undefined){
									end_mark_e[i].x += 4;
								}
							}
							for( var i = 0; i < range_tip_a.length; i++ ){
								range_tip_a[i].x +=4;
							}
						}
					}
				}else if( reference.x > e.x){
					if( move_result.length === 0 && move_result_e.length ===0 ){
						if(this.x + x -4 >= 800 ){
							this.x -=4;
							for(var i = 0; i < label.length; i++){
								label[i].x -=4;
								if( battle.chara[i].flag === true){
									if(battle.chara[i].status.liv == true){
										battle.chara[i].x -=4;
										battle.chara[i].place.x -=4;	
									}
									
								}
							}
							for( var i = 0; i < arrange.battlemap.length; i++ ){
								for( var j = 0; j < arrange.battlemap[i].length; j++){
									arrange.battlemap[i][j].x -=4;
								}
							}
							for( var i = 0; i < move_tip.length; i++){
								move_tip[i].x -=4;
							}
							for( var i = 0; i < battle.enemy.length; i++){
								if(battle.enemy[i].status.liv == true){
									battle.enemy[i].x -=4;
								}
							}
							moveend_window.x -= 4;
							for( var i = 0; i < end_mark.length; i++){
								if( end_mark[i] !== undefined){
									end_mark[i].x -= 4;
								}
							}
							for( var i = 0; i < end_mark_e.length; i++){
								if( end_mark_e[i] !== undefined){
									end_mark_e[i].x -= 4;
								}
							}
							for( var i = 0; i < range_tip_a.length; i++ ){
								range_tip_a[i].x -=4;
							}
						}
					}
				}
				if( reference.y < e.y){
					if( move_result.length === 0 && move_result_e.length ===0 ){
						if(this.y + 4 <= 0 ){
							this.y +=4;
							for(var i = 0; i < label.length; i++){
								label[i].y +=4;
								if( battle.chara[i].flag === true){
									if(battle.chara[i].status.liv == true){
										battle.chara[i].y +=4;
										battle.chara[i].place.y +=4;
									}
									
								}
							}
							for( var i = 0; i < arrange.battlemap.length; i++ ){
								for( var j = 0; j < arrange.battlemap[i].length; j++){
									arrange.battlemap[i][j].y +=4;
								}
							}
							for( var i = 0; i < move_tip.length; i++){
								move_tip[i].y +=4;
							}
							for( var i = 0; i < battle.enemy.length; i++){
								if(battle.enemy[i].status.liv == true){
									battle.enemy[i].y +=4;
								}
							}
							moveend_window.y += 4;
							for( var i = 0; i < end_mark.length; i++){
								if( end_mark[i] !== undefined){
									end_mark[i].y += 4;
								}
							}
							for( var i = 0; i < end_mark_e.length; i++){
								if( end_mark_e[i] !== undefined){
									end_mark_e[i].y += 4;
								}
							}
							for( var i = 0; i < range_tip_a.length; i++ ){
								range_tip_a[i].y +=4;
							}
						}
					}
				}else if( reference.y > e.y){
					if( move_result.length === 0 && move_result_e.length ===0 ){
						if(this.y + y -4 >= 448 -32*3){
							this.y -=4;
							for(var i = 0; i < label.length; i++){
								label[i].y -=4;
								if( battle.chara[i].flag === true){
									if(battle.chara[i].status.liv == true){
										battle.chara[i].y -=4;
										battle.chara[i].place.y -=4;
									}
									
								}
							}
							for( var i = 0; i < arrange.battlemap.length; i++ ){
								for( var j = 0; j < arrange.battlemap[i].length; j++){
									arrange.battlemap[i][j].y -=4;
								}
							}
							for( var i = 0; i < move_tip.length; i++){
								move_tip[i].y -=4;
							}
							for( var i = 0; i < battle.enemy.length; i++){
								if(battle.enemy[i].status.liv == true){
									battle.enemy[i].y -=4;
								}
							}
							moveend_window.y -= 4;
							for( var i = 0; i < end_mark.length; i++){
								if( end_mark[i] !== undefined){
									end_mark[i].y -= 4;
								}
							}
							for( var i = 0; i < end_mark_e.length; i++){
								if( end_mark_e[i] !== undefined){
									end_mark_e[i].y -= 4;
								}
							}
							for( var i = 0; i < range_tip_a.length; i++ ){
								range_tip_a[i].y -=4;
							}
						}
					}
				}
			}
			
			reference.x = e.x;
			reference.y = e.y;
		}
	})
	var enemy_place = new Array();
	var is_place = false;
	map.addEventListener(Event.ENTER_FRAME,function(){
		if(battle.view == 0){
			// 敵キャラズレ防止に初期位置獲得
			if(!is_place){
				for( var i = 0; i < battle.enemy.length; i++){
					enemy_place[i] = {
						x : battle.enemy[i].x,
						y : battle.enemy[i].y,
					}
				}
				is_place = true;	
			}
			
			if( this.x + x >800 ){
				if(this.x + x -3 >= 800){
					this.x -=3;
					for( var i = 0; i < battle.enemy.length; i++){
						battle.enemy[i].x -=3;
					}
				}else{
					this.x = 800 - x;
				}
			}
			if( this.x <= 800-x )battle.view++;
		}else if( battle.view == 1 ){
			if( this.y + y > 352 ){
				if(this.y + y -3 >= 352){
					this.y -=3;
					for( var i = 0; i < battle.enemy.length; i++){
						battle.enemy[i].y -=3;
					}
				}else{
					this.y = 352 - y;
				}
			}
			if( this.y <= 352-y )battle.view++;
		}else if( battle.view == 2 ){
			if( this.x < 128 ){
				if(this.x +3 <= 128){
					this.x +=3;
					for( var i = 0; i < battle.enemy.length; i++){
						battle.enemy[i].x +=3;
					}
				}else{
					this.x = 128;
				}
			}
			if( this.x >= 128 )battle.view++;
		}else if( battle.view == 3 ){
			if( this.y < 0 ){
				if(this.y +3 <= 0){
					this.y +=3;
					for( var i = 0; i < battle.enemy.length; i++){
						battle.enemy[i].y +=3;
					}
				}else{
					this.y = 0;
				}
			}
			if( this.y >= 0 )battle.view++;
		}else if( battle.view === 4 ){
			for( var i = 0; i < battle.enemy.length; i++){
				battle.enemy[i].x =enemy_place[i].x;
				battle.enemy[i].y =enemy_place[i].y;
			}
			battle.view++;
		}
	});
	scene.insertBefore(map,scene.firstChild);
	return map;
}

// 初期位置に番号ふる
var shokiLabel = function(info){
	var label = new Array();
	for( var i = 0; i < info.length; i++ ){
		var text = i + 1;
		label[i] = labelBase(text,arrange.battlemap[info[i][0]][info[i][1]].x + 14,
			arrange.battlemap[info[i][0]][info[i][1]].y + 9);
		label[i].color = 'yellow';
		label[i].font = '15px "MSゴシック"';
	}
	return label;
}

var add_quest_menu_label = function(text,x,y){
	var label = labelBase(text);
	label.font = "14px 'ＭＳ Ｐ明朝'";
	label.color = 'gold';
	label.moveTo(x,y);
	return label;
};
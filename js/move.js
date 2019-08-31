var rangeTip = function(){ // 緑チップ
	var range = new Sprite(32,32);
	var tip = game.assets['images/block.png'];
	var image = new Surface(32,32);
	image.draw(tip,48,16,16,16,0,0,32,32);
	range.image = image;
	range.opacity = 0.5;
	return range;
}
var rangeTip2 = function(){　// 赤チップ
	var range = new Sprite(32,32);
	var tip = game.assets['images/block.png'];
	var image = new Surface(32,32);
	image.draw(tip,48,208,16,16,0,0,32,32);
	range.image = image;
	range.opacity = 0.5;
	return range;
}
var moveRange = function( map,chara,mapx,mapy,scene,flag){
	var x = mapx*32;
	var y = mapy*32;
	// 既に出てるのを消去
	for( var k = 0; k < move_tip.length; k++){
		scene.removeChild(move_tip[k]);	
	}
	// 初期化
	move_tip = new Array();
	// move値取得
	var move = chara.status.move;
	var count = 0;
	// 現在地の配列番号情報取得
	var a; 
	var b; // array[a][b]
	if( flag === 'p' ){
		for(var i = 0; i < arrange.chara.length; i++){
			var is_set = arrange.chara[i].indexOf(chara.number);
			if( is_set !== -1 ){
				a = i;
				b = is_set; 
				break;
			}
		}
	}else if( flag === 'e' ){
		for(var i = 0; i < arrange.enemy.length; i++){
			var is_set = arrange.enemy[i].indexOf(chara.number);
			if( is_set !== -1 ){
				a = i;
				b = is_set; 
				break;
			}
		}
	}
	//moveCheck関数でa_move配列を変更
	moveCheck( a,b,mapx,mapy,move );
	for(var i = 0; i < arrange.a_move.length; i++){
		for( var j = 0; j < arrange.a_move[i].length; j++){
			if( arrange.a_move[i][j] !== -1){
				// 移動可能範囲のgrid情報取得
				var grid = {
					x: arrange.battlemap[i][j].x,
					y: arrange.battlemap[i][j].y
				};
				if(flag === 'p'){
					move_tip[count] = rangeTip();	
				}else if(flag === 'e'){
					move_tip[count] = rangeTip2();
				}
				
				move_tip[count].moveTo(grid.x,grid.y);
				move_tip[count].reference = {};
				// move_tip[count].addEventListener(Event.TOUCH_START,function(e){
				// 	this.reference.x = e.x;
				// 	this.reference.y = e.y;
				// });
				// move_tip[count].addEventListener(Event.TOUCH_MOVE,function(e){
				// 	if( move_result.length === 0 && move_result_e.length ===0 && is_moveend_window === false ){
				// 		if( this.reference.x < e.x){
				// 			if(map.x + 3 <= 128 ){
				// 				map.x +=3;
				// 				for(var i = 0; i < battle.chara.length; i++){
				// 					if( battle.chara[i].flag === true){
				// 						battle.chara[i].x +=3;
				// 						battle.chara[i].place.x +=3;
				// 					}
				// 				}
				// 				for( var i = 0; i < arrange.battlemap.length; i++ ){
				// 					for( var j = 0; j < arrange.battlemap[i].length; j++){
				// 						arrange.battlemap[i][j].x +=3;
				// 					}
				// 				}
				// 				for( var i = 0; i < move_tip.length; i++){
				// 					move_tip[i].x +=3;
				// 				}
				// 				for( var i = 0; i < battle.enemy.length; i++){
				// 					battle.enemy[i].x +=3;
				// 				}
				// 			}
				// 		}else if( this.reference.x > e.x){
				// 			if(map.x + x -3 >= 800 ){
				// 				map.x -=3;
				// 				for(var i = 0; i < battle.chara.length; i++){
				// 					if( battle.chara[i].flag === true){
				// 						battle.chara[i].x -=3;
				// 						battle.chara[i].place.x -=3;
				// 					}
				// 				}
				// 				for( var i = 0; i < arrange.battlemap.length; i++ ){
				// 					for( var j = 0; j < arrange.battlemap[i].length; j++){
				// 						arrange.battlemap[i][j].x -=3;
				// 					}
				// 				}
				// 				for( var i = 0; i < move_tip.length; i++){
				// 					move_tip[i].x -=3;
				// 				}
				// 				for( var i = 0; i < battle.enemy.length; i++){
				// 					battle.enemy[i].x -=3;
				// 				}
				// 			}
				// 		}
				// 		if( this.reference.y < e.y){
				// 			if(map.y + 3 <= 0 ){
				// 				map.y +=3;
				// 				for(var i = 0; i < battle.chara.length; i++){
				// 					if( battle.chara[i].flag === true){
				// 						battle.chara[i].y +=3;
				// 						battle.chara[i].place.y +=3;
				// 					}
				// 				}
				// 				for( var i = 0; i < arrange.battlemap.length; i++ ){
				// 					for( var j = 0; j < arrange.battlemap[i].length; j++){
				// 						arrange.battlemap[i][j].y +=3;
				// 					}
				// 				}
				// 				for( var i = 0; i < move_tip.length; i++){
				// 					move_tip[i].y +=3;
				// 				}
				// 				for( var i = 0; i < battle.enemy.length; i++){
				// 					battle.enemy[i].y +=3;
				// 				}
				// 			}
				// 		}else if( this.reference.y > e.y){
				// 			if(map.y + y -3 >= 448 -32*3){
				// 				map.y -=3;
				// 				for(var i = 0; i < battle.chara.length; i++){
				// 					if( battle.chara[i].flag === true){
				// 						battle.chara[i].y -=3;
				// 						battle.chara[i].place.y -=3;
				// 					}
				// 				}
				// 				for( var i = 0; i < arrange.battlemap.length; i++ ){
				// 					for( var j = 0; j < arrange.battlemap[i].length; j++){
				// 						arrange.battlemap[i][j].y -=3;
				// 					}
				// 				}
				// 				for( var i = 0; i < move_tip.length; i++){
				// 					move_tip[i].y -=3;
				// 				}
				// 				for( var i = 0; i < battle.enemy.length; i++){
				// 					battle.enemy[i].y -=3;	
				// 				}
				// 			}
				// 		}
				// 	}
				// 	this.reference.x = e.x;
				// 	this.reference.y = e.y;
				// })
				move_tip[count].addEventListener(Event.ENTER_FRAME,function(){
					if( is_range == false ){
						scene.removeChild(this);		
					}
				});
				scene.insertBefore(move_tip[count],chara);
				count++;
			}
		}
	}
}

var moveCheck = function(a,b,mapx,mapy,move){
	// 移動値取得
	var move_remain = move;
	// 初期化
	arrange.a_move = new Array();
	// 配列に-1を代入
	arrange.a_move = addlocation(mapx,mapy,-1);
	// 現在地情報代入(値 = move)
	arrange.a_move[a][b] = move;
	// 上下左右行き止まりチェック（配列）
	var upcheck = function (num){return num-1 >= 0;}
	var downcheck = function (num){return num+1 <= arrange.detect[0].length-1;}
	var leftcheck = function (num){return num-1 >= 0;}
	var rightcheck = function (num){return num+1 <= arrange.detect.length-1;}
	// 4方向移動可能判定 移動可能な場合消費後move値を代入
	var check = function( move ){
		for( var i = 0; i < arrange.a_move.length; i++){
			for( var j = 0; j < arrange.a_move[i].length; j++){
				if( arrange.a_move[i][j] === move ){
					if( upcheck(j) && (arrange.detect[i][j-1] === 0) ){
						var dec = arrange.move[i][j-1];
						if( move-dec >= 0 ){
							if( arrange.a_move[i][j-1] == -1 ){
								arrange.a_move[i][j-1] = move-dec;	
							}
						}
					}
					if( downcheck(j) && (arrange.detect[i][j+1] === 0) ){
						var dec = arrange.move[i][j+1];
						if( move-dec >= 0 ){
							if( arrange.a_move[i][j+1] == -1 ){
								arrange.a_move[i][j+1] = move-dec;
							}
						}
					}
					if( leftcheck(i) && (arrange.detect[i-1][j] === 0) ){
						var dec = arrange.move[i-1][j];
						if( move-dec >= 0 ){
							if( arrange.a_move[i-1][j] == -1 ){
								arrange.a_move[i-1][j] = move-dec;
							}
						}
					}
					if( rightcheck(i) && (arrange.detect[i+1][j] === 0) ){
						var dec = arrange.move[i+1][j];
						if( move-dec >= 0 ){
							if( arrange.a_move[i+1][j] == -1 ){
								arrange.a_move[i+1][j] = move-dec;
							}
						}
					}
				}
			}
		}
	}
	// move値が1になるまでループしてa_moveに書き込み
	while( move_remain > 0 ){
		check(move_remain);
		move_remain--;
	}
}

var moveStart2 = function(move_chara,select_chara,e,scene){
	move_result = moveSearch(e,select_chara);　// 移動経路配列を受け取る
	move_chara.mcount = 1;
}
var moveStart = function(scene,chara){
	chara.addEventListener(Event.ENTER_FRAME,function(){
		if( move_result.length !== 0 && this.number === select_chara){
			if( move_result.length - this.mcount >= 0 ){
				var x = move_result[move_result.length-this.mcount][0];
				var y = move_result[move_result.length-this.mcount][1];
				var toX = arrange.battlemap[x][y].x;
				var toY = arrange.battlemap[x][y].y;
				if( this.x !== toX ){
					if( this.x - toX > 0 ){
						this.dir = LEFT;
						this.x -=8;
					}else{
						this.dir = RIGHT;
						this.x +=8;
					}
				}
				if( this.y !== toY ){
					if( this.y - toY > 0 ){
						this.dir = UP;
						this.y -=8;
					}else{
						this.dir = DOWN;
						this.y +=8;
					}
				}
				if( this.x === toX && this.y === toY ){
					this.mcount++;
				}
			}else{//　移動終了後
				if( !is_moveend_window ){
					move_result = [];　// 配列リセット
					var goX;
					if( this.x > 800 - 32*5 ){
						goX = this.x-116;
					}else{
						goX = this.x + 48;
					}
					moveend_window.moveTo(goX,this.y-16);
					scene.insertBefore(moveend_window,att_window);
					if( moveend_window.dir == CLOSE){
						moveend_window.dir = OPEN;
					}else if( moveend_window.dir == WAIT ){
						moveend_window.scaleY = 0;
						moveend_window.dir = OPEN;
					}
					is_moveend_window = true;	
				}
			}
		}
	});
};
var moveStart_e = function(scene,chara,bg){
	chara.addEventListener(Event.ENTER_FRAME,function(){
		if( move_result_e.length !== 0 && this.on === true){
			if( move_result_e.length-1 >= this.mcount  ){
				var route = move_result_e[this.mcount];
				var x = route[0];
				var y = route[1];
				var toX = arrange.battlemap[x][y].x;
				var toY = arrange.battlemap[x][y].y;
				if( this.x !== toX ){
					if( this.x - toX > 0 ){
						this.dir = LEFT;
						this.x -=8;
					}else{
						this.dir = RIGHT;
						this.x +=8;
					}
				}
				if( this.y !== toY ){
					if( this.y - toY > 0 ){
						this.dir = UP;
						this.y -=8;
					}else{
						this.dir = DOWN;
						this.y +=8;
					}
				}
				if( this.x === toX && this.y === toY ){
					this.mcount++;
				}
			}else{
				move_result_e = [];　// 配列リセット
				var here = hereIndex2(this);
				// 上下左右に攻撃できるplayer キャラがいるかを検索(いたら全員が配列で返ってくる)
				var near = is_near(here); // 配列番号とキャラの配列番号がリンク。だからundefinedもある。
				if( near.length !== 0 ){
					// 居る場合、一番HP少ない敵を攻撃
					enemy_attack(scene,chara,near,bg);
				}else{
					endSet_e(scene,chara,bg);
					chara.dir = STAY;
					is_countup = true;
				}
			}
		}
	});
}
var moveSearch = function(e,select_chara){
	var x; // 押した場所の配列番号
	var y;　// 押した場所の配列番号
	for( var i = 0; i < arrange.battlemap.length; i++){
		for( var j = 0; j < arrange.battlemap[i].length; j++){
			if( arrange.battlemap[i][j].x <= e.x &&
				arrange.battlemap[i][j].x+32 >= e.x && 
				arrange.battlemap[i][j].y <= e.y && 
				arrange.battlemap[i][j].y+32 >= e.y){
				x = i;
				y = j;
			}
		}
	}
	// 現在地のmove値（消費後）
	var here = arrange.a_move[x][y];
	// キャラ位置
	var target;
	for( var i = 0; i < battle.chara.length; i++){
		if( battle.chara[i].number === select_chara ){
			target = battle.chara[i].status.move;
		}
	}
	var upcheck = function (num){return num-1 >= 0;}
	var downcheck = function (num){return num+1 <= arrange.detect[0].length-1;}
	var leftcheck = function (num){return num-1 >= 0;}
	var rightcheck = function (num){return num+1 <= arrange.detect.length-1;}
	
	var check = function(target,xx,yy,here,root){
		// 移動経路座標情報格納配列
		var root = new Array();
		root[0] = [xx,yy];
		var count = 1;　// 各座標move値
		var number = 0;
		var x = xx;
		var y = yy;
		while( number <= target-1 ){
			if( upcheck(y) && arrange.a_move[x][y-1] > here ){
				if( arrange.a_move[x][y-1] > number ){
					number = arrange.a_move[x][y-1];
					root[count] = [x,y-1];
					if( number >= target-1 ) break;
				}
			}
			if( downcheck(y) && arrange.a_move[x][y+1] > here ){
				if( arrange.a_move[x][y+1] > number ){
					number = arrange.a_move[x][y+1];
					root[count] = [x,y+1];
					if( number >= target-1 ) break;
				}
			}
			if( leftcheck(x) && arrange.a_move[x-1][y] > here ){
				if( arrange.a_move[x-1][y] > number ){
					number = arrange.a_move[x-1][y];
					root[count] = [x-1,y];
					if( number >= target-1 ) break;
				}
			}
			if( rightcheck(x) && arrange.a_move[x+1][y] > here ){
				if( arrange.a_move[x+1][y] > number ){
					number = arrange.a_move[x+1][y];
					root[count] = [x+1,y];
					if( number >= target-1 ) break;
				}
			}
			x = root[count][0];
			y = root[count][1];
			count++;
		}
		var result = [number,root];
		return result;
	}
	var result = check(target,x,y,here,root);
	var number = result[0];
	var root = result[1];
	return root;
}
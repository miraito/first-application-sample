var search_near_target = function(scene,mapx,mapy,chara){
	// 現在地の配列番号取得
	var here = hereIndex2(chara);
	// player キャラの位置情報取得(index)
	var player_index = new Array();
	for( var i = 0; i < battle.chara.length; i++){
		if( battle.chara[i].status.liv === true ){
			player_index[i] = hereIndex2(battle.chara[i]);
		}
	}
	// e_moveに距離情報書き込み //衝突、消費move値も考慮して

	var temp_move = search_distance(here,mapx,mapy); // 自分の仮move値(現在地)が返ってくる

	var check = function( index ){
		var check = 0;
		var array = [];
		var x = index[0];
		var y = index[1];
		if( upcheck(y) && arrange.e_move[x][y-1] !== -1 ){
			check = arrange.e_move[x][y-1];
			array = [x,y-1];
		}
		if( downcheck(y) && arrange.e_move[x][y+1] !== -1 ){
			if( check < arrange.e_move[x][y+1] ){
				check = arrange.e_move[x][y+1];
				array = [x,y+1];
			}
		}
		if( leftcheck(x) && arrange.e_move[x-1][y] !== -1 ){
			if( check < arrange.e_move[x-1][y] ){
				check = arrange.e_move[x-1][y];
				array = [x-1,y];
			}
		}
		if( rightcheck(x) && arrange.e_move[x+1][y] !== -1 ){
			if( check < arrange.e_move[x+1][y] ){
				check = arrange.e_move[x+1][y];
				array = [x+1,y];
			}
		}
		return [check,array];
	}
	// キャラ位置情報を元に上下左右チェックして一番近いキャラの一番近い隣接マスを取得
	var target_no = new Array();　// playerの上下左右にある一番近い数字とそのmap配列番号を格納
	var number; // その時のキャラ配列番号(キャラの配列番号とリンク)を格納
	for( var i = 0; i < player_index.length; i++ ){
		if( player_index[i] !== undefined ){
			if( target_no.length === 0 ){
				target_no = check(player_index[i]);
				number = i;
			}else{
				var check_result = check(player_index[i]);
				if( target_no[0] <  check_result[0]){
					target_no = check_result;
					number = i;
				}
			}	
		}
		
	}
	console.log(target_no);
	
	
	var path_root = function(target_no){
		var start_no = target_no[0];
		var x = target_no[1][0];
		var y = target_no[1][1];

		var path_number = start_no;
		var root_no = new Array();
		if( upcheck(y) && arrange.e_move[x][y-1] !== -1 ){
			if( path_number < arrange.e_move[x][y-1] ){
				path_number = arrange.e_move[x][y-1];
				root_no = [x,y-1];
			}
		}
		if( downcheck(y) && arrange.e_move[x][y+1] !== -1 ){
			if( path_number < arrange.e_move[x][y+1] ){
				path_number = arrange.e_move[x][y+1];
				root_no = [x,y+1];
			}
		}
		if( leftcheck(x) && arrange.e_move[x-1][y] !== -1 ){
			if( path_number < arrange.e_move[x-1][y] ){
				path_number = arrange.e_move[x-1][y];
				root_no = [x-1,y];
			}
		}
		if( rightcheck(x) && arrange.e_move[x+1][y] !== -1 ){
			if( path_number < arrange.e_move[x+1][y] ){
				path_number = arrange.e_move[x+1][y];
				root_no = [x+1,y];
			}
		}
		return [path_number,root_no];
	}
	//  キャラの本来の移動値
	var chara_move = chara.status.move;
	var pathway = [] 
	var target_no2 = target_no;
	var align_move = temp_move - chara_move;

	// 一番近いキャラに隣接する配列番号をゲットしたので、そこを基準に自分までの移動経路を取得
	if( align_move <= target_no2[0] ){
		pathway.unshift(target_no2[1]);
	}
	if( target_no[1].length !== 0 ){
		while( target_no2[0] !== temp_move ){
			target_no2 = path_root(target_no2);
			if( align_move <= target_no2[0] ){
				pathway.unshift(target_no2[1]);
			}
		}	
	}
	return pathway;
	
};

var search_distance = function(here,mapx,mapy){
	var a = here[0];
	var b = here[1];
	// mapの最大数*衝突情報の最大値(これで必ず全ヵ所に行ける)
	var move = mapx * mapy * 1;// TODO 本来は1 ではなくmaxdetect()を使う 
	// 最大値でmpaを検索
	var move_remain = move;
	// 初期化
	arrange.e_move = new Array();
	// 配列に-1を代入
	arrange.e_move = addlocation(mapx,mapy,-1);
	// 現在地情報代入(値 = move)
	arrange.e_move[a][b] = move;
	var flag = true;
	var check = function( move ){
		for( var i = 0; i < arrange.e_move.length; i++){
			for( var j = 0; j < arrange.e_move[i].length; j++){
				if( arrange.e_move[i][j] === move ){
					flag = false;
					if( upcheck(j) && (arrange.detect[i][j-1] === 0) ){
						var dec = arrange.move[i][j-1];
						if( move-dec >= 0 ){
							if( arrange.e_move[i][j-1] == -1 ){
								arrange.e_move[i][j-1] = move-dec;
								if(flag === false)flag = true;
							}
						}
					}
					if( downcheck(j) && (arrange.detect[i][j+1] === 0) ){
						var dec = arrange.move[i][j+1];
						if( move-dec >= 0 ){
							if( arrange.e_move[i][j+1] == -1 ){
								arrange.e_move[i][j+1] = move-dec;
								if(flag === false)flag = true;
							}
						}
					}
					if( leftcheck(i) && (arrange.detect[i-1][j] === 0) ){
						var dec = arrange.move[i-1][j];
						if( move-dec >= 0 ){
							if( arrange.e_move[i-1][j] == -1 ){
								arrange.e_move[i-1][j] = move-dec;
								if(flag === false)flag = true;
							}
						}
					}
					if( rightcheck(i) && (arrange.detect[i+1][j] === 0) ){
						var dec = arrange.move[i+1][j];
						if( move-dec >= 0 ){
							if( arrange.e_move[i+1][j] == -1 ){
								arrange.e_move[i+1][j] = move-dec;
								if(flag === false)flag = true;
							}
						}
					}
				}else{
					if(flag === false)flag = true;
				}
			}
		}
	}
	// 通れる場所が全て書き換わるまでループ
	while( flag === true ){
		flag = false;
		check(move_remain);
		move_remain--;
	}
	return move;
}
var upcheck = function (num){return num-1 >= 0;}
var downcheck = function (num){return num+1 <= arrange.detect[0].length-1;}
var leftcheck = function (num){return num-1 >= 0;}
var rightcheck = function (num){return num+1 <= arrange.detect.length-1;}

var is_near = function(here){
	var result = new Array();
	for( var i = 0; i < battle.chara.length; i++){
		var index = hereIndex2(battle.chara[i]);
		if( (here[0]  === index[0] && (here[1] + 1 === index[1] || here[1] - 1 === index[1])) ||
		 (here[1]  === index[1] && (here[0] + 1 === index[0] || here[0] - 1 === index[0]))){
			result[i] = battle.chara[i];
		}
	}
	return result;
}

var enemy_attack = function(scene,chara,near,bg){
	var player_hp;
	var target_chara;
	for( var i = 0; i < near.length; i++ ){
		if( near[i] !== undefined ){
			if( player_hp === undefined ){
				player_hp = near[i].status.hp;
				target_chara = near[i];
			}else{
				if( player_hp > near[i].status.hp ){
					player_hp = near[i].status.hp;
					target_chara = near[i];	
				}
			}
		}
		
	}
	// ターン終了準備をしてから攻撃	
	endSet_e(scene,chara,bg);
	chara.dir = STAY;
	// 攻撃開始
	// console.log(target_chara.status.name, '←こいつに攻撃する');
	game.pushScene(addbattleScene_e(target_chara,chara));
}

var cover_check = function(cover_range,here){
	console.log(cover_range);
	console.log(here);
	if( cover_range[0] <= here[0] && here[0] <= cover_range[2] &&
		cover_range[1] <= here[1] && here[1] <= cover_range[3]){
		return true;
	}else{
		return false;
	}
};
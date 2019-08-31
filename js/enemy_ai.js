// type_A : 一番近いキャラめがけて移動し、攻撃できるようになったら攻撃する。

var type_A = function(scene,mapx,mapy,chara,bg){
	// まずは隣接にplayer がいないかチェック
	// 現在地配列番号取得
	var here = hereIndex2(chara);
	// 上下左右に攻撃できるplayer キャラがいるかを検索(いたら全員が配列で返ってくる)
	var near = is_near(here); // 配列番号とキャラの配列番号がリンク。だからundefinedもある。
	
	if( near.length === 0 ){ // 居ない場合一番近いplayerキャラを探す
		// 一番近いplayerキャラを探して経路情報をもらう
		move_result_e = search_near_target(scene,mapx,mapy,chara);
		if( move_result_e.length === 0 ){ // player までの経路が無い場合待機
			endSet_e(scene,chara,bg);
			chara.dir = STAY;
			is_countup = true;
		}
		// あとはaddaction.js の追加イベント処理で移動
	}else{
		// 居る場合、一番HP少ない敵を攻撃
		enemy_attack(scene,chara,near,bg);
	}
};
var type_B = function(scene,mapx,mapy,chara,bg){
	var here = hereIndex2(chara); // 現在地
	var cover_range = chara.cover_range; // 守備範囲

	// まず移動攻撃可能なplayerキャラがいるかチェック
	var search_result = search_near_target(scene,mapx,mapy,chara);//一番近いplayerまでの経路配列取得
	console.log(search_result);
	if( search_result.length === 0 ){ // player までの経路が無い場合待機

		endSet_e(scene,chara,bg);
		chara.dir = STAY;
		is_countup = true;
	}else{
		var move_target = search_result[search_result.length-1]; //経路配列の最終地点を取得
		console.log(move_target);
		var can_move_attack = false; // 最終地点がキャラの隣かどうかチェック(つまり攻撃可能かどうか)
		for( var i = 0; i < battle.chara.length; i++ ){
			var player_index = hereIndex2(battle.chara[i]);
			if( (move_target[0] === player_index[0] &&
						(move_target[1] === player_index[1]-1 || move_target[1] === player_index[1]+1)) ||
				(move_target[1] === player_index[1] &&
						(move_target[0] === player_index[0]-1 || move_target[0] === player_index[0]+1))){
				can_move_attack = true;
				break;
			}
		}
		console.log(can_move_attack);
		if(can_move_attack){// 居たら移動攻撃
			console.log('移動攻撃');
			move_result_e = search_result;
		}else{
			// 次に守備範囲内にplayer キャラが入っていないかチェック
			var player_check;
			for(var i = 0; i < battle.chara.length; i++){
				var chara_index = hereIndex2(battle.chara[i]);
				var player_check = cover_check(cover_range,chara_index);
				if( player_check === true ){
					break;
				}
			}
			if(player_check){ 
				console.log('行動開始');
				move_result_e = search_result;
			}else{
				// 自分が守備範囲から出てたら戻る.出てなかったら待機
				var check = cover_check(cover_range,here);
				check = true; // TODO とりあえず戻る処理は後回し
				if(!check){
					console.log('戻ろう');
				}else{// 待機
					endSet_e(scene,chara,bg);
					chara.dir = STAY;
					is_countup = true;
				}
			}
		}
	}
	
};
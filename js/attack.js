var attackRange = function(scene){
	// キャラ識別
	var target_chara = targetChara();
	// 現在地配列番号取得
	var here = hereIndex2(target_chara);
	// 攻撃可能位置の配列番号取得
	var att_able = attSearch(here);
	//
	if( att_able.length !== 0 ){ // 攻撃できる相手がいる場合
		// 攻撃チップを出す
		attRange(scene,att_able);
		// 各ウィンドを閉めてフラグをfalseに
		battle_window.dir = CLOSE;
		moveend_window.dir = CLOSE;
		att_window.dir = CLOSE;
		is_moveend_window = false;
		is_att_range　= true;
		// キャンセルウィンド出す
		//attWindowOpen(target_chara);
	}
};

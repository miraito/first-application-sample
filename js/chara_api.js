// select_chara　を貰って配列番号を返す
var hereIndex = function(charanum){
	var array = new Array();
	for(var i = 0; i < arrange.chara.length; i++){
		for( var j = 0; j < arrange.chara[i].length; j++ ){
			if( arrange.chara[i][j] === charanum ){
				array = [i,j];
			}
		}
	}
	return array;
};
// 座標を貰って配列番号を返す
var hereIndex2 = function(e){
	var array = new Array();
	for(var i = 0; i < arrange.battlemap.length; i++){
		for( var j = 0; j < arrange.battlemap[i].length; j++ ){
			if( arrange.battlemap[i][j].x <= e.x && arrange.battlemap[i][j].x+32 > e.x &&
				arrange.battlemap[i][j].y <= e.y && arrange.battlemap[i][j].y+32 > e.y){
				array = [i,j];
			}
		}
	}
	return array;
};
// 選択キャラ識別(キャラを返す)
var targetChara = function(){
	for( var i = 0; i < battle.chara.length; i++ ){
		if( battle.chara[i].number === select_chara ){
			return battle.chara[i];
		}
	}
	for( var i = 0; i < battle.enemy.length; i++ ){
		if( battle.enemy[i].number === select_chara ){
			return battle.enemy[i];
		}
	}
};

var attSearch = function(here){
	var x = here[0];
	var y = here[1];
	var enemyplace = new Array();
	// 上下左右行き止まりチェック（配列）
	var upcheck = function (num){return num-1 >= 0;}
	var downcheck = function (num){return num+1 <= arrange.detect[0].length-1;}
	var leftcheck = function (num){return num-1 >= 0;}
	var rightcheck = function (num){return num+1 <= arrange.detect.length-1;}

	var check = function(x,y){
		if( upcheck(y) && arrange.enemy[x][y-1] !== 0 ){
			enemyplace.push([x,y-1]);
		}
		if( downcheck(y) && arrange.enemy[x][y+1] !== 0 ){
			enemyplace.push([x,y+1]);
		}
		if( leftcheck(x) && arrange.enemy[x-1][y] !== 0 ){
			enemyplace.push([x-1,y]);
		}
		if( rightcheck(x) && arrange.enemy[x+1][y] !== 0 ){
			enemyplace.push([x+1,y]);
		}
	};
	check(x,y);
	return enemyplace;
};
var rangeTip_a = function(){ // 緑チップ
	var range = new Sprite(32,32);
	var tip = game.assets['images/block.png'];
	var image = new Surface(32,32);
	image.draw(tip,48,112,16,16,0,0,32,32);
	range.image = image;
	range.opacity = 0.5;
	return range;
};
var attRange = function(scene,att_able){
	for( var i = 0; i < att_able.length; i++ ){
		for( var j = 0 ; j < arrange.battlemap.length; j ++ ){
			for( var k = 0; k < arrange.battlemap[j].length; k++){
				if( att_able[i][0] === j && att_able[i][1] === k ){
					range_tip_a[i] = rangeTip_a();
					range_tip_a[i].moveTo(arrange.battlemap[j][k].x,arrange.battlemap[j][k].y);
					scene.insertBefore(range_tip_a[i],div);
				}
			}
		}
	}
	att_window.dir = CLOSE;
};
var attWindowOpen = function(chara){
	var toX;
	if( chara.x > 800 - 32*5 ){
		toX = chara.x-116;
	}else{
		toX = chara.x + 96;
	}
	var toY;
	if( chara.y > 0 + 32*3 ){
		toY = chara.y+16;
	}else{
		toY = chara.y+32;
	}
	att_window.moveTo(toX,toY);
	att_window.dir = OPEN;
};

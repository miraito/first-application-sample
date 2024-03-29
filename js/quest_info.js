// 各クエストのマップサイズ
var map_info = {
	1 : [27,15],
	2 : [22,15]
}
// 各クエストの初期配置位置情報
var shoki_info = {
	1 : [[8,6],[10,6],[8,8],[10,8]],//[[2,6],[4,6],[2,8],[4,8]],
	2 : [[5,5],[3,1],[0,3],[2,4],[4,8],[2,7]],
}
var enemy_list = {
	1 : [bossrada,thief_b,thief_b,thief_a,thief_a,thief_a,thief_a,thief_a,thief_a,thief_a,thief_a,thief_a,thief_a
	 ,thief_a,thief_a]
}
var enemy_shoki = {
	1 : [[24,7],[24,5],[24,9],[19,2],[19,12],[16,2],[16,12],[13,2],[13,12],[10,2],[10,12],[7,2],[7,12],[4,2],[4,12],]
}
var detect_info = {
	1 : [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0],[23,0],[24,0],[25,0],[26,0],
	[26,1],
	[26,2],
		  		[3,3],[6,3],	  [9,3],[12,3],		  [15,3],[18,3],	   [21,3],		 [26,3],
		  [2,4],[3,4],[6,4],[8,4],[9,4],[12,4],[14,4],[15,4],[18,4],[20,4],[21,4],[22,4],[26,4],
	[22,5],[26,5],
	[26,6],
	[26,7],
	[26,8],
	[22,9],[26,9],
				[3,10],		  [6,10],[9,10],		[12,10],[15,10],		[18,10],[21,10],[22,10],[26,10],
				[3,11],[4,11],[6,11],[9,11],[10,11],[12,11],[15,11],[16,11],[18,11],[21,11],[22,11],[26,11],
	[26,12],
	[26,13],
	[0,14],[1,14],[2,14],[3,14],[4,14],[5,14],[6,14],[7,14],[8,14],[9,14],[10,14],[11,14],[12,14],[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[20,14],[21,14],[22,14],[23,14],[24,14],[25,14],[26,14]],
	2 : [[5,5],[3,1],[0,3],[2,4],[4,8],[2,7]],
}
var quest_info = {
	1 : { no : 'introduction', win : '敵の全滅', lose : '味方の全滅' }
}
// 地形ごとのmove値減少値設定
var move_info = function(num){
	var point = new Array();
	for( var i = 0; i < map_info[1][0]; i++){
		point[i] = new Array();
		for( var j = 0; j < map_info[1][1]; j++){
			for( var k = 0; k < detect_info[num].length; k++ ){
				if( detect_info[num][k][0] == j && detect_info[num][k][1] == i  ){
					point[i][j] = -1;
				}else{
					if(true){
						// 地形によって移動必要値を代入（予定。今は全て１）
						point[i][j] = 1;
					}
				}
			}
		}
	}
	return point;
}

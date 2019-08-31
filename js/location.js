// map上配列作成　ベース配列情報(左上から[0][0],[0][1]...　)
var addlocation = function(x,y,num){
	if(num === undefined){
		num = 0;
	}
	var location = new Array();
	for( var i = 0 ; i < x; i++){
		location[i] = new Array();
		for( var j = 0; j < y; j++){
			location[i][j] = num;
		}
	}
	return location;
}
var addgridLocation = function(x,y){
	var location = addlocation(x,y);
	for( var i = 0 ; i < location.length; i++){
		for( var j = 0; j < location[i].length; j++){
			location[i][j] = { x : 128 + i*32, y : j*32, shoki : false}
		}
	}
	return location;
}
// 初期配置位置　ベース配列に第三引数(false)挿入
// var addshokiLocation = function(x,y){
// 	var shoki = addgridLocation(x,y);
// 	for( var i = 0 ; i < shoki.length; i++){
// 		for( var j = 0; j < shoki[i].length; j++){
// 			shoki[i][j].shoki = false;
// 		}
// 	}
// 	return shoki;
// }
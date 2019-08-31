var map1 = function(){
	var x = 27 * 32 ;
	var y = 15 * 32;
	var map = new Sprite( x,y );
	var tip = game.assets['images/map0.png'];
	var image = new Surface(x,y);
	for(var i = 0; i < x; i += 32){
		for(var j = 0; j < y; j += 32){
			image.draw(tip,240,64,48,48,i,j,32,32);
		}
	}
	// 上下壁
	var tip = game.assets['images/map/1.png'];
	for(var i = 32; i < x; i +=32){
		image.draw(tip,128,128,32,32,i,0,32,32);
		image.draw(tip,128,120,32,32,i,14*32,32,32);	
	}
	// 左端壁
	var tip = game.assets['images/map/1.png'];
	// for( var i = 0; i < y; i +=32 ){
	// 	image.draw(tip,96,128,32,32,0,i,32,32);	
	// }
	image.draw(tip,96,128,32,32,0,0,32,32);
	image.draw(tip,96,120,32,32,0,y-32,32,32);	
	// 右端壁
	var tip = game.assets['images/map/1.png'];
	for( var i = 0; i < y; i +=32 ){
		image.draw(tip,160,128,32,32,x-32,i,32,32);
	}
	// 柱
	// image.draw(tip,16,240,64,64,32*3,32*3,64,32);
	// image.draw(tip,16,304,64,32,32*3,32*4,64,32);
	for( var i = 0; i < 7; i++){
		image.draw(tip,192,352,32,64,32*(3+(3*i)),32*3,32,64);
		image.draw(tip,192,352,32,64,32*(3+(3*i)),32*10,32,64);
	}
	// オブジェ1
	image.draw(tip,224,416,32,64,32*22,32*4,32,64);
	image.draw(tip,224,416,32,64,32*22,32*9,32,64);

	
	// 障害物1
	var tip2 = game.assets['images/map0_1.png'];
	for( var i = 0; i < 4; i++ ){
		image.draw(tip2,448,208,32,48,32*(2+(6*i)),32*4,32,32);
		image.draw(tip2,448,208,32,48,32*(4+(6*i)),32*11,32,32);
	}
	



	map.image = image;
	map.moveTo(128,0);
	return map;
}
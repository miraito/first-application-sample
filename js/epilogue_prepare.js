var quake = function(map,boss,chara,crystal_mini){
	map.tl.moveBy(6,2,3)
		.moveBy(-6,-2,3)
		.moveBy(6,-2,3)
		.moveBy(-6,2,3)
		.moveBy(6,2,3)
		.moveBy(-6,-2,3)
		.moveBy(6,-2,3)
		.moveBy(-6,2,3).loop();
	boss.tl.moveBy(6,2,3)
		.moveBy(-6,-2,3)
		.moveBy(6,-2,3)
		.moveBy(-6,2,3)
		.moveBy(6,2,3)
		.moveBy(-6,-2,3)
		.moveBy(6,-2,3)
		.moveBy(-6,2,3).loop();
	for(var i = 0; i < chara.length; i++){
		chara[i].tl.moveBy(9,2,3)
		.moveBy(-9,-2,3)
		.moveBy(9,-2,3)
		.moveBy(-9,2,3)
		.moveBy(9,2,3)
		.moveBy(-9,-2,3)
		.moveBy(9,-2,3)
		.moveBy(-9,2,3).loop();
	}
	crystal_mini.tl.moveBy(6,2,3)
		.moveBy(-6,-2,3)
		.moveBy(6,-2,3)
		.moveBy(-6,2,3)
		.moveBy(6,2,3)
		.moveBy(-6,-2,3)
		.moveBy(6,-2,3)
		.moveBy(-6,2,3).loop();
}
var player_talk = function(face_image2,talk_label2,chara,text_no){
	face_image2.image = game.assets[chara.window_image];
	get_message(talk_label2,epilogue_text_1[text_no]);
};
var enemy_talk = function(face_image,talk_label,chara,text_no){

	face_image.image = game.assets[chara.window_image];
	get_message(talk_label,epilogue_text_1[text_no]);
};
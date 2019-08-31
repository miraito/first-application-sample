var gameapps = function(){

	game = new Game(800,448);
	// 1マス　32　計算で　25 * 14 の画面

	game.preload('images/bg0.png','images/map0.png','images/map0_1.png','images/maptip0.png',
	'images/map/1.png','images/icon/triangle_red.gif','images/icon/triangle_blue.gif','images/icon/l_button.png',
	'images/enemy/1.png','images/text/text0.png','images/text/opening.png','images/text/clear.png','images/text/epilogue.png',
	'images/text/q_start.png','images/text/phase.png','images/text/next.png','images/text/player.png',
	'images/text/enemy.png','images/text/q_info.png','images/text/unit_list.png','images/text/gameover.png',
	'images/text/start.png','images/text/intro.png','images/text/show_movie.png','images/text/not_clear.png',
	'images/text/prologue.png','images/text/to_opening.png',
	'images/button/1.png','images/button/2.png','images/button/3.png',
	'images/button/4.png','images/button/5.png','images/button/6.png',
	'images/button/7.png','images/button/8.png','images/chara/chara0.png',
	'images/chara/9/1.png','images/chara/10/1.png','images/chara/19/1.png','images/chara/111/1.png',
	'images/chara/19/cut.jpg','images/chara/9/cut.jpg','images/chara/10/cut.jpg','images/chara/111/cut.jpg',
	'images/enemy/31/cut.jpg','images/enemy/44/cut.jpg',
	'images/enemy/31/1.png','images/enemy/44/1.png',
	'images/msg/msg1.png','images/msg/msg2.png','images/msg/msg3.png',
	'images/frame.png','images/frame2.png','images/frame/op_1.png','images/frame/ep_1.png',
	'images/chara/19/4.png','images/chara/19/3.png','images/chara/9/4.png','images/chara/9/3.png',
	'images/enemy/31/3.png','images/enemy/31/4.png','images/enemy/44/3.png','images/enemy/44/4.png',
	'images/chara/111/4.png','images/chara/111/3.png','images/chara/10/4.png','images/chara/10/3.png',
	'images/block.png','images/icon0.png','images/bg/battle0.jpg',
	'images/effect/zan1.png','images/effect/zan0.png','images/effect/fire.png','images/effect/fire.png',
	'images/effect/red_beam.png','images/effect/zan1_0.png','images/effect/zan1_1.png','images/effect/shiki_0.png',
	'images/effect/dragon.png','images/effect/gamenfire.png','images/effect/eichi.png',
	'images/icon/arm.png','images/icon/shield.png','images/icon/crystal_0.png','images/icon/flash.png');
	game.rootScene.backgroundColor = 'black';
	
	game.onload = function(){
		game.pushScene(addOpeningScene());
		// var list = [eins,zwei,drei,vier];
		// game.pushScene(quest(1,list));
		// game.pushScene(add_epilogue_1());
	}
	game.start();
};

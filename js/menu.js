var addMenuScene = function(quest_name){
	if(quest_name === undefined){
		quest_name = 1
	}
	var scene = new Scene();
	scene.backgroundColor = 'black';
	//scene.addChild(bg1());
	var quest_name = quest_name;
	var list = [eins,zwei,drei,vier];// TODO
	
	



	var menu_1 = add_menu_list_1();
	menu_1.moveTo(96,96);
	menu_1.addEventListener(Event.TOUCH_START,function(){
		// game.pushScene(quest(quest_name,list));
		game.pushScene(exordium_1(quest_name,list));
	});
	scene.addChild(menu_1);

	
	var to_opening = new Sprite(58,20);
	to_opening.image = game.assets['images/text/to_opening.png'];
	to_opening.moveTo(730,428);
	to_opening.addEventListener(Event.TOUCH_START,function(){
		game.pushScene(addOpeningScene());
	});




	var black = new Sprite(800,448);
	black.backgroundColor = 'black';
	black.tl.delay(40).fadeOut(10).removeFromScene();

	
	scene.addChild(black);
	get_frame(scene);
	scene.addChild(to_opening);

	return scene;
}
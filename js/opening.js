var addOpeningScene = function(){
	var scene = new Scene();
	scene.backgroundColor = 'black';
	var is_start = false;

	var start = new Sprite(209,65);
	start.image = game.assets['images/text/opening.png']
	start.scale(0.75,0.75);
	start.moveTo(295,191);
	var start2 = new Sprite(209,65);
	start2.image = game.assets['images/text/opening.png']
	start2.scale(0.75,0.75);
	start2.moveTo(295,191);
	start2.on = false;
	start2.addEventListener(Event.TOUCH_START,function(){
		this.on = true;
	});
	start2.addEventListener(Event.ENTER_FRAME,function(){
		if( this.on ){
			if(this.opacity > 0.1){
				if(this.age % 3 === 0){
					start.opacity -= 0.1;
					start2.opacity -= 0.1;	
				}
			}else{
				start.opacity = 0;
				start2.opacity = 0;
				is_start = true;
			}
			start.x +=2;
			start2.x -=2;
		}
	});
	//scene.addChild(round);

	

	scene.addChild(start);
	scene.addChild(start2);

	var show = new Sprite(113,24);
	show.image = game.assets['images/text/show_movie.png'];
	show.moveTo(343,340);
	var show2 = new Sprite(113,24);
	show2.image = game.assets['images/text/show_movie.png'];
	show2.moveTo(343,340);
	scene.addChild(show);
	scene.addChild(show2);

	show2.addEventListener(Event.TOUCH_START,function(){
		show.tl.moveBy(60,0,30).and().fadeOut(30);
		show2.tl.moveBy(-60,0,30).and().fadeOut(30).then(function(){
			game.pushScene(add_show_movie_scene());
		});;
		
	});

	scene.addEventListener(Event.ENTER_FRAME,function(){
		if(is_start){
			game.pushScene(addMenuScene());
		}
	});

	var black = new Sprite(800,448);
	black.backgroundColor = 'black';
	black.tl.fadeOut(10).removeFromScene();
	scene.addChild(black);


	return scene;
}
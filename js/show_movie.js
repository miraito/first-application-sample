var add_show_movie_scene = function(){
	var scene = new Scene();
	scene.backgroundColor = 'black';
	

	var left = new Sprite(47,448);
	left.backgroundColor = 'black';
	left.moveTo(0,0);
	var right = new Sprite(47,448);
	right.backgroundColor = 'black';
	right.moveTo(800-47,0);

	// var label = labelBase('test',0,0,'whitesmoke');
	// label.moveTo(96,96);
	// label.addEventListener(Event.TOUCH_START,function(){
	// 	game.pushScene(exordium_1(1));
	// });
	// var label2 = labelBase('test2',0,0,'whitesmoke');
	// label2.moveTo(196,96);
	// label2.addEventListener(Event.TOUCH_START,function(){
	// 	game.pushScene(add_epilogue_1());
	// });
	// scene.addChild(label);
	// scene.addChild(label2);
	var op_pic_list = new Array();
	op_pic_list[0] = game.assets['images/frame/op_1.png'];

	var ep_pic_list = new Array();
	ep_pic_list[0] = game.assets['images/frame/ep_1.png'];

	var object_frame_u = new Array();
	var object_frame_d = new Array();

	var op_scene_list = [exordium_1];
	var ep_scene_list = [add_epilogue_1];

	var u_groupe = new Group();
	var d_groupe = new Group();

	for( var i = 0; i < 8; i++){
		object_frame_u[i] = add_show_object(op_pic_list[i]);
		object_frame_u[i].moveTo(96 + (160+24) * i ,128);
		if( i < op_scene_list.length ){
			object_frame_u[i].change_scene = op_scene_list[i];
			object_frame_u[i].num = i + 1;
			object_frame_u[i].addEventListener(Event.TOUCH_START,function(){
				game.pushScene(this.change_scene(this.num,false));
			});
		}
		u_groupe.addChild(object_frame_u[i]);
	}
	
	for( var i = 0; i < 8; i++){
		object_frame_d[i] = add_show_object(ep_pic_list[i]);
		object_frame_d[i].moveTo(96 + (160+24) * i ,304);
		if( i < ep_scene_list.length ){
			object_frame_d[i].change_scene = ep_scene_list[i];
			object_frame_d[i].addEventListener(Event.TOUCH_START,function(){
				game.pushScene(this.change_scene(false));
			});
		}
		d_groupe.addChild(object_frame_d[i]);
	}

	scene.addChild(u_groupe);
	scene.addChild(d_groupe);

	var l_button = new Sprite(11,11);
	l_button.image = game.assets['images/icon/l_button.png'];
	l_button.moveTo(64,96);
	var r_button = new Sprite(11,11);
	r_button.image = game.assets['images/icon/l_button.png'];
	r_button.scaleX = -1;
	r_button.moveTo(725,96);

	var ld_button = new Sprite(11,11);
	ld_button.image = game.assets['images/icon/l_button.png'];
	ld_button.moveTo(64,272);
	var rd_button = new Sprite(11,11);
	rd_button.image = game.assets['images/icon/l_button.png'];
	rd_button.scaleX = -1;
	rd_button.moveTo(725,272);
	var move_flag = true;
	l_button.addEventListener(Event.TOUCH_START,function(){
		if(move_flag){
			if(u_groupe.x > -184*4){
				move_flag = false;
				u_groupe.tl.moveBy(-184,0,10).then(function(){move_flag = true;});
			}
		}
	});
	r_button.addEventListener(Event.TOUCH_START,function(){
		if(move_flag){
			if(u_groupe.x < 0){
				move_flag = false;
				u_groupe.tl.moveBy(184,0,10).then(function(){move_flag = true;});
			}
		}
	});
	ld_button.addEventListener(Event.TOUCH_START,function(){
		if(move_flag){
			if(d_groupe.x > -184*4){
				move_flag = false;
				d_groupe.tl.moveBy(-184,0,10).then(function(){move_flag = true;});
			}
		}
	});
	rd_button.addEventListener(Event.TOUCH_START,function(){
		if(move_flag){
			if(d_groupe.x < 0){
				move_flag = false;
				d_groupe.tl.moveBy(184,0,10).then(function(){move_flag = true;});
			}
		}
	});

	
	scene.addChild(l_button);
	scene.addChild(r_button);
	scene.addChild(ld_button);
	scene.addChild(rd_button);

	var prologue = new Sprite(75,31);
	prologue.image = game.assets['images/text/prologue.png'];
	prologue.moveTo(362,84);
	scene.addChild(prologue);
	var epilogue = new Sprite(77,31);
	epilogue.image = game.assets['images/text/epilogue.png'];
	epilogue.moveTo(361,260);
	scene.addChild(epilogue);

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
	scene.addChild(left);
	scene.addChild(right);
	scene.addChild(to_opening);

	return scene;
};
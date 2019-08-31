var add_epilogue_1 = function(is_true){
	if(is_true === undefined){
		is_true = true;
	}
	var scene = new Scene();
	scene.backgroundColor = 'black';
	var map = map1();
	map.moveTo(0,0);

	var frame_u = new Sprite( 800,224 );
	frame_u.backgroundColor = 'black';
	frame_u.moveTo(0,0);
	var frame_d = new Sprite( 800,224 );
	frame_d.backgroundColor = 'black';
	frame_d.moveTo( 0,224);

//===========================================会話window作成
	var face_image = new Sprite(96,96);
	var talk_label = labelBase('');
	talk_label.width = 450;
	talk_label.height = 80;
	talk_label.color = 'whitesmoke';
	var talk_window =  talkWindow(600,100,face_image,talk_label);
	talk_window.moveTo(50,20);
	face_image.image = game.assets['images/enemy/31/4.png'];
	
	var face_image2 = new Sprite(96,96);
	var talk_label2 = labelBase('');
	talk_label2.width = 450;
	talk_label2.height = 80;
	talk_label2.color = 'whitesmoke';
	var talk_window2 =  talkWindow(600,100,face_image2,talk_label2);
	talk_window2.moveTo(150,328);

//========================================キャラクター作成
	var boss = addchara('images/enemy/31/1.png');
	boss.window_image = 'images/enemy/31/4.png';
	boss.frame = 4;
	boss.moveTo(32*18,32*7);

	var list = [eins,zwei,drei,vier]; // (仮)TODO
	var chara = new Array();
	for( var i = 0; i < list.length; i++ ){
		var base = new list[i]();
		chara[i] = addchara(base.image);
		if(i === 0 ){
			chara[i].moveTo(32*7,32*5 + 32*i);
		}else if( i === 3){
			chara[i].moveTo(32*7,32*5 + 32*(i+1));	
		}else if( i === 1 ){
			chara[i].moveTo(32*6,32*5 + 32*i);	
		}else if( i === 2 ){
			chara[i].moveTo(32*6,32*5 + 32*(i+1));	
		}
		chara[i].frame = 7;
	}
	var eins2 = new eins();
	var zwei2 = new zwei();
	var drei2 = new drei();
	var vier2 = new vier();
// その他オブジェクト

	var white = new Sprite(2,448);
	white.backgroundColor = 'whitesmoke';
	white.scaleX = 0;
	white.moveTo(400,0);
	white.opacity = 0;
	white.addEventListener(Event.ENTER_FRAME,function(){
		this.scaleX += 3;
		// if(this.age % 10 === 0)this.opacity += 0.05;
	});


	var crystal = new Sprite(120,120);
	crystal.scale(0.5,0.5);
	crystal.moveTo(340,-150);
	crystal.image = game.assets['images/icon/crystal_0.png'];
	crystal.addEventListener(Event.ENTER_FRAME,function(){
		if(this.age % 2 === 0){
			this.frame = (this.age/2) % 20;	
		}
		if(this.y < 150){
			this.y +=2;	
		}else{
			scene.insertBefore(white,chara[0]);
		}
	});
	

	var crystal_mini = new Sprite(120,120);
	crystal_mini.image = game.assets['images/icon/crystal_0.png'];
	crystal_mini.scale(0.15,0.15);
	crystal_mini.moveTo(32*16,32*6-8);
	crystal_mini.addEventListener(Event.ENTER_FRAME,function(){
		if(this.age % 2 === 0){
			this.frame = (this.age/2) % 20;	
		}
	});


	var flash = new Sprite(120,240);
	flash.moveTo(340,0);
	flash.scaleY = 1.5;
	flash.frame = 1;
	flash.opacity = 0.9;
	flash.image = game.assets['images/icon/flash.png'];
	flash.addEventListener(Event.ENTER_FRAME,function(){
		if(this.scaleX < 5)this.scaleX +=0.1;
	});

	var clear_messgage = sceneClear();
	clear_messgage.moveTo(299,200);
	clear_messgage.opacity = 0;

	var epilogue_message = epilogueMessage();
	epilogue_message.moveTo(720,10);




// 	=================================================アクション作成
	var text_no = 0;
	var player_talk_start = function(){
		talk_window2.tl
		.then(function(){
			player_talk(face_image2,talk_label2,drei2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			text_no++;
			talk_label2.text = '';
			player_talk(face_image2,talk_label2,zwei2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			text_no++;
			talk_label2.text = '';
			player_talk(face_image2,talk_label2,eins2,text_no);	
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.then(function(){for(var i = 0; i < chara.length; i++){chara[i].tl.moveBy(32,0,16);}});
	};
	var enemy_talk_start = function(){
		scene.removeChild(talk_window2);
		scene.addChild(talk_window);
		talk_window.tl
		.then(function(){
			text_no++;
			enemy_talk(face_image,talk_label,boss,text_no);
		})
		.waitUntil(function(){if(talk_label.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			text_no++;
			talk_label.text = '';
			enemy_talk(face_image,talk_label,boss,text_no);
		})
		.waitUntil(function(){if(talk_label.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			scene.removeChild(talk_window);
			boss.tl.moveBy(-8,0,16);
		})
		// .waitUntil(function(){if(boss.x === 32*18-8) return true;})
		// .delay(20)
		// .then(function(){
		// 	scene.insertBefore(crystal_mini,boss);
		// 	to_next = true;
		// })
	};
	var player_talk_2 = function(){
		talk_label2.text = '';
		scene.removeChild(talk_window);
		scene.addChild(talk_window2);
		talk_window2.tl
		.then(function(){
			text_no++;
			player_talk(face_image2,talk_label2,vier2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			text_no++;
			talk_label2.text = '';
			player_talk(face_image2,talk_label2,zwei2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			text_no++;
			talk_label2.text = '';
			player_talk(face_image2,talk_label2,eins2,text_no);	
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){to_next = true;})
	};
	var enemy_talk_2 = function(){
		talk_label.text = '';
		scene.removeChild(talk_window2);
		scene.addChild(talk_window);
		talk_window.tl
		.then(function(){
			text_no++;
			enemy_talk(face_image,talk_label,boss,text_no);
		})
		.waitUntil(function(){if(talk_label.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(10)
		.then(function(){to_next = true;})
	};
	var player_talk_3 = function(){
		talk_label2.text = '';
		scene.removeChild(talk_window);
		scene.addChild(talk_window2);
		talk_window2.tl
		.then(function(){
			text_no++;
			player_talk(face_image2,talk_label2,eins2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			text_no++;
			talk_label2.text = '';
			player_talk(face_image2,talk_label2,drei2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			text_no++;
			talk_label2.text = '';
			player_talk(face_image2,talk_label2,eins2,text_no);	
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){to_next = true;})
	};
	var enemy_talk_3 = function(){
		talk_label.text = '';
		scene.removeChild(talk_window2);
		scene.addChild(talk_window);
		talk_window.tl
		.then(function(){
			text_no++;
			enemy_talk(face_image,talk_label,boss,text_no);
		})
		.waitUntil(function(){if(talk_label.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(20)
		.then(function(){to_next = true;})
	};
	var player_talk_4 = function(){
		talk_label2.text = '';
		scene.removeChild(talk_window);
		scene.addChild(talk_window2);
		talk_window2.tl
		.then(function(){
			text_no++;
			player_talk(face_image2,talk_label2,eins2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			talk_label2.text = '';
			text_no++;
			player_talk(face_image2,talk_label2,vier2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			talk_label2.text = '';
			text_no++;
			player_talk(face_image2,talk_label2,zwei2,text_no);
		})
		.waitUntil(function(){if( talk_label2.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			scene.removeChild(talk_window2);
			to_next = true;
		})
	};
	var enemy_talk_4 = function(){
		talk_label.text = '';
		scene.removeChild(talk_window2);
		scene.addChild(talk_window);
		talk_window.tl
		.then(function(){
			text_no++;
			enemy_talk(face_image,talk_label,boss,text_no);
		})
		.waitUntil(function(){if(talk_label.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){
			talk_label.text = '';
			text_no++;
			enemy_talk(face_image,talk_label,boss,text_no);
		})
		.waitUntil(function(){if(talk_label.text.length === epilogue_text_1[text_no].length )return true;})
		.delay(lag_time)
		.then(function(){to_next = true;})
	};
	var chara_remove = function(){
		for( var i = 0; i < chara.length; i++){
			chara[i].tl.fadeOut(30);
		}
	};
	scene.addChild(map);
	scene.addChild(boss);
	for( var i = 0; i < chara.length; i++){
		scene.addChild(chara[i]);
	}
	scene.addChild(frame_u);
	scene.addChild(frame_d);
	scene.addChild(clear_messgage);
	scene.addChild(epilogue_message);
//==============tl start
	var lag_time = 40;
	var to_next = false;

	scene.tl.delay(10)
		.then(function(){
			frame_u.tl.moveTo(0,-184,12);
			frame_d.tl.moveTo(0,408,12);
		})
		.waitUntil(function(){if(frame_u.y === -184)return true})
		.delay(10)
		.then(function(){scene.addChild(talk_window2);})
		.then(function(){
			player_talk_start();
		})
		.waitUntil(function(){if(chara[0].x === 32*8)return true;})
		.delay(lag_time)
		.then(function(){
			enemy_talk_start();
		})
		.waitUntil(function(){if(boss.x === 32*18-8) return true;})
		.delay(20)
		.then(function(){
			scene.insertBefore(crystal_mini,boss);
			// to_next = true;
		})
		// .waitUntil(function(){if(to_next === true){ to_next = false;return true; }})
		.delay(lag_time)
		.then(function(){
			player_talk_2();
		})
		.waitUntil(function(){if(to_next === true){ to_next = false;return true; }})
		.then(function(){
			enemy_talk_2();
		})
		.waitUntil(function(){if(to_next === true){ to_next = false;return true; }})
		.then(function(){quake(map,boss,chara,crystal_mini);}) // 地震発生
		.delay(10)
		.then(function(){
			player_talk_3();
		})
		.waitUntil(function(){if(to_next === true){ to_next = false;return true; }})
		.then(function(){
			enemy_talk_3();
		})
		.waitUntil(function(){if(to_next === true){ to_next = false;return true; }})
		.then(function(){
			scene.removeChild(talk_window);
			scene.insertBefore(flash,boss);
			scene.insertBefore(crystal,boss); // クリスタル落下開始
			white.tl.fadeIn(150);
		})
		.delay(20)
		.then(function(){
			player_talk_4();
		})
		.waitUntil(function(){if( white.opacity > 0.6 )return true;})
		.then(function(){
			chara_remove();
		})
		.waitUntil(function(){if(white.opacity === 1) return true})
		.then(function(){
			enemy_talk_4();
		})
		.waitUntil(function(){if(to_next === true){ to_next = false;return true; }})
		.then(function(){
			scene.removeChild(talk_window);
		})
		.delay(20)
		.then(function(){
			clear_messgage.tl.fadeIn(30);
		})
		.waitUntil(function(){if(clear_messgage.opacity === 1)return true;})
		.delay(30)
		.then(function(){
			clear_messgage.tl.fadeOut(20);
		})
		.waitUntil(function(){if(clear_messgage.opacity === 0)return true;})
		.delay(30)
		.then(function(){
			if(is_true){
				game.pushScene(addMenuScene());
			}else{
				game.pushScene(add_show_movie_scene());
			}
			
		})


	return scene;
}
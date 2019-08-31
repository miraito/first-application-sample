var exordium_1 = function(quest_name,is_true){
	if( is_true === undefined ){
		is_true = true;
	}
	var scene = new Scene();
	var list = [eins,zwei,drei,vier];// TODO
//=========================================マップ作成
	var bgmap = map1();
	bgmap.moveTo(35*32,-16);
	var bgmap2 = addBaseMap(35*32,17*32);
	bgmap2.moveTo(0,-16);
	var map = new Group(); // 長さ 35*32 + 27*32=1984
	map.addChild(bgmap);
	map.addChild(bgmap2);

	
	var frame_u = new Sprite( 800,224 );
	frame_u.backgroundColor = 'black';
	var frame_d = new Sprite( 800,224 );
	frame_d.backgroundColor = 'black';
	frame_d.moveTo( 0,224 );

	var skip_b = labelBase('>>> skip');
	skip_b.addEventListener(Event.TOUCH_START,function(){
		cut = 100;
	});
	skip_b.color = 'yellow';
	skip_b.moveTo(720,430);
	var skip = labelBase('>>> skip');
	skip.addEventListener(Event.TOUCH_START,function(){
		cut = 100;
	});
	skip.count = 0;
	skip.addEventListener(Event.ENTER_FRAME,function(){
		if( this.age % 3 === 0 ){
			if( this.opacity > 0.1 ){
				this.opacity -=0.2;
			}else{
				this.opacity = 1;
				this.count++;
			}	
		}
	});
	skip.color = 'white';
	skip.moveTo(720,430);

//========================================タイトル作成
	var title = new Sprite(224,49);
	title.image = game.assets['images/text/text0.png'];
	title.moveTo(288,199);
	var title_cover = new Sprite(224,49);
	title_cover.backgroundColor = 'black';
	title_cover.moveTo(288,199);
	var title_cover2 = new Sprite(224,49);
	title_cover2.backgroundColor = 'black';
	title_cover2.moveTo(300,199);

//===========================================会話window作成
	var face_image = new Sprite(96,96);
	var talk_label = labelBase('');
	talk_label.width = 450;
	talk_label.height = 80;
	talk_label.color = 'white';
	var talk_window =  talkWindow(600,100,face_image,talk_label);
	talk_window.moveTo(50,20);
	face_image.image = game.assets['images/enemy/31/4.png'];
	
	var face_image2 = new Sprite(96,96);
	var talk_label2 = labelBase('');
	talk_label2.width = 450;
	talk_label2.height = 80;
	talk_label2.color = 'white';
	var talk_window2 =  talkWindow(600,100,face_image2,talk_label2);
	talk_window2.moveTo(150,328);
//========================================キャラクター作成
	var eins2 = new eins();
	var zwei2 = new zwei();
	var drei2 = new drei();
	var vier2 = new vier();
	var boss = addchara('images/enemy/31/1.png');
	boss.dir = RIGHT;
	boss.moveTo(-32,32*6+16);

	var zako = new Array(); // ざこ14匹
	for( var i = 0; i < 14; i++){
		zako[i] = addchara('images/enemy/44/1.png');
		zako.frame = 1;
		zako[i].dir = STAY;
	}

	var chara = new Array();
	for( var i = 0; i < list.length; i++ ){
		var base = new list[i]();
		chara[i] = addchara(base.image);
		if(i === 0 ){
			chara[i].moveTo(-32,32*4+16 + 32*i);
		}else if( i === 3){
			chara[i].moveTo(-32,32*4+16 + 32*(i+1));	
		}else if( i === 1 ){
			chara[i].moveTo(-64,32*4+16 + 32*i);	
		}else if( i === 2 ){
			chara[i].moveTo(-64,32*4+16 + 32*(i+1));	
		}
		
		chara[i].dir = RIGHT;
	}

//========================================addChild
	scene.addChild(map);
	//scene.addChild(face_image);
	//scene.addChild(talk_window2);
	scene.addChild(boss);
	for( var i = 0; i < chara.length; i++){
		scene.addChild(chara[i]);
	}
	scene.addChild(frame_u);
	scene.addChild(frame_d);
	//scene.addChild(talk_window);
	scene.addChild(title);
	scene.addChild(title_cover2);
	scene.addChild(title_cover);
	scene.addChild(skip_b);
	scene.addChild(skip);

	var cut = 0;
	var count = 0;
	var count2 = 0;
	var count3 = 0;
	var count4 = 0;
	var count5 = 0;
	var text_no = 0;
	var next_cut = false;
	var z_no = 0;
	scene.addEventListener(Event.ENTER_FRAME,function(){
		if( cut === 0 ){ // タイトルメッセージ
			if( this.age > 20 ){
				title_cover2.x += 4 ;
				if( this.age % 5 === 0 ){
					if( title_cover.opacity > 0.1 ){
						title_cover.opacity -=0.1;
					}else{
						title_cover.opacity = 0;
						title_cover.x = 288;
						cut++;
					}
				}
			}else{
				if( title_cover.x <300 ){
					title_cover.x += 4;
				}
				
			}
		}else if( cut === 1 ){ // まだタイトルメッセージ
			count++;
			if( count > 20 ){
				if( this.age % 5 === 0 ){
					title_cover.opacity +=0.1;
				}
				if( count > 80 ){
					cut++;
					scene.removeChild(title_cover);
					scene.removeChild(title_cover2);
					scene.removeChild(title);
				}
			}
		}else if( cut === 2 ){ // まだタイトルメッセージ
			if( frame_u.y > 40-224 ){
				frame_u.y -= 4;
				frame_d.y += 4;
			}else{
				count = 0;
				cut++;
			}	
		}else if( cut === 3 ){ // ボス移動とセリフ
			if( boss.x < 32*12 ){
				boss.x += 8;
				map.x -=8;
			}else{
				boss.dir = LEFT;
				count++;
				if(count === 10){
					get_message(talk_label,text_1[text_no]);
					scene.addChild(talk_window);
				}else if( count > 10 ){
					if( talk_label.text.length === text_1[text_no].length ){
						count2++;
					}
				}
				if(count2 > 50)next_cut = true;
				if( next_cut === true ){
					scene.removeChild(talk_window);
					talk_label.text = '';
					count = 0;
					count2 = 0;
					text_no++;
					next_cut = false;
					cut++;
				}
			}
		}else if( cut === 4 ){ // 追っかけてくる　味方セリフ
			if( chara[0].x < 32*3 ){
				for( var i = 0; i < chara.length; i++){
					chara[i].x += 8;
				}
			}else{
				if( count === 0 ){
					face_image2.image = game.assets[eins2.window_image];
					get_message(talk_label2,text_1[text_no]);
					scene.insertBefore(talk_window2,skip_b);
				}
				count++;
				if( count > 1 ){
					if( talk_label2.text.length === text_1[text_no].length ){
						count2++;
					}
				}
				if( count2 === 40 ){
					text_no++;
					talk_label2.text = '';
					face_image2.image = game.assets[vier2.window_image];
					get_message(talk_label2,text_1[text_no]);
					count2++;
				}else if( count2 > 40 ){
					if( talk_label2.text.length === text_1[text_no].length ){
						count3++;
					}
					if( count3 > 40 )next_cut = true;
				}
				if( next_cut === true ){
					scene.removeChild(talk_window);
					scene.removeChild(talk_window2);
					talk_label.text = '';
					talk_label2.text = '';
					count = 0;
					count2 = 0;
					count3 = 0;
					text_no++;
					next_cut = false;
					cut++;
				}
			}
		}else if( cut === 5 ){ // ボス台詞
			count++
			if( count === 10 ){
				get_message(talk_label,text_1[text_no]);
				scene.addChild(talk_window);
			}
			if( count > 10 ){
				if( talk_label.text.length === text_1[text_no].length ){
					count2++;
				}
			}
			if( count2 === 50 ) next_cut = true;
			if( next_cut === true ){
				scene.removeChild(talk_window);
				scene.removeChild(talk_window2);
				talk_label.text = '';
				talk_label2.text = '';
				count = 0;
				count2 = 0;
				count3 = 0;
				text_no++;
				next_cut = false;
				cut++;
			}
		}else if( cut === 6 ){ // ボス再び移動
			if( boss.x < 32* 27 ){
				boss.dir = RIGHT;
				boss.x += 8;
				map.x -=8;
			}else{
				count = 0;
				cut++;
				for( var i = 0; i < chara.length; i++){
					if(i === 0 ){
						chara[i].moveTo(-32,32*4+16 + 32*i);	
					}else if( i === 3){
						chara[i].moveTo(-32,32*4+16 + 32*(i+1));	
					}else if( i === 1 ){
						chara[i].moveTo(-64,32*4+16 + 32*i);	
					}else if( i === 2 ){
						chara[i].moveTo(-64,32*4+16 + 32*(i+1));	
					}
				}
			}
			for( var i = 0; i < chara.length; i++){
				chara[i].x -= 8;
			}
		}else if( cut === 7 ){ // キャラ再び到着
			if( chara[0].x < 32*1 ){
				for( var i = 0; i < chara.length; i++){
					chara[i].x += 8;
				}
			}else{
				if( count === 0){
					face_image2.image = game.assets[eins2.window_image];
					get_message(talk_label2,text_1[text_no]);
					scene.insertBefore(talk_window2,skip_b);
				}
				count++;
				if( count > 1 ){
					if( talk_label2.text.length === text_1[text_no].length ){
						count2++;
					}
				}
				if( count2 === 40 ){
					text_no++;
					talk_label2.text = '';
					face_image2.image = game.assets[drei2.window_image];
					get_message(talk_label2,text_1[text_no]);
					count2++;
				}
				if( count2 > 40 ){
					if( talk_label2.text.length === text_1[text_no].length ){
						count3++;
					}
				}
				if( count3 === 40 ){
					text_no++;
					talk_label2.text = '';
					face_image2.image = game.assets[zwei2.window_image];
					get_message(talk_label2,text_1[text_no]);
					count3++;
				}
				if( count3 > 40){
					if( talk_label2.text.length === text_1[text_no].length ){
						count4++;
					}
				}
				if( count4 === 40 )next_cut = true;
				if( next_cut === true ){
					scene.removeChild(talk_window);
					scene.removeChild(talk_window2);
					talk_label.text = '';
					talk_label2.text = '';
					count = 0;
					count2 = 0;
					count3 = 0;
					count4 = 0;
					text_no++;
					next_cut = false;
					boss.x = 800 + 32*6;
					boss.dir = LEFT;
					cut++;
				}
			}
		}else if( cut === 8 ){
			if( map.x > -1920+800 ){
				map.x -=8;
				for( var i = 0; i< chara.length; i++ ){
					chara[i].x += 8;
				}
				boss.x -=8;
			}else{
				count++;
				if( count === 20 ){
					face_image2.image = game.assets[eins2.window_image];
					get_message(talk_label2,text_1[text_no]);
					scene.insertBefore(talk_window2,skip_b);
				}
				if( talk_label2.text.length === text_1[text_no].length ){
					count2++;
				}
				if( count2 === 40 ){
					text_no++;
					scene.removeChild(talk_window2);
					scene.addChild(talk_window);
					get_message(talk_label,text_1[text_no]);
					count2++;
				}
				if( count2 > 40 && count3 < 40){
					if( talk_label.text.length === text_1[text_no].length ){
						count3++;
					}	
				}
				if( count3 === 40 ){
					text_no++;
					talk_label.text = '';
					get_message(talk_label,text_1[text_no]);
					count3++;
				}
				if( count3 > 40 && count4 < 40){
					if( talk_label.text.length === text_1[text_no].length ){
						count4++;
					}
				}
				if( count4 === 40 ){
					text_no++;
					talk_label.text = '';
					get_message(talk_label,text_1[text_no]);
					count4++;
				}
				if(count4 > 40 && count5 < 40){
					if( talk_label.text.length === text_1[text_no].length ){
						count5++;
					}
				}
				if(count5 === 40)next_cut = true;
				if( next_cut === true ){
					scene.removeChild(talk_window);
					scene.removeChild(talk_window2);
					talk_label.text = '';
					talk_label2.text = '';
					count = 0;
					count2 = 0;
					count3 = 0;
					count4 = 0;
					count5 = 0;
					text_no++;
					next_cut = false;
					cut++;
				}
			}
		}else if( cut === 9 ){
			if( map.y < 48 ){
				map.y +=8;
				for(var i = 0; i < chara.length; i++){
					chara[i].y += 8;
				}
				boss.y +=8;
			}else{
				count++;
				if( z_no < 6 ){
					if(count % 5 === 0 ){
						zako[z_no].dir = DOWN;
						zako[z_no].moveTo( 32*4 + 32*3*z_no ,32*3);
						scene.insertBefore(zako[z_no],frame_u);
						z_no++;
					}
				}else{
					count2++;
				}
				if(count2 > 10)next_cut = true;
			}
			if(next_cut === true){
				count = 0;
				count2 = 0;
				next_cut = false;
				cut++;
			}
		}else if( cut === 10 ){
			if( map.y > -48 ){
				map.y -=8;
				for(var i = 0; i < chara.length; i++){
					chara[i].y -= 8;
				}
				boss.y -=8;
				for( var i = 0; i < 6; i++ ){
					zako[i].y -=8;
				}
			}else{
				count++;
				if( z_no < 12 ){
					if(count % 5 === 0 ){
						zako[z_no].frame = 10;
						zako[z_no].dir = UP;
						zako[z_no].moveTo( 32*4 + 32*3*(z_no-6) ,32*10);
						scene.insertBefore(zako[z_no],frame_u);
						z_no++;
					}
				}else{
					count2++;
					if(count2 > 10)next_cut = true;
				}
				if(next_cut === true){
					count = 0;
					count2 = 0;
					next_cut = false;
					cut++;
				}
			}
		}else if( cut === 11 ){
			if( map.x > -1984+800 ){
				map.x -=8;
				for(var i = 0; i < chara.length; i++){
					chara[i].x -= 8;
				}
				boss.x -=8;
				for( var i = 0; i < 12; i++ ){
					zako[i].x -=8;
				}
			}
			if( map.y < 0 ){
				map.y +=8;
				for(var i = 0; i < chara.length; i++){
					chara[i].y += 8;
				}
				boss.y +=8;
				for( var i = 0; i < 12; i++ ){
					zako[i].y +=8;
				}
			}else{
				count++;
				if( z_no < 14 ){
					if(count % 5 === 0 ){
						zako.frame = 4;
						zako[z_no].dir = LEFT;
						zako[z_no].moveTo( 800-32* 3,32*4+16 + 32*4*(z_no-12));
						scene.insertBefore(zako[z_no],frame_u);
						z_no++;
					}
				}else{
					count2++;
					if(count2 > 10)next_cut = true;
				}
				if(next_cut === true){
					count = 0;
					count2 = 0;
					next_cut = false;
					cut++;
				}
			}
		}else if( cut === 12 ){
			if(count === 0){
				face_image2.image = game.assets[eins2.window_image];
				get_message(talk_label2,text_1[text_no]);
				scene.insertBefore(talk_window2,skip_b);
			}
			count++;	
			if( count > 1 ){
				if( talk_label2.text.length === text_1[text_no].length ){
					count2++;
				}	
			}
			if( count2 === 40 ){
				scene.removeChild(talk_window2);
				text_no++;
				get_message(talk_label,text_1[text_no]);
				scene.addChild(talk_window);
				count2++;
			}
			if( count2 > 40 && count3 < 40){
				if( talk_label.text.length === text_1[text_no].length ){
					count3++;
				}
			}
			if( count3 === 40 ){
				text_no++;
				get_message(talk_label,text_1[text_no]);
				count3++;
			}
			if( count3 > 40 ){
				count4++;
				if(count4 > 50){
					cut = 100;
				}
			}
		}
						
		if( cut === 100 ){
			if(is_true){
				game.pushScene(quest(quest_name,list));
			}else{
				game.pushScene(add_show_movie_scene());
			}
			
		}
	});
	return scene;
}
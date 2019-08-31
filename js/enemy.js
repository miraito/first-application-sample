var thief_a = function(){
	this.name = '盗賊団員';
	this.image = 'images/enemy/44/1.png';
	this.image2 = 'images/enemy/44/3.png';
	this.window_image = 'images/enemy/44/4.png';
	this.cutin_image = 'images/enemy/44/cut.jpg';
	this.banim = [6,7,8];
	this.liv = true;
	this.lv = 1;
	this.maxhp = 30;
	this.hp = 30;
	this.pow = 29;
	this.att = 34;
	this.def = 18;
	this.int = 12;
	this.speed = 7;
	this.move = 4;
	this.attack_name ='切りつけ';
	this.items = {
				arms : ["盗賊のナイフ"],
				items : []
			};
	this.equip = { arm : '盗賊のナイフ', shield : '' };
	this.skill = ['必殺'];
	this.job = '盗賊';
	this.action = function(num){
				battle.enemy[num].on = true;
				battle.enemy[num].act_now = false; // 初期化
				battle.enemy[num].mcount = 0;
			};
	this.touroku = function(scene,mapx,mapy,enemy,bg){
				enemy.on = false;
				enemy.act = function(scene,mapx,mapy,chara,bg){
					type_A(scene,mapx,mapy,chara,bg);
					this.act_now = true;
					// if( chara.x < 500 ){
					// 	chara.x += 32;
					// }else{
					// 	endSet_e(scene,chara,battle_window);// 行動が終わったら位置、衝突情報更新して終了
					// 	is_countup = true;
					// 	chara.on = false;
					// }
				}
				enemy.addEventListener(Event.ENTER_FRAME,function(){
					if( this.on && !this.act_now ){
						this.act(scene,mapx,mapy,this,bg);
					}
				});
			};
};
var thief_b = function(){
	this.name = '盗賊団員幹部';
	this.image = 'images/enemy/44/1.png';
	this.image2 = 'images/enemy/44/3.png';
	this.window_image = 'images/enemy/44/4.png';
	this.cutin_image = 'images/enemy/44/cut.jpg';
	this.banim = [6,7,8];
	this.liv = true;
	this.lv = 1;
	this.maxhp = 40;
	this.hp = 40;
	this.pow = 32;
	this.att = 37;
	this.def = 20;
	this.int = 18;
	this.speed = 10;
	this.move = 4;
	this.attack_name ='切りつけ';
	this.items = {
				arms : ["盗賊のナイフ"],
				items : []
			};
	this.equip = { arm : '盗賊のナイフ', shield : '' };
	this.skill = ['必殺'];
	this.job = '盗賊';
	this.action = function(num){
				battle.enemy[num].on = true;
				battle.enemy[num].act_now = false; // 初期化
				battle.enemy[num].mcount = 0;// 初期化
				battle.enemy[num].cover_range = [19,5,26,9];// 守備範囲登録(x0,y0,x1,y1)
			};
	this.touroku = function(scene,mapx,mapy,enemy,bg){
				enemy.on = false;
				enemy.act = function(scene,mapx,mapy,chara,bg){
					type_B(scene,mapx,mapy,chara,bg);
					this.act_now = true;
				};
				enemy.addEventListener(Event.ENTER_FRAME,function(){
					if( this.on && !this.act_now ){
						this.act(scene,mapx,mapy,this,bg);
					}
				});
			};
};
var bossrada = function(){
	this.name = '？？？';
	this.image = 'images/enemy/31/1.png';
	this.image2 = 'images/enemy/31/3.png';
	this.window_image = 'images/enemy/31/4.png';
	this.cutin_image = 'images/enemy/31/cut.jpg';
	this.banim = [6,7,8];
	this.liv = true;
	this.lv = 1;
	this.maxhp = 120;
	this.hp = 120;
	this.pow = 33;
	this.att = 55;
	this.def = 10;
	this.int = 25;
	this.speed = 10;
	this.move = 5;
	this.attack_name ='一閃';
	this.items = {
				arms : ["シュヴェルツェシュヴェールト"],
				items : []
			};
	this.equip = { arm : 'シュヴェルツェシュヴェールト', shield : '' };
	this.skill = ['フリーゲンダードラッヘ'];
	this.job = '？？？';
	this.action = function(num){
				battle.enemy[num].on = true;
				battle.enemy[num].act_now = false; // 初期化
				battle.enemy[num].mcount = 0;// 初期化
				battle.enemy[num].cover_range = [19,5,26,9];// 守備範囲登録(x0,y0,x1,y1)
			};
	this.touroku = function(scene,mapx,mapy,enemy,bg){
				enemy.on = false;
				enemy.act = function(scene,mapx,mapy,chara,bg){
					type_B(scene,mapx,mapy,chara,bg);
					this.act_now = true;
				};
				enemy.addEventListener(Event.ENTER_FRAME,function(){
					if( this.on && !this.act_now ){
						this.act(scene,mapx,mapy,this,bg);
					}
				});
			};
}

// var sakurada = {
// 	name : '櫻田',
// 	image : 'images/enemy/1.png',
// 	image2 : 'images/enemy/1.png',
// 	window_image : '',
// 	banim : [6,7,8],
// 	liv : true,
// 	lv : 1,
// 	maxhp : 100,
// 	hp : 100,
// 	pow : 20,
// 	att : 225,
// 	pow : 10,
// 	def : 10,
// 	int : 1,
// 	speed : 10,
// 	move : 3,
// 	job : 'はげ',
// 	items : { arms : ["盗賊のナイフ"] },
// 	equip : { arm : '盗賊のナイフ', shield : '' },
// 	action : function(num){
// 				//move_result_e = [];
// 				battle.enemy[num].on = true;
// 				battle.enemy[num].act_now = false; // 初期化
// 				battle.enemy[num].mcount = 0;
// 			},
// 	touroku : function(scene,mapx,mapy,enemy,battle_window){
// 				enemy.on = false;
// 				this.act_now = false;
// 				enemy.act = function(scene,mapx,mapy,chara,battle_window){
// 					type_A(scene,mapx,mapy,chara);
// 					this.act_now = true;
// 					//chara.on = false;
// 					// if( chara.x < 500 ){
// 					// 	chara.x += 32;
// 					// }else{
// 					// 	endSet_e(scene,chara,battle_window);// 行動が終わったら位置、衝突情報更新して終了
// 					// 	is_countup = true;
// 					// 	chara.on = false;
// 					// }
// 				}
// 				enemy.addEventListener(Event.ENTER_FRAME,function(){
// 					if( this.on && !this.act_now ){
// 						this.act(scene,mapx,mapy,this,battle_window);
// 					}
// 				});
// 			}
// }
// var sakurada2 = {
// 	name : '櫻田2',
// 	image : 'images/enemy/1.png',
// 	image2 : 'images/enemy/1.png',
// 	window_image : '',
// 	banim : [6,7,8],
// 	liv : true,
// 	lv : 1,
// 	maxhp : 10,
// 	hp : 10,
// 	pow : 20,
// 	att : 25,
// 	int : 1,
// 	speed : 10,
// 	move : 3,
// 	job : 'はげ',
// 	items : { arms : ["盗賊のナイフ"] },
// 	equip : { arm : '盗賊のナイフ', shield : '' },
// 	action : function(num){
// 				battle.enemy[num].on = true;
// 				battle.enemy[num].act_now = false; // 初期化
// 				battle.enemy[num].mcount = 0;
// 			},
// 	touroku : function(scene,mapx,mapy,enemy,battle_window){
// 				enemy.on = false;
// 				enemy.act = function(scene,mapx,mapy,chara,battle_window){
// 					type_A(scene,mapx,mapy,chara);
// 					this.act_now = true;
// 					// if( chara.x < 500 ){
// 					// 	chara.x += 32;
// 					// }else{
// 					// 	endSet_e(scene,chara,battle_window);// 行動が終わったら位置、衝突情報更新して終了
// 					// 	is_countup = true;
// 					// 	chara.on = false;
// 					// }
// 				}
// 				enemy.addEventListener(Event.ENTER_FRAME,function(){
// 					if( this.on && !this.act_now ){
// 						this.act(scene,mapx,mapy,this,battle_window);
// 					}
// 				});
// 			}
// }


// var sakurda4 = new Sakurada();
// var sakurda5 = new Sakurada();

// var sakurada3 = {
// 	name : '櫻田3',
// 	image : 'images/enemy/1.png',
// 	image2 : 'images/enemy/1.png',
// 	window_image : '',
// 	banim : [6,7,8],
// 	liv : true,
// 	lv : 1,
// 	maxhp : 10,
// 	hp : 10,
// 	pow : 20,
// 	att : 25,
// 	pow : 10,
// 	def : 10,
// 	int : 1,
// 	speed : 10,
// 	move : 3,
// 	job : 'はげ',
// 	items : { arms : ["盗賊のナイフ"] },
// 	equip : { arm : '盗賊のナイフ', shield : '' },
// 	action : function(num){
// 				battle.enemy[num].on = true;
// 				battle.enemy[num].act_now = false; // 初期化
// 				battle.enemy[num].mcount = 0;
// 			},
// 	touroku : function(scene,mapx,mapy,enemy,battle_window,window_base){
// 				enemy.on = false;
// 				enemy.act = function(scene,mapx,mapy,chara,battle_window){
// 					type_A(scene,mapx,mapy,chara);
// 					this.act_now = true;
// 					// if( chara.x < 500 ){
// 					// 	chara.x += 32;
// 					// }else{
// 					// 	endSet_e(scene,chara,battle_window);// 行動が終わったら位置、衝突情報更新して終了
// 					// 	is_countup = true;
// 					// 	chara.on = false;
// 					// }
// 				}
// 				enemy.addEventListener(Event.ENTER_FRAME,function(){
// 					if( this.on && !this.act_now ){
// 						this.act(scene,mapx,mapy,this,battle_window);
// 					}
// 				});
// 			}
// }

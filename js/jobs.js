// var eins = {
// 	name : 'アインツ',
// 	image : 'images/chara/19/1.png',

// 	image2 : 'images/chara/19/3.png',
// 	window_image : 'images/chara/19/4.png',
// 	banim : [6,7,8],
// 	liv : true,
// 	lv : 1,
// 	maxhp : 130,
// 	hp : 1,
// 	pow : 30,
// 	att : 38,
// 	def : 20,
// 	int : 10,
// 	speed : 10,
// 	move : 40,
// 	exp : 0,
// 	liv : true,
// 	attack_name :'斬撃',
// 	items : {
// 				arms : ["ロングソード",'ブロンズナイフ'],
// 				items : ["回復薬(30)"]
// 			},
// 	equip : { arm : 'ロングソード', shield : '' },
// 	job : '戦士'
// }
var eins = function(){
	this.name = 'アインツ';
	this.image = 'images/chara/19/1.png';
	this.image2 = 'images/chara/19/3.png';
	this.window_image = 'images/chara/19/4.png';
	this.cutin_image = 'images/chara/19/cut.jpg';
	this.banim = [6,7,8];
	this.liv = true;
	this.lv = 1;
	this.maxhp = 48;
	this.hp = 48;
	this.pow = 30;
	this.att = 38;
	this.def = 26;
	this.int = 23;
	this.speed = 10;
	this.move = 4;
	this.exp = 0;
	this.attack_name ='斬撃';
	this.items = {
				arms : ["ロングソード",'ブロンズナイフ'],
				items : ["回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)"]
			};
	this.equip = { arm : 'ロングソード', shield : '' };
	this.skill = ['必殺'];
	this.job = '戦士';
};
var zwei = function(){
	this.name = 'ツヴァイ';
	this.image = 'images/chara/9/1.png';
	this.image2 = 'images/chara/9/3.png';
	this.window_image = 'images/chara/9/4.png';
	this.cutin_image = 'images/chara/9/cut.jpg';
	this.banim = [0,1,2];
	this.liv = true;
	this.lv = 1;
	this.maxhp = 42;
	this.hp = 42;
	this.pow = 35;
	this.att = 43;
	this.def = 23;
	this.int = 15;
	this.speed = 7;
	this.move = 4;
	this.exp = 0;
	this.attack_name ='斬撃';
	this.items = {
				arms : ['ロングソード'],
				items : ["回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)"]
			};
	this.equip = { arm : 'ロングソード', shield : '' };
	this.skill = ['ディヴィディーアト'];
	this.job = 'セーバー';
};
var drei = function(){
	this.name = 'ドライ';
	this.image = 'images/chara/111/1.png';
	this.image2 = 'images/chara/111/3.png';
	this.window_image = 'images/chara/111/4.png';
	this.cutin_image = 'images/chara/111/cut.jpg';
	this.banim = [6,7,8];
	this.liv = true;
	this.lv = 1;
	this.maxhp = 42;
	this.hp = 42;
	this.pow = 25;
	this.att = 29;
	this.def = 27;
	this.int = 20;
	this.speed = 6;
	this.move = 4;
	this.exp = 0;
	this.attack_name ='斬撃';
	this.items = {
				arms : ['ブロンズナイフ'],
				items : ["回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)"]
			};
	this.equip = { arm : 'ブロンズナイフ', shield : '' };
	this.skill = ['死返玉'];
	this.job = '陰陽師';
}
var vier = function(){
	this.name = 'フィア';
	this.image = 'images/chara/10/1.png';
	this.image2 = 'images/chara/10/3.png';
	this.window_image = 'images/chara/10/4.png';
	this.cutin_image = 'images/chara/10/cut.jpg';
	this.banim = [6,7,8];
	this.liv = true;
	this.lv = 1;
	this.maxhp = 40;
	this.hp = 40;
	this.pow = 20;
	this.att = 36;
	this.def = 21;
	this.int = 30;
	this.speed = 10;
	this.move = 4;
	this.exp = 0;
	this.attack_name ='斬撃';
	this.items = {
				arms : ['ファイアー','ブロンズナイフ'],
				items : ["回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)","回復薬(30)"]
			};
	this.equip = { arm : 'ファイアー', shield : '' };
	this.skill = ['叡智の扉'];
	this.job = 'ウィッチ';
}
var defaultName = function(){
	this.name = '';
	this.image = '';
	this.image2 = '';
	this.window_image = '';
	this.cutin_image = '';
	this.banim = [];
	this.liv = true;
	this.lv = 0;
	this.maxhp = 0;
	this.hp = 0;
	this.pow = 0;
	this.att = 0;
	this.def = 0;
	this.int = 0;
	this.speed = 0;
	this.move = 0;
	this.exp = 0;
	this.liv = true;
	this.attack_name ='斬撃';
	this.item = [];
	this.equip = { arm : '', shield : '' };
	this.job = '';
}

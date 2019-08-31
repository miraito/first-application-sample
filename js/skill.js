// condition は 必ずtrue false を返す。true の場合は参照渡しされたデータを補正してから。

var skill_data = [
	{
		name : '必殺',
		type : 'attack',
		probability : 40,
		explanation : '100％クリティカル発生 ( 自分よりspeedが早い相手には発動しない )',
		effect_no : 0,
		action_effect_no : 0,
		condition : function(chara,enemy,att_skill_elements){
			// speed が上回ってる場合発動判定
			if(chara.status.speed >= enemy.status.speed){
				if( random(100) < 35 ){
					att_skill_elements.critical_probability += 100;
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
	},
	{
		name : 'ディヴィディーアト',
		type : 'attack',
		probability : 30,
		explanation : '割合ダメージを追加 ( 自分よりspeedが早い相手には発動しない )',
		effect_no : 0,
		action_effect_no : 0,
		condition : function(chara,enemy,att_skill_elements){
			// speed が上回ってる場合発動判定
			if(chara.status.speed >= enemy.status.speed){
				if( random(100) < 30 ){
					var num = Math.floor(enemy.status.hp * 20/100);
					att_skill_elements.add_damage　+= num;
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
	},
	{
		name : '死返玉',
		type : 'attack',
		probability : 25,
		explanation : '式神の力を借りて敵のHP吸収',
		effect_no : 0,
		action_effect_no : 1,
		condition : function(chara,enemy,att_skill_elements){
			if( random(100) < 70 ){
				att_skill_elements.attack_name = '死返玉';
				att_skill_elements.add_hp = true;
				return true;
			}else{
				return false;
			}
		}
	},
	{
		name : 'フリーゲンダードラッヘ',
		type : 'attack',
		probability : 10,
		explanation : '飛龍召喚による絶大ダメージ',
		effect_no : 0,
		action_effect_no : 2,
		condition : function(chara,enemy,att_skill_elements){
			if( random(100) < 10 ){
				var num = enemy.status.hp -1;
				att_skill_elements.attack_name = 'フリーゲンダードラッヘ';
				att_skill_elements.damage_change = num;
				return true;
			}else{
				return false;
			}
		}
	},
	{
		name : '叡智の扉',
		type : 'attack',
		probability : 30,
		explanation : '肉体と精神を追い込む',
		effect_no : '',
		action_effect_no : 3,
		condition : function(chara,enemy,att_skill_elements){
			if( chara.status.int > enemy.status.int ){
				if( random(100) < 60 ){
					var num = chara.status.int - enemy.status.int;
					att_skill_elements.add_damage　+= num;
					return true;
				}else{
					return false;
				}	
			}
			
		}
	},

];

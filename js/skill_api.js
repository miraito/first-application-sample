var attSkillCheck = function(chara){
	for( var i = 0; i < skill_data.length; i++ ){
		for( var j = 0; j < chara.status.skill.length; j++){
			if( skill_data[i].name === chara.status.skill[j] ){
				if( skill_data[i].type === 'attack' ){
					return true;
				}
				
			}
		}
	}
	return false;
}

var defSkillCheck = function(chara){
	for( var i = 0; i < skill_data.length; i++ ){
		for( var j = 0; j < chara.status.skill.length; j++){
			if( skill_data[i].name === chara.status.skill[j] ){
				if( skill_data[i].type === 'defend' ){
					return true;
				}
				
			}
		}
	}
	return false;
}
var get_explanation_by_name = function(skill_name){
	for( var i = 0; i < skill_data.length; i++ ){
		if( skill_data[i].name === skill_name ){
			return skill_data[i].explanation;
		}
	}
}
var get_attskill_name_by_chara = function(chara){
	var name;
	for( var i = 0; i < skill_data.length; i++ ){
		for( var j = 0; j < chara.status.skill.length; j++){
			if( skill_data[i].name === chara.status.skill[j] ){
				if( skill_data[i].type === 'attack' ){
					name = skill_data[i].name;
				}
				
			}
		}
	}
	return name;
};
var get_defskill_name_by_chara = function(chara){
	var name;
	for( var i = 0; i < skill_data.length; i++ ){
		for( var j = 0; j < chara.status.skill.length; j++){
			if( skill_data[i].name === chara.status.skill[j] ){
				if( skill_data[i].type === 'defend' ){
					name = skill_data[i].name;
				}
				
			}
		}
	}
	return name;
};

var get_skill_condition_by_name = function(skill_name){
	var condition;
	for( var i = 0; i < skill_data.length; i++ ){
		if( skill_data[i].name === skill_name ){
			condition = skill_data[i].condition;
			break;
		}
	}
	return condition;
};
var get_effect_no_by_name = function(skill_name){
	var no;
	for( var i = 0; i < skill_data.length; i++ ){
		if( skill_data[i].name === skill_name ){
			no = skill_data[i].effect_no;
			break;
		}
	}
	return no;
};
var get_action_effect_no_by_name = function(skill_name){
	var no;
	for( var i = 0; i < skill_data.length; i++ ){
		if( skill_data[i].name === skill_name ){
			no = skill_data[i].action_effect_no;
			break;
		}
	}
	return no;
};
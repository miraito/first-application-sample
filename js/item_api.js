
function get_arm_by_name(name){
	for(var i = 0; i < arms.length; i++){
		if(arms[i].name === name){
			return arms[i];
		}
	}
}
function get_item_by_name(name){
	for(var i = 0; i < items.length; i++){
		if(items[i].name === name){
			return items[i];
		}
	}
}
var get_arm_att = function( arms_name ){
	var item = get_arm_by_name( arms_name );
	return item.att;
};

var get_type_by_name = function( arms_name ){
	var item = get_arm_by_name( arms_name );
	return item.type;
};
var get_effect_by_name = function( arms_name ){
	var item = get_arm_by_name( arms_name );
	return item.effect;
};
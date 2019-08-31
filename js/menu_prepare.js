var add_menu_line = function(x,y){
	var line = 	new Sprite(x,y);
	// var image = new Surface(x,y);
	// image.setColor('white');
	// image.drawLine(0,0,x,y);
	// line.image = image;
	line.backgroundColor = 'whitesmoke';
	return line;
}
var add_menu_black = function(x,y){
	var black = new Sprite(x,y);
	// var image = new Surface(x,y);
	// image.setColor('black');
	// image.drawLine(0,0,x,y);
	// black.image = image;
	black.backgroundColor = 'black';
	return black;
};

var get_frame = function(scene){
	var u_line = add_menu_line(704,1);
	u_line.moveTo(48,64);
	scene.addChild(u_line);

	var r_line = add_menu_line(1,352);
	r_line.moveTo(752,64);
	scene.addChild(r_line);

	var d_line = add_menu_line(704,1);
	d_line.moveTo(49,416);
	scene.addChild(d_line);

	var l_line = add_menu_line(1,352);
	l_line.moveTo(48,64);
	scene.addChild(l_line);

	var u_black = add_menu_black(704,2);
	u_black.moveTo(48,64);
	var r_black = add_menu_black(2,352);
	r_black.moveTo(752,64);
	var d_black = add_menu_black(704,2);
	d_black.moveTo(48,416);
	var l_black = add_menu_black(2,352);
	l_black.moveTo(48,64);


	scene.addChild(u_black);
	scene.addChild(r_black);
	scene.addChild(d_black);
	scene.addChild(l_black);

	u_black.tl.moveTo(753,64,20)
	.waitUntil(function(){
		r_black.tl.moveTo(752,401,20)
		.then(function(){
			scene.removeChild(u_black);
			scene.removeChild(r_black);
		})
	});
	d_black.tl.moveTo(47-704,416,20)
	.waitUntil(function(){
		l_black.tl.moveTo(48,47-352,20)
		.then(function(){
			scene.removeChild(d_black);
			scene.removeChild(l_black);
		})
	});
}
var add_show_object = function(pic){
	var show_object = new Sprite(160,90);
	var image = new Surface(160,90);
	if(pic !== undefined){
		image.draw(pic,0,0,400,224,0,0,160,90);
	}else{
		image.draw(game.assets['images/text/not_clear.png'],41,34);
	}
	image.setColor('white');
	image.drawRect(0,0,160,90);
	show_object.image = image;
	show_object.backgroundColor = 'rgb(25,25,25)';

	return show_object;
};

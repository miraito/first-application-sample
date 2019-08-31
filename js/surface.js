// 色指定メソッドの追加
Surface.prototype.setColor = function(color){
	this.context.strokeStyle = color;
	this.context.fillStyle = color;
}
// ライン描画メソッドの追加
Surface.prototype.drawLine = function(x0,y0,x1,y1){
	this.context.beginPath();
	this.context.moveTo(x0,y0);
	this.context.lineTo(x1,y1);
	this.context.stroke();
}
// 四角形描画メソッドの追加
Surface.prototype.drawRect = function(x,y,w,h){
	this.context.beginPath();
	this.context.rect(x,y,w,h);
	this.context.stroke();
}
// 四角形(塗りつぶし)描画メソッドの追加
Surface.prototype.fillRect = function(x,y,w,h){
	this.context.beginPath();
	this.context.rect(x,y,w,h);
	this.context.fill();
}

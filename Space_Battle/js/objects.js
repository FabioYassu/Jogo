let sprite = function(sourceX,sourceY,width,height,x,y){
	this.sourceX = sourceX;
	this.sourceY = sourceY;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
}
 sprite.prototype.centerX = function(){
	return this.x + (this.width/2);
}
 sprite.prototype.centerY = function(){
	return this.y + (this.height/2);
}
 sprite.prototype.halfWidth = function(){
	return this.width/2;
}
 sprite.prototype.halfHeight = function(){
	return this.height/2;
}

//Inimigo
let alien = function(sourceX, sourceY, width, height, x, y) {
    sprite.call(this, sourceX, sourceY, width, height, x, y);
    this.NORMAL = 1;
    this.EXPLODE = 2;
    this.CRAZY = 3;
    this.state = this.NORMAL;
    this.moveStyle = this.NORMAL;
}

alien.prototype = Object.create(sprite.prototype);

//Alien atingido - altera imagem do alien no SpriteSheet
alien.prototype.explode = function() {
    this.sourceX = 80;
    this.width = this.height = 56;
}

let ObjectMessage = function(y, text, color){
    this.x = 0;
    this.y = y;
    this.text = text;
    this.textVisible = true;
    this.font = "normal bold 20px Helvetica";
    this.color = color;
    this.baseline = "top";
}

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


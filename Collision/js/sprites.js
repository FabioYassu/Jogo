let sprite = function(posX,posY,width,height,color){
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.visible = true;    
}
sprite.prototype.halfWidth = function(){
    return this.width/2;
}
sprite.prototype.halfHeight = function(){
    return this.height/2;
}
sprite.prototype.centerX = function(){
    return this.posX + this.halfWidth();
}
sprite.prototype.centerY = function(){
    return this.posY + this.halfHeight();
}
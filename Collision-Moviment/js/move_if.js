//MOVIMENT IN IF
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var moveLeft = false, moveRight = false, moveUp = false, moveDown = false;
var cnv = document.querySelector('canvas');
var ctx = cnv.getContext("2d");
var p1 = {
    x: 10,
    y: 10
};
var SIZE = 50;
var posX = 50;
var posY = 50;
var objColor="#00f"
var blockX = cnv.width/2 - 26;
var blockY = cnv.height/2 - 26;

update();

window.addEventListener("keydown", keyDownHandle);
window.addEventListener("keyup", keyUpHandle)

function keyDownHandle(e){
    var key = e.keyCode;
    if (key === LEFT && key !== RIGHT){
        moveLeft = true;
    }    
    var key = e.keyCode;
    if (key === RIGHT && key !== LEFT){
        moveRight = true;
    }  
    var key = e.keyCode;
    if (key === UP && key !== DOWN ){
        moveUp = true;
    }  
    var key = e.keyCode;
    if (key === DOWN && key !== UP){
        moveDown = true;
    }  
}

function keyUpHandle(e){
    var key = e.keyCode;
    if (key === LEFT && key !== RIGHT){
        moveLeft = false;
    }    
    var key = e.keyCode;
    if (key === RIGHT && key !== LEFT){
        moveRight = false;
    }  
    var key = e.keyCode;
    if (key === UP && key !== DOWN ){
        moveUp = false;
    }  
    var key = e.keyCode;
    if (key === DOWN && key !== UP){
        moveDown = false;
    }
}  

function move(){
    if(moveLeft){
        p1.x--;
    }
    if(moveRight){
        p1.x++;
    }
    if(moveUp){
        p1.y--;
    }
    if(moveDown){
        p1.y++;
    }
}

// Collision

function colide(){
    if (p1.x + SIZE > blockX && 
        p1.x < blockX + SIZE && 
        p1.y + SIZE > blockY && 
        p1.y < blockY + SIZE){
            objColor = "#f00";
        } else { 
            objColor = "#00f";
        }
}

function updateBlock(){
    move();
    colide();
}

function render(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    ctx.fillStyle= "#000";
    ctx.fillRect(blockX,blockY,SIZE,SIZE);
    ctx.fillStyle = objColor;
    ctx.fillRect(p1.x,p1.y,SIZE,SIZE);    
    
}

function update(){
    requestAnimationFrame(update, cnv);
    updateBlock();
    render();    
       
    
}



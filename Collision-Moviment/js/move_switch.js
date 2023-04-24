// Moviment in SWITCH CASE
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
var blockX = cnv.width/2 - 25;
var blockY = cnv.height/2 - 25;

update();

window.addEventListener("keydown", keyDownHandle);
window.addEventListener("keyup", keyUpHandle)

function keyDownHandle(e){
    var key = e.keyCode;
    switch(key){
        case UP:
            moveUp = true;
            break;
        case DOWN: 
            moveDown = true;
            break;
        case LEFT:
            moveLeft = true;
            break;
        case RIGHT: 
            moveRight = true;
            break;
    }
}

function keyUpHandle(e){
    var key = e.keyCode;
    switch(key){
        case UP:
            moveUp = false;
            break;
        case DOWN: 
            moveDown = false;
            break;
        case LEFT:
            moveLeft = false;
            break;
        case RIGHT: 
            moveRight = false;
            break;
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



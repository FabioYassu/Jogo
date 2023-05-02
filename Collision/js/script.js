// função interna (function(){}()); função de disparo automatico

(function(){
    let cnv = document.querySelector("canvas");
    let ctx = cnv.getContext("2d");

    //Keyboard
    let LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

    //Movimento
    let moveLeft = moveUP = moveRight = moveDown = false;

    //Arrays - Indice de elementos
    let sprites = [];
    let blocks = [];
    let colectBlock = [];


    //Objetos 
    let character = new sprite(50, 175, 20, 20, "#00f");
    character.speed = 4;
    sprites.push(character);

    let block1 = new sprite(500, 100, 50, 50, "#f00")
    sprites.push(block1);
    blocks.push(block1);
    
    let block2 = new sprite(200, 200, 100, 50, "#0f0")
    sprites.push(block2);
    blocks.push(block2);

    let block3 = new sprite(150, 50, 20, 100, "#0ff")
    sprites.push(block3);
    blocks.push(block3);

    let colectBlockock = new sprite(75, 250, 30, 30, "#ff0")
    sprites.push(colectBlockock);    
    colectBlock.push(colectBlockock)

    let colectBlockock1 = new sprite(170, 40, 40, 40, "pink")
    sprites.push(colectBlockock1);    
    colectBlock.push(colectBlockock1)

    //Entradas
    window.addEventListener("keydown", function(e){
        let key = e.keyCode;
        switch(key){
            case LEFT:
                moveLeft = true;
                break
            case UP:
                moveUP = true;
                break
            case RIGHT:
                moveRight = true;
                break;
            case DOWN:
                moveDown = true;
                break
        }
    }, false);

    window.addEventListener("keyup", function(e){
        let key = e.keyCode;
        switch(key){
            case LEFT:
                moveLeft = false;
                break
            case UP:
                moveUP = false;
                break
            case RIGHT:
                moveRight = false;
                break;
            case DOWN:
                moveDown = false;
                break
        }
    }, false);

    //Funções

    function loop(){
        window.requestAnimationFrame(loop, cnv);
        update();
        render();        
    } 

    function update(){
        if(moveLeft && !moveRight){
            character.posX -= character.speed;
        }
        if(moveRight && !moveLeft){
            character.posX += character.speed;
        }
        if(moveUP && !moveDown){
            character.posY -= character.speed;
        }
        if(moveDown && !moveUP){
            character.posY += character.speed;
        }
        character.posX = Math.max(0, Math.min(cnv.width - character.width, character.posX));
        character.posY = Math.max(0, Math.min(cnv.height - character.height, character.posY));
        
        //Colisões
        for(let i in blocks){
            let blk = blocks[i];                       
    
            if(blk.visible){   
            
            blockRect(blk, character);   
            }
        }

        for(let i in colectBlock){
            let colectBlockk = colectBlock[i];                       
    
            if(colectBlockk.visible){   
            
            colect(character, colectBlockk);   
            }
        }
    }

    function render(){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        for (let i in sprites) {
            let spr = sprites[i];
            if(spr.visible){
                ctx.fillStyle = spr.color;
                ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
            }           
        }        
    }
    loop();

}())
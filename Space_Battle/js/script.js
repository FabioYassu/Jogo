(function(){ 
    //canvas
    let cnv = document.querySelector('canvas');
    //constexto 2D
    let ctx = cnv.getContext("2d");
    //console.log(ctx)

    //============= RECURSO DO JOGO ========================= 
    //ARRAYS
    let sprites = [];
    let assetsToLoad = [];
    let missiles = [];
    let aliens = [];

    //Variaveis uteis
    let alienFrequency = 100;
    let alienTimer = 0;

    //Sprites
    let background = new sprite(0, 56, 400, 500, 0, 0);
    sprites.push(background);

    //Nave Defender
    let defender = new sprite(0, 2, 30, 50, 185, 450);
    sprites.push(defender);

    //Imagens
    let img = new Image();
    img.addEventListener('load', loadHandler, false);
    img.src = "img/space.png";
    assetsToLoad.push(img);

    //contador de recursos
    let loadAssets = 0;

    //Entradas 
    let LEFT = 37, RIGHT = 39, ENTER = 13, SPACE = 32; 

    //Ações
    let moveLeft = moveRight = shoot = spaceDown = false;
   

    //Estado do jogo
    let LOADING = 0, PLAYING = 1, PAUSED = 2, OVER = 3;
    let gameState = LOADING;

    //Listerners - Comando de entradas
    window.addEventListener("keydown", function(e){
        let key = e.keyCode;
        //console.log(key)
        switch(key){
            case LEFT:
                moveLeft = true;
                break;
            case RIGHT:
                moveRight = true;
                break;
            case SPACE:
                if(!spaceDown){
                    shoot = true;
                    spaceDown = true;
                    console.log('PEW')
                }
                break;
        }
    }, false);

    window.addEventListener("keyup", function(e){
        let key = e.keyCode;
        //console.log(key)
        switch(key){
            case LEFT:
                moveLeft = false;
                break;
            case RIGHT:
                moveRight = false;
                break;
            case SPACE:
                spaceDown = false;
                break;
            case ENTER:
                if(gameState !== PLAYING){
                    gameState = PLAYING;
                } else {
                    gameState = PAUSED;
                }
                break;
        }
    }, false);

    //============= FUNÇÕES ==========================
    
    function loadHandler(){
        loadAssets++;
        if (loadAssets === assetsToLoad.length) {
            img.removeEventListener('load', loadHandler, false);
    //Inicia o jogo
            gameState = PAUSED;
        }
    }

    function loop(){
        window.requestAnimationFrame(loop, cnv);
    //Define ações com base em GameSTATE
        switch(gameState){
            case LOADING:
                console.log('LOADING')
                break;
            case PLAYING:
                update();
                break;
        }
        render();
    }

    function render(){
        //console.log('Render OKAY')
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        if(sprites.length !== 0){
            for(let i in sprites){
                let spr = sprites[i];
                //Parametros->(1° Imagem de referencia, 2° Captura de Imagen (largura, altura, posX, PosY), 3° Exibição/Print (posX, posY, largura e altura)  )
                ctx.drawImage(img, spr.sourceX, spr.sourceY, spr.width, spr.height, Math.floor(spr.x), Math.floor(spr.y), spr.width, spr.height);
            }
        }
    }

    function update(){
        //console.log('Update OKAY' )
        //Movimento da Nave no eixo X
        if(moveLeft && !moveRight){
            defender.vx = -5;
        }
        if(moveRight && !moveLeft){
            defender.vx = 5;
        }
        if(!moveLeft && !moveRight){
            defender.vx = 0;
        }

        //Disparar laser
        if(shoot){
            fireMissile();
            shoot = false;
        }
        //atualiza a posição
        defender.x = Math.max(0, Math.min(cnv.width - defender.width, defender.x + defender.vx))
        
        //Atualiza posição Misseis
        for(let i in missiles){
            let missile = missiles[i];
            missile.y += missile.vy;
        //Remove Misseis que não seram mais utilizados
            if(missile.y < -missile.height){
                removeObjects(missile, missiles);
                removeObjects(missile, sprites);
                i--;
            }
        }

        //Encremento de Alien Timer
        alienTimer++;

        //Criação Alien, caso o timer iguale a frequência
        if(alienTimer === alienFrequency){
            makeAlien();
            alienTimer = 0;
        //Ajuste na frequencia de criação de aliens
        if(alienFrequency > 2){
            alienFrequency--;
            }
        }

        //Move Aliens
        for(let i in aliens){
            let alienNave = aliens[i];
            if(alienNave.state !== alienNave.EXPLODE){
                alienNave.y += alienNave.vy;
                if(alienNave.state === alienNave.CRAZY){
                    if(alienNave.x > cnv.width - alienNave.width || alienNave.x < 0 ){
                        alienNave.vx *= -1;
                        
                    }
                    alienNave.x += alienNave.vx;
                }
            }
            //GameOver -  confere se Alien ultrapassou nave Defender
            if(alienNave.y > cnv.height + alienNave.height - 50){
                gameState = OVER;   
            console.log('FIM')        
            }

            //Verificar misseis para colisão com alien
            for(let j in missiles){
            let missil = missiles[j];
                if(collide(missil, alienNave) && alienNave.state !== alienNave.EXPLODE){
                    console.log('K.... BUUUUMM')
                    destroy(alienNave);
                    removeObjects(missil, missiles)
                    removeObjects(missil, sprites)
                    j--;
                    i--;
                }
            }
        }     
    }

    //Criação misseis em tela
    function fireMissile(){
        let missile = new sprite(136, 12, 8, 13, defender.centerX() - 4, defender.centerY() - 13);
        missile.vy = -8;
        sprites.push(missile);
        missiles.push(missile);
        
    }

    //Criação de Alien em tela
    function makeAlien(){
        //Cria um valor aleatorio entre 0 e 7
        //Divide o canvas em 8 colunas para o posicionamento aleatorio do alien
        // 8 = divisão de largura de Canvas por largura do Alien (400 / 50 = 8)       
        let posAlien = (Math.floor(Math.random() * 8)) * 50;  
        let alienNave = new alien(30, 0, 50, 50, posAlien, -50);
        alienNave.vy = 1;

        //Otimização do Alien --- Logica FUZZY/DIFUSA 
        if(Math.floor(Math.random() * 11) > 7){
            alienNave.state = alienNave.CRAZY;
            alienNave.vx = 2;            
        }

        if(Math.floor(Math.random() * 11) > 5){
            alienNave.vy = 2;
        }

        sprites.push(alienNave);
        aliens.push(alienNave);
        //console.log(posAlien);
    }

    //Destruir Aliens
    function destroy(alienNave){
        alienNave.state = alienNave.EXPLODE;
        alienNave.explode(); 
        setTimeout(function(){
            removeObjects(alienNave, aliens);
            removeObjects(alienNave, sprites);
        }, 1000);
    }

    //Remover objeto de ARRAY
    function removeObjects(objectToRemove, array) {
        let i = array.indexOf(objectToRemove);
        if(i !== -1){
            array.splice(i, 1);
        }
    }

    loop();

}());
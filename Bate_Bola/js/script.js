(function(){

    let cnv = document.querySelector('canvas')
    let ctx = cnv.getContext('2d')

    let gravity = 0.1
    let catX = catY = hyp = 0
    
    //======== ESTADOS de JOGO =========
    let START = 0, PLAY = 1,  OVER = 2
    let gameState = START

    //======== OBJETO ==========
    let ball = {
        radius : 25,
        vX : 0,
        vY : 0,
        x : cnv.width/2 - 10,
        y : 50,
        color : "#00f",
        touched : false,
        visible : false

    }

    //======== Mensagens ========
    let messages = []

    let startMsg = {
        text : "Touch to START",
        y : (cnv.height/2 - 100),
        font: "bold 30px Helvetica",
        color : "#f00",
        visible : true
    }
    messages.push(startMsg)

    //Score
    let score = 0
    let scoreMsg = Object.create(startMsg)
    scoreMsg.color = "#000"
    scoreMsg.visible = false
    scoreMsg.y = (cnv.height/2 + 50)
    messages.push(scoreMsg)

    //Record Score   
    let record = localStorage.getItem("record") ? localStorage.getItem("record") : 0;
    
    let recordMsg = Object.create(startMsg)
    recordMsg.color = "#00f" 
    recordMsg.visible = false
    recordMsg.y = (cnv.height/2 + 100)
    messages.push(recordMsg)


    //========= EVENTOS ===========
    cnv.addEventListener('mousedown', function(e){
        catX = ball.x - e.offsetX
        catY = ball.y - e.offsetY
        hyp = Math.sqrt(catX*catX + catY*catY)

        switch(gameState){
            case START:
                gameState = PLAY
                startMsg.visible = false
                startGame()                
                break;
            case PLAY:
                if(hyp < ball.radius && !ball.touched){
                    ball.vX = Math.floor(Math.random()*21) - 10
                    ball.vY = -(Math.floor(Math.random()*6) + 5)
                    ball.touched = true
                    score++
                }
                break;

        }
    }, false)

    cnv.addEventListener('mouseup', function(){
        if(gameState === PLAY){
            ball.touched = false
        }
    }, false)
    
    //========= FUNÇÕES ===========
    function loop(){
        requestAnimationFrame(loop, cnv)
        if(gameState === PLAY){
            update()
        }        
        render()
    }

    function update(){
        //Gravidade e deslocamento
        ball.vY += gravity
        ball.y += ball.vY  
        ball.x += ball.vX  

        //Delimita paredes
        if(ball.x + ball.radius > cnv.width || ball.x < ball.radius){
            ball.x < ball.radius ? ball.x = ball.radius : ball.x = cnv.width - ball.radius
            ball.vX *= - 0.8             
        } 
        if(ball.y < ball.radius && ball.vY < 0){
            ball.y = ball.radius
            ball.vY *= -1
        }
        

        //GAME OVER
        if(ball.y - ball.radius > cnv.height){
            gameState = OVER
            ball.visible = false
            console.log('GAME OVER')

            window.setTimeout(function(){
                startMsg.visible = true
                gameState = START
            }, 2000)

            scoreMsg.text = "Your Score: " + score
            scoreMsg.visible = true

            //Record Score
            score > record ? (
                record = score, localStorage.setItem("record", record), recordMsg.text = "NEW Best Score: " + record, recordMsg.visible = true
            ):(
                recordMsg.text = "Best Score: " + record, recordMsg.visible = true
            )
        }
    }

    function render(){
        ctx.clearRect(0,0,cnv.width,cnv.height)
        
        //Render BALL
        if(ball.visible){
            ctx.fillStyle = ball.color
            ctx.beginPath()
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2)
            ctx.closePath()
            ctx.fill()
            //Exibe SCORE
            ctx.font = "bold 20px Helvetica"
            ctx.fillStyle = "#000"
            ctx.fillText("Score: " + score, 10, 20)
        }        

        //Render Mensagem
        for(let i in messages){
            const msg = messages[i]
            if(msg.visible){
                ctx.font = msg.font
                ctx.fillStyle = msg.color
                ctx.fillText(msg.text, (cnv.width - ctx.measureText(msg.text).width)/2, msg.y)
            }
        }      
    }


    //========== START GAME ============
    function startGame(){
        ball.vY = 0
        ball.y = 50        
        ball.vX = Math.floor(Math.random()*21) - 10 //Min value -10, Max value 10
        ball.x = Math.floor(Math.random()*261) + 20 
        ball.visible = true
        score = 0
        scoreMsg.visible = false 
        recordMsg.visible = false
    }


    loop()
}())
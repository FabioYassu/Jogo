(function(){
    let cnv = document.querySelector('canvas')
    let ctx = cnv.getContext('2d')

    let catX = catY = 0

    let gravity = 0.1

    let ball = {
        radius: 20,
        vx: Math.floor(Math.random()*10) +1,
        vy: 0,
        x: 0,
        y: 0,
        color: "#00f",
        held: false
    }

    cnv.addEventListener('mousedown', function(e){
        const cssValue = "cursor:grabbing;";
        cnv.style.cssText = cssValue
        
        catX = ball.x - e.offsetX
         catY = ball.y - e.offsetY
         hyp = Math.sqrt(catX*catX + catY*catY) //Hipotenusa
         if(hyp < ball.radius && !ball.held){
            ball.held = true
         }
    }, false)

    cnv.addEventListener('mouseup', function(){
        const cssValue = "cursor:grab;";
        cnv.style.cssText = cssValue

        if(ball.held){
            ball.held = false
            ball.vx = Math.floor(Math.random()*5) +1
        }        
    }, false)
    
    cnv.addEventListener('mousemove', function(e){
        if(ball.held){
            ball.x = e.offsetX
            ball.y = e.offsetY
        }
    }, false)


    function loop(){
        window.requestAnimationFrame(loop, cnv)
        update() 
        render()

    }

    function update(){       
        !ball.held ? (
            ball.vy += gravity, ball.y += ball.vy , ball.x += ball.vx
            ):( 
            ball.vy = 0, ball.vx = 0 
            )

        //Colision Kick
        if(ball.y + ball.radius > cnv.height){
            ball.y = cnv.height - ball.radius
            ball.vy *= -0.8
        }
        if(ball.x - ball.radius < 0 || ball.x + ball.radius > cnv.width){
            ball.x = ball.x - ball.radius < 0  ? ball.radius : cnv.width - ball.radius
            ball.vx *= -0.8            
        }
    }

    function render(){
        ctx.clearRect(0,0,cnv.width,cnv.height)
        ctx.fillStyle = ball.color
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2)
        ctx.closePath()
        ctx.fill()
    }

    loop()
}())
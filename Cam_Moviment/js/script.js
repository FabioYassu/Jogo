(function(){
    let cnv = document.querySelector('canvas')
    let ctx = cnv.getContext('2d')
    
    //recursos
    let background = new Image() //image: 800 x 600 px
        background.src = "img/scene.png"
    
        let person = new Image()
        person.src = "img/monster.png"


    //object
    let sprites = []
    let gameworld = {
        img : background,
        x: 0,
        y: 0,
        width: 800,
        height: 600,        
    }
    sprites.push(gameworld)

    let char = {
        img: person,
        x: 0,
        y: 0,
        width: 64,
        height: 64
    }
    sprites.push(char)

    //centraliza Person
    char.x = (gameworld.width - char.width) / 2
    char.y = (gameworld.height - char.height) / 2

    let cam = {
        x: 0,
        y: 0,
        width: cnv.width,
        height: cnv.height,
        leftEdge : function() {
            return this.x + (this.width * 0.25)

        },
        rightEdge : function() {
            return this.x + (this.width * 0.75)

        },
        topEdge : function() {
            return this.y + (this.width * 0.25)

        },
        bottomEdge : function() {
            return this.y + (this.width * 0.75)

        }
        
    }

    //centraliza cam
    cam.x = (gameworld.width - cam.width) / 2
    cam.y = (gameworld.height - cam.height) / 2

    //Moviment
    let LEFT = RIGHT = UP = DOWN = false
    window.addEventListener('keydown', function(e){
        let key = e.keyCode
        switch(key){
            case 37:
                LEFT = true
                break;
            case 39:
                RIGHT = true
                break;
            case 38:
                UP = true
                break;
            case 40:
                DOWN = true
                break;
        }
    }, false)

    window.addEventListener('keyup', function(e){
        let key = e.keyCode
        switch(key){
            case 37:
                LEFT = false
                break;
            case 39:
                RIGHT = false
                break;
            case 38:
                UP = false
                break;
            case 40:
                DOWN = false
                break;
        }
    }, false)

    function loop(){
        window.requestAnimationFrame(loop, cnv)
        update()
        render()  
    }

    function update(){
        if(LEFT && !RIGHT){
            char.x -= 2;
        }
        if(RIGHT && !LEFT){
            char.x += 2
        }
        if(UP && !DOWN){
            char.y -= 2
        }
        if(DOWN && !UP){
            char.y += 2
        }

        //atualizar cam position
        if(char.x < cam.leftEdge()){
            cam.x = char.x - (cam.width * 0.25)
        }
        if(char.x + char.width > cam.rightEdge()){
            cam.x = char.x + char.width - (cam.width * 0.75)
        }
        if(char.y < cam.topEdge()){
            cam.y = char.y - (cam.height * 0.25)
        }
        if(char.y + char.height > cam.bottomEdge()){
            cam.y = char.y + char.height - (cam.height * 0.75)
        }

        //CHARACTER limiting
        if(char.x < 0){
            char.x = 0
        }
        if(char.x + char.width > gameworld.width){
            char.x = gameworld.width - char.width
        }
        if(char.y < 0){
            char.y = 0
        }
        if(char.y + char.height > gameworld.height){
            char.y = gameworld.height - char.height
        }  

        //Cam limiting
        if(cam.x < 0){
            cam.x = 0
        }
        if(cam.x + cam.width > gameworld.width){
            cam.x = gameworld.width - cam.width
        }
        if(cam.y < 0){
            cam.y = 0
        }
        if(cam.y + cam.height > gameworld.height){
            cam.y = gameworld.height - cam.height
        }    
        
    }

    function render(){
        ctx.save()
        ctx.translate(-cam.x, -cam.y)
        for(let i in sprites){
            let spr = sprites[i]
            ctx.drawImage(spr.img,0,0,spr.width,spr.height,spr.x,spr.y,spr.width,spr.height)

        }
        ctx.restore()
        ctx.font = "bold 25px helvetica"
        ctx.fillText("Test Mapping Scroll", 10, 30)
    }

    loop();
}());
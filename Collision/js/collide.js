function blockRect(r1,r2){
    //r1 -> objeto bloqueado
    //r2 -> parede
    //catetos
    let catX = r1.centerX() - r2.centerX();
    let catY = r1.centerY() - r2.centerY();
    

    //soma da metades
    let sumHalfWidth = r1.halfWidth() + r2.halfWidth();
    let sumHalfHeight = r1.halfHeight() + r2.halfHeight();
    
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight ){
        //COLLECT ITEM
        // r2.visible = false;
        // setTimeout(function(){
        //     r2.visible = true
        // }, 1000)

        let overlapX = sumHalfWidth - Math.abs(catX);
        let overlapY = sumHalfHeight - Math.abs(catY);

        if(overlapX >= overlapY){
            //colisão cima ou baixo
            if(catY > 0){
                //cima
                r1.posY += overlapY;
                
            }else{
                r1.posY -= overlapY;
            } 
        } else {
            if(catX > 0){
                r1.posX += overlapX;
            } else {
                r1.posX -= overlapX;
            }
            //colisão esquerda ou direita
        }
    }      
}

function colect(r1, r2){

    let catX = r1.centerX() - r2.centerX();
    let catY = r1.centerY() - r2.centerY();
    

    //soma da metades
    let sumHalfWidth = r1.halfWidth() + r2.halfWidth();
    let sumHalfHeight = r1.halfHeight() + r2.halfHeight();
    
    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight ){
        //COLLECT ITEM
        r2.visible = false;
        setTimeout(function(){
            r2.visible = true
        }, 1000)

    }
}
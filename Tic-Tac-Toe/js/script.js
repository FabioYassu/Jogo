const jogoVelha = {
    board: ['','','','','','','','',''], 
    simbols:{
        option: ['X','O'], 
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },

    container_element: null,
    gameOver: false,
    winner: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container){
        this.container_element = container;
    },

    make_play: function(position){
        if (this.gameOver) return false;
        if (this.board[position] === ''){
            this.board[position] = this.simbols.option[this.simbols.turn_index];
            this.draw();
            let winner = this.check_winner(this.simbols.option [this.simbols.turn_index]);
            if (winner >= 0){
                this.gameIsOver();
            }else{
                this.simbols.change();                
            }
            return true;                        
        } else {
            return false;            
        }

    },

    gameIsOver: function(){
        this.gameOver = true;
        console.log('GAME OVER !!')
                
    },

    start: function (){
        this.board.fill('');
        this.draw();
        this.gameOver = false;
    },

    check_winner: function(simbol){
        for (i in this.winner){
            if (this.board[this.winner[i][0] ] == simbol &&
                this.board[this.winner[i][1] ] == simbol &&
                this.board[this.winner[i][2] ] == simbol){
                    console.log(`Sequencia vencedora: ${i}` );
                    return i;
                    
                }
        };
        return -1;
    },

    draw: function(){
        let content = '';

        for(i in this.board) {
            content += `<div onclick="jogoVelha.make_play(${i})">${this.board[i]}</div>`;
        }

        this.container_element.innerHTML = content;
    }

};

// Mouse Control
let btn = window.document.querySelector('input#btnReset')        
    btn.addEventListener('mouseenter', enter)
    btn.addEventListener('mouseout', sair)    

    function enter() {
        btn.style.background = 'blue'
        btn.style.color = 'aliceblue'           
    }   
    
    function sair() {            
        btn.style.background = 'aliceblue'
        btn.style.color = 'black'
    }

    
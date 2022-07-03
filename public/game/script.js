class Utilities {
    static getComp() {
        const comp = Math.random();
    
        if( comp < 0.34 ) return  'rock';
        if( comp >= 0.34 && comp < 0.67 ) return 'paper';
        return 'scissors';
    }
    
    
    static getResult(comp, player) {
        if( player == comp ) return 'DRAW';
        if( player == 'rock' ) return ( comp == 'scissors' ) ? 'PLAYER 1 WIN' : 'COM WIN';
        if( player == 'paper' ) return ( comp == 'rock' ) ? 'PLAYER 1 WIN' : 'COM WIN';
        if( player == 'scissors' ) return ( comp == 'paper' ) ? 'PLAYER 1 WIN' : 'COM WIN';
    }
    
    static setBackground(comp, player) {
        const imgBackgroundPlayer = document.querySelector(`.player1 .${player}`);
        imgBackgroundPlayer.classList.add('game-icon');
    
        const imgBackgroundComp = document.querySelector(`.comp .${comp}`);
        imgBackgroundComp.classList.add('game-icon');
    }
}

class Game {
    setGame(option) {
        const comp = Utilities.getComp();
        const player = option.classList[0];
        const result = Utilities.getResult(comp, player);
        // console.log('comp: ' + comp);
        // console.log('player: ' + player);
        // console.log('result:'  + result);
    
        Utilities.setBackground(comp, player);
    
        const viewResult = document.querySelector('.result');
        const versus = document.querySelector('.versus');
        if(result) {
            versus.style.display = 'none';
            viewResult.style.display = 'flex';
            viewResult.innerHTML = result;
            this.endGame();
        }
    }
    
    playGame() {
        const options = document.querySelectorAll('.player1 .image');
        options.forEach(option => {
            option.addEventListener('click', this.setGame.bind(this, option))
        }, {once: true})
    }
    
    endGame() {
        const options = document.querySelectorAll('.player1 .image');
        options.forEach(option => {
            option.setAttribute("style", "cursor: not-allowed;pointer-events: none;")
        })
    }
    
    restart() {
        const viewResult = document.querySelector('.result');
        const versus = document.querySelector('.versus');
    
        versus.style.display = 'block';
        viewResult.style.display = 'none';
        viewResult.innerHTML = '';
    
        const comp = document.querySelectorAll('.comp .image')
        comp.forEach(c => {
            c.classList.remove('game-icon');
            c.removeAttribute('style');
        })
        const player = document.querySelectorAll('.player1 .image')
        player.forEach(p => {
            p.classList.remove('game-icon');
            p.removeAttribute('style');
        })
    }
}

const game = new Game();
game.playGame();

const restartButton = document.querySelector('.restart')
restartButton.addEventListener('click', game.restart)
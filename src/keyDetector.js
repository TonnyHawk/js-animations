export default class keyDetector{
    constructor(game, player){
        document.addEventListener('keydown', (e)=>{
            let key = e.key;
            if (key === ' ') key = 'space';
        
            // console.log(key);
            switch(key){
                case 'ArrowLeft':
                    player.direction.left = player.speed * -1
                    player.direction.top = 0
                    break;
                case 'ArrowRight':
                    player.direction.left = player.speed
                    player.direction.top = 0
                    break;
                case 'ArrowUp':
                    player.direction.top = player.speed * -1
                    player.direction.left = 0
                    break;
                case 'ArrowDown':
                    player.direction.top = player.speed * 1
                    player.direction.left = 0
                    break;
                case 'space':
                    if(game.isAnimationRunning) game.pause()
                    else game.resume()
                    break;
            }
        })
    }
}
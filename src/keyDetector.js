export default class keyDetector {
    constructor(game, player) {

        function getPressedKeyName(e){
            let keyName = e.key;
            if (keyName === ' ') keyName = 'Space';
            return keyName
        }

        function keyUpHandler(e) {
            let key = getPressedKeyName(e);
            switch (key) {
                case 'ArrowLeft':
                    if(player.direction.left < 0) player.direction.left = 0;
                    break;
                case 'ArrowRight':
                    if(player.direction.left > 0) player.direction.left = 0;
                    break;
                case 'ArrowUp':
                    if(player.direction.top < 0) player.direction.top = 0;
                    break;
                case 'ArrowDown':
                    if(player.direction.top > 0) player.direction.top = 0;
                    break;
            }
        }

        let keyUpHandlerDelay;

        document.addEventListener('keydown', (e) => {
            let key = getPressedKeyName(e);

            // console.log(key);
            switch (key) {
                case 'ArrowLeft':
                    player.direction.left = player.speed * -1;
                    player.direction.top = 0;
                    clearTimeout(keyUpHandlerDelay);
                    player.turn('left');
                    break;
                case 'ArrowRight':
                    player.direction.left = player.speed;
                    player.direction.top = 0;
                    clearTimeout(keyUpHandlerDelay);
                    player.turn('right');
                    break;
                case 'ArrowUp':
                    player.direction.top = player.speed * -1;
                    player.direction.left = 0;
                    clearTimeout(keyUpHandlerDelay);
                    player.turn('up');
                    break;
                case 'ArrowDown':
                    player.direction.top = player.speed * 1;
                    player.direction.left = 0;
                    clearTimeout(keyUpHandlerDelay);
                    player.turn('down');
                    break;
                case 'Escape':
                    if (game.isAnimationRunning) game.pause();
                    else game.resume();
                    break;
                case 'Space':
                    player.shoot()
                    break;
            }
        })

        document.addEventListener('keyup', (e)=>{
            keyUpHandlerDelay = setTimeout(()=>keyUpHandler(e), 85)
        })
    }
}
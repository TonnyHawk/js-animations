import Player from "./basic/Player";
import Game from "./Game";

export default class keyDetector {
    constructor(game:Game, player:Player) {

        function getPressedKeyName(e: KeyboardEvent){
            let keyName = e.key;
            if (keyName === ' ') keyName = 'Space';
            return keyName
        }

        function keyUpHandler(e: KeyboardEvent) {
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

        let keyUpHandlerDelay: ReturnType<typeof window.setTimeout>;

        document.addEventListener('keydown', (e) => {
            let key = getPressedKeyName(e);

            // console.log(key);
            switch (key) {
                case 'ArrowLeft':
                    player.setDirection('left');
                    clearTimeout(keyUpHandlerDelay);
                    break;
                case 'ArrowRight':
                    player.setDirection('right');
                    clearTimeout(keyUpHandlerDelay);
                    break;
                case 'ArrowUp':
                    player.setDirection('up');
                    clearTimeout(keyUpHandlerDelay);
                    break;
                case 'ArrowDown':
                    player.setDirection('down');
                    clearTimeout(keyUpHandlerDelay);
                    break;
                case 'Escape':
                    if (game.isAnimationRunning) game.pause();
                    else game.resume();
                    break;
                case 'Space':
                    player.shoot()
                    break;
            }

            // separated insruction for space to prevent blocking shoot functionality while moving the person
            if(key === 'Escape'){
                if (game.isAnimationRunning) game.pause();
                else game.resume();
            }
        })

        document.addEventListener('keyup', (e)=>{
            keyUpHandlerDelay = setTimeout(()=>keyUpHandler(e), 85)
        })
    }
}
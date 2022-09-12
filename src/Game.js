import KeyDetector from './keyDetector';
import Player from './Player';
import PopupScreen from './PopupScreen';
import Bullet from './Bullet';

export default class Game{
    constructor(){
        this.animation;
        this.isAnimationRunning = false

        this.draw = this.draw.bind(this)
        this.resume = this.resume.bind(this)
        this.popupScreen = new PopupScreen(this)

        this.objects = []
    }

    start(){
        this.player = new Player(this);
        this.objects.push(this.player);
        new KeyDetector(this, this.player)
        this.draw()
    }

    draw(){
        this.objects.forEach(gameObject=>gameObject.move())
        this.animation = requestAnimationFrame(this.draw)
        this.isAnimationRunning = true;
    }

    resume(){
        this.draw()
        this.popupScreen.hide()
    }

    pause(){
        cancelAnimationFrame(this.animation)
        this.isAnimationRunning = false;

        this.popupScreen.show()
    }
}
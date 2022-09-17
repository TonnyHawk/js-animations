import KeyDetector from './keyDetector';
import Player from './basic/Player';
import PopupScreen from './PopupScreen';
import Bullet from './basic/Bullet';
import Enemy from './basic/Enemy';

export default class Game{
    constructor(){
        this.animation;
        this.isAnimationRunning = false

        this.canvasElement = document.getElementById('screen');
        this.screen = this.canvasElement.getContext('2d');

        this.draw = this.draw.bind(this)
        this.resume = this.resume.bind(this)
        this.popupScreen = new PopupScreen(this)

        this.objects = []
    }

    start(){
        this.player = new Player(this);
        this.objects.push(this.player);
        this.objects.push(new Enemy(this))
        new KeyDetector(this, this.player)
        this.draw()
    }

    draw(){
        this.screen.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
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
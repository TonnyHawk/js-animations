import KeyDetector from './keyDetector';
import Player from './basic/Player';
import PopupScreen from './PopupScreen';
import Enemy from './basic/Enemy';
import GameObject from './GameObject';

export default class Game{
    animation: ReturnType<typeof window.requestAnimationFrame> | null
    isAnimationRunning: boolean
    canvasElement: HTMLCanvasElement | null
    screen: CanvasRenderingContext2D | null
    objects: GameObject[]
    popupScreen: any
    player: any
    constructor(){
        this.animation = null;
        this.isAnimationRunning = false

        this.canvasElement = document.getElementById('screen') as HTMLCanvasElement;
        this.screen = this.canvasElement.getContext('2d') as CanvasRenderingContext2D;

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
        if(this.screen !== null && this.canvasElement !== null){
            this.screen.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
            this.objects.forEach((gameObject:GameObject)=>gameObject.move())
            this.animation = requestAnimationFrame(this.draw)
            this.isAnimationRunning = true;
        }
    }

    resume(){
        this.draw()
        this.popupScreen.hide()
    }

    pause(){
        if(this.animation !== null){
            cancelAnimationFrame(this.animation)
            this.isAnimationRunning = false;
    
            this.popupScreen.show()
        }else {
            console.log('Game can not be stopped');
            console.log('animation was not stored');
        }
        
    }
}
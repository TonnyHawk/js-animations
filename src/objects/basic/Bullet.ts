import GameObject from "./GameObject";
import Person from "./Person";
import { coordinate } from "../../types";
import { checkColision } from "../../utils";
import Game from "../Game";

export default class Bullet extends GameObject{
    player: Person
    flyRange: number
    startCoord: coordinate
    flightDelta: number
    speed: number
    direction: coordinate
    position: coordinate
    damage: number
    constructor(game:Game, player: Person){
        super(game)

        this.id = Date.now() * Math.floor(Math.random() * 100);
        this.player = player

        this.flyRange = 200;
        this.startCoord = {
            top: player.direction.top,
            left: player.direction.left
        }
        this.flightDelta = 0;

        this.moveVectorName = this.player.moveVectorName;

        this.height = 10;
        this.width = 10;

        this.speed = 10;

        this.direction = {top: 0, left: 0}
        this.setDirection();

        this.position = {top: 0, left: 0}
        this.setPosition()

        this.damage = 50;
    }

    setDirection(){
        switch(this.player.getDirectionName()){
            case 'left':
                this.direction.left = this.speed * -1;
                this.direction.top = 0;
                break;
            case 'right':
                this.direction.left = this.speed;
                this.direction.top = 0;
                break;
            case 'up':
                this.direction.top = this.speed * -1;
                this.direction.left = 0;
                break;
            case 'down':
                this.direction.top = this.speed * 1;
                this.direction.left = 0;
                break;
        }
    }

    setPosition(){
        switch(this.player.getDirectionName()){
            case 'left':
                this.position.top = this.player.getCoords().top + this.player.width / 2 - this.width / 2 + 0.8
                this.position.left = this.player.getCoords().left - this.width
                break;
            case 'right':
                this.position.top = this.player.getCoords().top + this.player.width / 2 - this.width / 2 + 0.8
                this.position.left = this.player.getCoords().right + this.width
                break;
            case 'up':
                this.position.top = this.player.getCoords().top - this.height
                this.position.left = this.player.getCoords().left + this.player.width / 2 - this.width / 2 + 0.8
                break;
            case 'down':
                this.position.top = this.player.getCoords().bottom + this.height
                this.position.left = this.player.getCoords().left + this.player.width / 2 - this.width / 2 + 0.8
                break;
        }

        this.startCoord = {
            top: this.position.top,
            left: this.position.left
        }
    }

    measureFlightDelta(){
        let delta = 0;
        if(this.moveVectorName === 'left' || this.moveVectorName === 'right' ){
            delta = this.startCoord.left - this.position.left;
        }else{
            delta = this.startCoord.top - this .position.top;
        }
        if(delta < 0) delta = delta * -1
        return delta
    }

    draw(){
        let {screen} = this.player.game;
        if(screen != null){
            screen.fillStyle = 'black';
            screen.fillRect(this.position.left, this.position.top, this.width, this.height)
        }
    }

    move(){
        if(this.player.game.canvasElement != null){
            let newTopCoord = this.getCoords().top + this.direction.top;
            let newLeftCoord = this.getCoords().left + this.direction.left;
            let newBottomCoord = this.getCoords().bottom + this.direction.top;
            let newRightCoord = this.getCoords().right + this.direction.left;
    
            if(this.measureFlightDelta() >= this.flyRange) this.die()
    
            // bullet collision with screen boundaries
            if(newTopCoord > 0 && newBottomCoord < this.player.game.canvasElement.height){
                this.position.top = newTopCoord;
            }else this.die()
            if(newLeftCoord > 0 && newRightCoord < this.player.game.canvasElement.width){
                this.position.left = newLeftCoord;
            }else this.die()
    
            this.draw()
        }


        this.game.objects.forEach(obj=>{
            if(obj.isDamagable){
                if(checkColision(this, obj)) {
                    console.log('Some object is being hit by bullet');
                    this.die()
                    obj.getDamaged(this.damage)
                }
            }
        })
        
    }
}
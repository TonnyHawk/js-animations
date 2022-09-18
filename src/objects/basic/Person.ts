import Game from "../Game";
import GameObject from "./GameObject";

type moveVector = 'up' | 'down' | 'left' | 'right'
interface coordinate {
    top: number,
    left: number
}

export default class Person extends GameObject{
    speed: number;
    direction: coordinate;
    gun?: object
    game: Game
    constructor(game: Game){
        super(game)
        this.speed = 6
        this.direction = {
            top: 0,
            left: 0
        }

        this.isDamagable = true
    }

    turn(vector: moveVector){
        this.moveVectorName = vector
    }

    setDirection(vector: moveVector, speed=this.speed){
        switch(vector){
            case 'left':
                this.direction.left = speed * -1;
                this.direction.top = 0;
                this.turn('left');
                break;
            case 'right':
                this.direction.left = speed;
                this.direction.top = 0;
                this.turn('right');
                break;
            case 'up':
                this.direction.top = speed * -1;
                this.direction.left = 0;
                this.turn('up');
                break;
            case 'down':
                this.direction.top = speed * 1;
                this.direction.left = 0;
                this.turn('down');
                break;
        }
    }

    stop(){
        this.direction.left = 0;
        this.direction.top = 0; 
    }

    faceToTarget(selfLeft: number, selfTop: number, targetLeft: number, targetTop: number){
        if(selfLeft > targetLeft) this.turn('left')
        else if(selfLeft < targetLeft) this.turn('right')
        if(selfTop > targetTop) this.turn('up')
        else if(selfTop < targetTop) this.turn('down')
    }
}
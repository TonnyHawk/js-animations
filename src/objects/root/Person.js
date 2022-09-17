import GameObject from "../GameObject";

export default class Person extends GameObject{
    constructor(){
        super()
        this.speed = 6
    }

    turn(direction){
        this.moveVectorName = direction
    }

    setDirection(direction, speed=this.speed){
        switch(direction){
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
}
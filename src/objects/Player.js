import Bullet from "./Bullet";
import GameObject from "./GameObject";

export default class Player extends GameObject{
    constructor(game){
        super()
        this.game = game

        this.height = 50;
        this.width = 50;
        this.position = {
            top:  this.game.canvasElement.height / 2 - this.height / 2,
            left: this.game.canvasElement.width / 2 - this.width / 2
        }

        this.speed = 6;
        this.direction = {
            top: 0,
            left: 0
        }

        this.moveVectorName = 'up';

        this.draw()
    }

    turn(direction){
        this.moveVectorName = direction
    }

    draw(){
        this.game.screen.fillStyle = 'red';
        this.game.screen.fillRect(this.position.left, this.position.top, this.width, this.height)
        
        let arrowImage = document.getElementById('player-direction-arrow');
        let shrinkRatio = this.height / arrowImage.height;

        let rotateObject = (angle)=>{
            this.game.screen.save()
            this.game.screen.translate(this.position.left + this.width / 2, this.position.top + this.height / 2)
            this.game.screen.rotate(angle * Math.PI/180)
            this.game.screen.fillStyle = 'blue';
            this.game.screen.drawImage(arrowImage, -1 * this.width / 2 + 8.5, -1 * this.height / 2, this.width * shrinkRatio, this.height)
            this.game.screen.restore()
        }
        switch(this.moveVectorName){
            case 'left':
                rotateObject(-90);
                break;
            case 'right':
                rotateObject(90);
                break;
            case 'up':
                rotateObject(0);
                break;
            case 'down':
                rotateObject(180);
                break;
        }
    }

    move(){
        let newTopCoord = this.getCoords().top + this.direction.top;
        let newLeftCoord = this.getCoords().left + this.direction.left;
        let newBottomCoord = this.getCoords().bottom + this.direction.top;
        let newRightCoord = this.getCoords().right + this.direction.left;

        if(newTopCoord > 0 && newBottomCoord < this.game.canvasElement.height){
            this.position.top = newTopCoord
        }
        if(newLeftCoord >=0 && newRightCoord < this.game.canvasElement.width){
            this.position.left = newLeftCoord
        }

        this.draw()
    }

    shoot(){
        console.log('Äshoot');
        this.game.objects.push(new Bullet(this))
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
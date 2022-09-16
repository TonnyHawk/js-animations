import { getModulus } from "../utils";
import GameObject from "./GameObject";
import Bullet from "./Bullet";

export default class Enemy extends GameObject{
    constructor(game){
        super()
        this.game = game
        this.target = game.player

        this.height = 50;
        this.width = 50;
        this.position = {
            top:  0,
            left: 0
        }

        this.speed = this.target.speed - 3;
        this.temporarySpeed = this.speed;
        this.direction = {
            top: 0,
            left: 0
        }

        this.shootRange = 200;

        this.moveVectorName = 'up';

        this.shoot = this.shoot.bind(this)

        this.draw()
    }

    turn(direction){
        this.moveVectorName = direction
    }

    draw(){
        this.game.screen.fillStyle = 'blue';
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

    followTheTarget(callback){
        let targetTop = this.target.position.top
        let targetLeft = this.target.position.left
        let selfTop = this.position.top
        let selfLeft = this.position.left

        let deltaTop = getModulus(targetTop - selfTop)
        let deltaLeft = getModulus(targetLeft - selfLeft)

        let range = this.shootRange
        if(deltaTop !== 0 && deltaLeft !== 0){
            range = 0
        }

        if(deltaTop >= range){
            let speed = this.speed;
            if(deltaTop < this.speed) speed = deltaTop
            if(selfTop > targetTop) this.setDirection('up', speed)
            else if(selfTop < targetTop) this.setDirection('down', speed)
        }else if(deltaLeft >= range){
            let speed = this.speed;
            if(deltaLeft < this.speed) speed = deltaLeft
            if(selfLeft > targetLeft) this.setDirection('left', speed)
            else if(selfLeft < targetLeft) this.setDirection('right', speed)
        }else{
            this.direction.left = 0;
            this.direction.top = 0;
            if(selfLeft > targetLeft) this.turn('left')
            else if(selfLeft < targetLeft) this.turn('right')
            if(selfTop > targetTop) this.turn('up')
            else if(selfTop < targetTop) this.turn('down')

            callback()
        }

    }

    move(){
        this.followTheTarget(this.shoot)

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
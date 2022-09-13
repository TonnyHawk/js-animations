import Bullet from "./Bullet";

export default class Player{
    constructor(game){
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
        switch(direction){
            case 'left':
                // this.playerElem.style.transform = 'rotate(-90deg)';
                break;
            case 'right':
                // this.playerElem.style.transform = 'rotate(90deg)';
                break;
            case 'up':
                // this.playerElem.style.transform = 'rotate(0deg)';
                break;
            case 'down':
                // this.playerElem.style.transform = 'rotate(180deg)';
                break;
        }
        this.moveVectorName = direction
    }

    draw(){
        this.game.screen.fillStyle = 'red';
        this.game.screen.fillRect(this.position.left, this.position.top, this.width, this.height)
        let arrowImage = document.getElementById('player-direction-arrow');
        let shrinkRatio = this.height / arrowImage.height;
        this.game.screen.drawImage(arrowImage, this.position.left + this.width / 2 - 16.5, this.position.top, this.width * shrinkRatio, this.height)
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

    getCoords(){
        return {
            top: this.position.top,
            left: this.position.left,
            bottom: this.position.top + this.height,
            right: this.position.left + this.width
        }
    }

    getDirectionName(){
        return this.moveVectorName
    }

    setDirection(direction){
        switch(direction){
            case 'left':
                this.direction.left = this.speed * -1;
                this.direction.top = 0;
                this.turn('left');
                break;
            case 'right':
                this.direction.left = this.speed;
                this.direction.top = 0;
                this.turn('right');
                break;
            case 'up':
                this.direction.top = this.speed * -1;
                this.direction.left = 0;
                this.turn('up');
                break;
            case 'down':
                this.direction.top = this.speed * 1;
                this.direction.left = 0;
                this.turn('down');
                break;
        }
    }
}
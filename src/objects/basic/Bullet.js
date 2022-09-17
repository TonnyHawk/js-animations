import GameObject from "../GameObject";

export default class Bullet extends GameObject{
    constructor(player){
        super()

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

        this.direction = {}
        this.setDirection();

        this.position = {}
        this.setPosition()
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
                this.position.left = this.player.getCoords().left
                break;
            case 'right':
                this.position.top = this.player.getCoords().top + this.player.width / 2 - this.width / 2 + 0.8
                this.position.left = this.player.getCoords().right
                break;
            case 'up':
                this.position.top = this.player.getCoords().top
                this.position.left = this.player.getCoords().left + this.player.width / 2 - this.width / 2 + 0.8
                break;
            case 'down':
                this.position.top = this.player.getCoords().bottom
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
        screen.fillStyle = 'black';
        screen.fillRect(this.position.left, this.position.top, this.width, this.height)
    }

    move(){
        let newTopCoord = this.getCoords().top + this.direction.top;
        let newLeftCoord = this.getCoords().left + this.direction.left;
        let newBottomCoord = this.getCoords().bottom + this.direction.top;
        let newRightCoord = this.getCoords().right + this.direction.left;

        if(this.measureFlightDelta() >= this.flyRange) this.destroy()

        // bullet collision with screen boundaries
        if(newTopCoord > 0 && newBottomCoord < this.player.game.canvasElement.height){
            this.position.top = newTopCoord;
        }
        if(newLeftCoord > 0 && newRightCoord < this.player.game.canvasElement.width){
            this.position.left = newLeftCoord;
        }

        this.draw()
    }

    destroy(){
        let thisIndex = this.player.game.objects.findIndex(el=>el.id===this.id)
        this.player.game.objects.splice(thisIndex, 1)
    }
}

export default class Bullet{
    constructor(player){

        this.id = Date.now() * Math.floor(Math.random() * 100);
        this.player = player
        let referenceElement = document.getElementById('bullet');
        this.playerElem = referenceElement.cloneNode(true);
        document.body.append(this.playerElem)

        this.flyRange = 200;
        this.startCoord = {
            top: player.direction.top,
            left: player.direction.left
        }
        this.flightDelta = 0;

        this.moveVectorName = 'up';

        this.height = parseInt(getComputedStyle(this.playerElem).height);
        this.width = parseInt(getComputedStyle(this.playerElem).width);

        this.speed = 10;

        this.direction = {}
        this.setDirection();

        this.position = {}
        this.setPosition()

        this.playerElem.style.top = this.position.top + 'px'
        this.playerElem.style.left = this.position.left + 'px'
    }

    getDirectionName(){
        return this.moveVectorName
    }

    setDirection(){
        switch(this.player.getDirectionName()){
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

    turn(direction){
        switch(direction){
            case 'left':
                this.playerElem.style.transform = 'rotate(-90deg)';
                break;
            case 'right':
                this.playerElem.style.transform = 'rotate(90deg)';
                break;
            case 'up':
                this.playerElem.style.transform = 'rotate(0deg)';
                break;
            case 'down':
                this.playerElem.style.transform = 'rotate(180deg)';
                break;
        }
        this.moveVectorName = direction
    }

    measureFlightDelta(){
        let delta = 0;
        if(this.moveVectorName === 'left' || this.moveVectorName === 'right' ){
            delta = this.startCoord.left - parseInt(this.playerElem.style.left);
        }else{
            delta = this.startCoord.top - parseInt(this.playerElem.style.top);
        }
        if(delta < 0) delta = delta * -1
        return delta
    }

    move(){
        let newTopCoord = this.getCoords().top + this.direction.top;
        let newLeftCoord = this.getCoords().left + this.direction.left;
        let newBottomCoord = this.getCoords().bottom + this.direction.top;
        let newRightCoord = this.getCoords().right + this.direction.left;

        console.log(this.measureFlightDelta());
        if(this.measureFlightDelta() >= this.flyRange) this.destroy()

        // bullet collision with screen boundaries
        if(newTopCoord > 0 && newBottomCoord < window.innerHeight){
            this.playerElem.style.top = newTopCoord + 'px';
        }
        if(newLeftCoord > 0 && newRightCoord < window.innerWidth){
            this.playerElem.style.left = newLeftCoord + 'px';
        }
    }

    destroy(){
        let thisIndex = this.player.game.objects.findIndex(el=>el.id===this.id)
        this.player.game.objects.splice(thisIndex, 1)
        this.playerElem.remove();
    }

    getCoords(){
        return this.playerElem.getBoundingClientRect()
    }
}
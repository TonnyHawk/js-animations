export default class Bullet{
    constructor(player){

        this.player = player
        let referenceElement = document.getElementById('bullet');
        this.playerElem = referenceElement.cloneNode(true);
        document.body.append(this.playerElem)

        this.flyRange = 100;
        this.startCoord = {
            top: player.direction.top,
            left: player.direction.left
        }

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
    }

    move(){
        let newTopCoord = this.getCoords().top + this.direction.top;
        let newLeftCoord = this.getCoords().left + this.direction.left;
        let newBottomCoord = this.getCoords().bottom + this.direction.top;
        let newRightCoord = this.getCoords().right + this.direction.left;

        // bullet collision with screen boundaries
        if(newTopCoord > 0 && newBottomCoord < window.innerHeight){
            this.playerElem.style.top = newTopCoord + 'px';
        }
        if(newLeftCoord > 0 && newRightCoord < window.innerWidth){
            this.playerElem.style.left = newLeftCoord + 'px';
        }
    }

    getCoords(){
        return this.playerElem.getBoundingClientRect()
    }
}
export default class Bullet{
    constructor(player){

        this.playerElem = document.getElementById('bullet');

        this.height = parseInt(getComputedStyle(this.playerElem).height);
        this.width = parseInt(getComputedStyle(this.playerElem).width);

        this.position = {
            top: player.getCoords().top,
            left: player.getCoords().left + player.width / 2 - this.width / 2 + 0.8
        }
        this.speed = 10;
        this.direction = {
            top: player.direction.top + this.speed,
            left: player.direction.left
        }

        this.playerElem.style.top = this.position.top + 'px'
        this.playerElem.style.left = this.position.left + 'px'
    }

    move(){
        let newTopCoord = this.getCoords().top + this.direction.top;
        let newLeftCoord = this.getCoords().left + this.direction.left;
        let newBottomCoord = this.getCoords().bottom + this.direction.top;
        let newRightCoord = this.getCoords().right + this.direction.left;

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
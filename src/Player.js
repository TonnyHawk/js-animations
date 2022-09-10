export default class Player{
    constructor(){
        this.playerElem = document.getElementById('cube');
        this.position = {
            top:  window.innerHeight / 2 - 50 + 'px',
            left: window.innerWidth / 2 - 90 + 'px'
        }

        this.speed = 3;
        this.direction = {
            top: this.speed * 1,
            left: 0
        }
        this.playerElem.style.top = this.position.top;
        this.playerElem.style.left = this.position.left;
    }

    move(){
        this.playerElem.style.top = parseInt(this.playerElem.style.top) + this.direction.top + 'px';
        this.playerElem.style.left = parseInt(this.playerElem.style.left) + this.direction.left + 'px';
    }
}
export default class Player{
    constructor(){
        this.playerElem = document.getElementById('cube');
        this.position = {
            top:  window.innerHeight / 2 - 50 + 'px',
            left: window.innerWidth / 2 - 90 + 'px'
        }

        this.speed = 6;
        this.direction = {
            top: 0,
            left: 0
        }

        this.playerElem.style.top = this.position.top;
        this.playerElem.style.left = this.position.left;

        this.height = parseInt(getComputedStyle(this.playerElem).height);
        this.width = parseInt(getComputedStyle(this.playerElem).width);
    }

    // place the player somewhere on the map
    place(where){
        function updatePositionOnTheScreen(){
            this.playerElem.style.top = this.position.top;
            this.playerElem.style.left = this.position.left;
        }
        switch(where){
            case 'init':
                this.position.top = window.innerHeight / 2 - 50 + 'px';
                this.position.left = window.innerWidth / 2 - 90 + 'px';
                updatePositionOnTheScreen();
                break;
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
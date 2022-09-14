export default class GameObject{
    constructor(){
        this.id = Date.now() * Math.floor(Math.random() * 100);
    }
    getDirectionName(){
        return this.moveVectorName
    }
    getCoords(){
        return {
            top: this.position.top,
            left: this.position.left,
            bottom: this.position.top + this.height,
            right: this.position.left + this.width
        }
    }
}
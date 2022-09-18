 import {moveVector, coordinate} from '../../types'

export default class GameObject{
    id: number
    moveVectorName: moveVector;
    position: coordinate
    height: number
    width: number
    markedForDeletion: boolean
    constructor(){
        this.id = Date.now() * Math.floor(Math.random() * 100);
        this.moveVectorName = 'up';
        this.position = {
            top: 0,
            left: 0
        }
        this.height = 10;
        this.width = 10;
        this.markedForDeletion = false
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
    move(){}
}
 import {moveVector, coordinate} from '../../types'
import Game from '../Game';

export default class GameObject{
    id: number
    moveVectorName: moveVector;
    position: coordinate
    height: number
    width: number
    markedForDeletion: boolean
    isDamagable: boolean
    game: Game
    hp: number
    constructor(game: Game){
        this.id = Date.now() * Math.floor(Math.random() * 100);
        this.moveVectorName = 'up';
        this.position = {
            top: 0,
            left: 0
        }
        this.height = 10;
        this.width = 10;
        this.markedForDeletion = false
        this.game = game
        this.hp = 100;
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
    getDamaged(damage:number){
        this.hp -= damage
        console.log('hp: '+this.hp);
        
        if(this.hp <= 0) this.die()
    }

    die(){
        // make some animations and side effects and then
        // disapear
        this.markedForDeletion = true
    }
    move(){}
}
import { getTimestamp } from "../../utils";
import Game from "../Game";
import Bullet from "./Bullet";

export default class Gun{

    clipSize: number;
    bulletsInClip: number;
    shotRange: number;
    isReloading: boolean
    remainingTime: {
        min: number;
        max?: number;
    }
    owner: any
    lastShotTime: number
    game: Game

    constructor(game:Game, owner: any){
        this.clipSize = 3;
        this.bulletsInClip = 3;
        this.shotRange = 200;
        this.isReloading = false;
        // time betwen two shots
        this.remainingTime = {
            min: 300
        }
        this.owner = owner;
        this.lastShotTime = getTimestamp();
        this.game = game
    }
    reload(){
        this.isReloading = true
        console.log('reloading');
        setTimeout(()=>{
            this.isReloading = false
            this.bulletsInClip = this.clipSize
            console.log(this.owner.id);
            console.log('gun is ready to shot');
        }, 2000)
    }
    shot(){
        if(this.bulletsInClip > 0){
            let now = getTimestamp()
            if((now - this.lastShotTime) > this.remainingTime.min){
                this.owner.game.objects.push(new Bullet(this.game, this.owner))
                this.bulletsInClip -= 1;
                this.lastShotTime = now
            }
        }else if(this.bulletsInClip === 0 && this.isReloading === false){
            this.reload()
        }
    }
}
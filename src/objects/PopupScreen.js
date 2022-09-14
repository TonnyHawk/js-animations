export default class PopupScreen{
    constructor(game){
        document.getElementById('resume-btn').addEventListener('click', game.resume)
        this.titleElement = document.getElementById('popup-screen-title')
    }

    printTitle(text){
        this.titleElement.innerText = text
    }

    show(){
        document.querySelector('.popup-screen').classList.add('is-active')
    }

    hide(){
        document.querySelector('.popup-screen').classList.remove('is-active')
    }
}
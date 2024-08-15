const embyImage = new Image()
embyImage.src = './img/embySprite.png'

width = window.innerWidth
height = window.innerHeight
 
const draggleImage = new Image()
draggleImage.src = './img/draggleSprite.png'
const enemyPos = {
    x: width * 0.8,
    y: height * 0.25
}

const playerPos = {
    x: width * 0.32,
    y: height * 0.65
}
const monsters = {
    Emby: {
        position: playerPos,
        image: embyImage,
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        slowdown: false,
        maxHealth: 220,
        name: 'Emby'
    },
    Draggle: {
        position: enemyPos,
        image: draggleImage,
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        slowdown: true,
        maxHealth: 100,
        isEnemy: true,
        name: 'Draggle'
    }
}
width = window.innerWidth
height = window.innerHeight
 
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
        image: {
            src: './img/embySprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        slowdown: false,
        maxHealth: 100,
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.Fireball]
    },
    Draggle: {
        position: enemyPos,
        image: {
            src: './img/draggleSprite.png'
        },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        slowdown: true,
        maxHealth: 100,
        isEnemy: true,
        name: 'Draggle',
        attacks: [attacks.Tackle, attacks.Fireball]
    }
}
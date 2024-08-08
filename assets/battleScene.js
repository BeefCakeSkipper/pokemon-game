const battleImage = new Image()
battleImage.src = '/img/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleImage
}
)

const draggleImage = new Image()
draggleImage.src = '/img/draggleSprite.png'
const draggle = new Sprite({
    position: {
        x: canvas.width*0.8,
        y: canvas.height*0.25
    },
    image: draggleImage,
    frames: {
        max: 4,
        hold: 30
    },
    animate: true,
    slowdown: true,
    maxHealth: 100,
    isEnemy : true,
    name: 'Draggle'
})

const embyImage = new Image()
embyImage.src = '/img/embySprite.png'
const emby = new Sprite({
    position: {
        x: canvas.width*0.32,
        y: canvas.height*0.65
    },
    image: embyImage,
    frames: {
        max: 4,
        hold: 30
    },
    animate: true,
    slowdown: false,
    maxHealth: 120,
    name: 'Emby'
})

const renderedSprites = [draggle, emby]
function animateBattle() {
    frame = 'animateBattle'
    window.requestAnimationFrame(animateBattle)
    c.drawImage(battleBackground.image, 0, 0, battleImage.width, battleImage.height, 0, 0, canvas.width, canvas.height)

    renderedSprites.forEach((sprite) => {
        sprite.draw()


    })

}

document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        draggle.attack({
            attack: selectedAttack, 
            target: emby,
            renderedSprites
        })
        console.log(renderedSprites);
    })
})

animateBattle()

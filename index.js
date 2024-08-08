//Initial Set up 
//Background image set up
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let frame = ''
console.log(gsap);
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const image = new Image()
image.src = './img/Pellet Town.png'
console.log(image);

//PLayer Image Set up
const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'





const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}


const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
    battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}

const chanceEncounter = 0.01
const boundaries = []
const offset = {
    x: 30,
    y: -260
}


collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
    })
})

const battleZones = []
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            battleZones.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
    })
})


const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 8, //Actual coordinates of player
        y: canvas.height / 2 - (68 / 2)  //Actual coordinates of playerad
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})


//Variables
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const battle = {
    initiated: false
}

const moveables = [background, ...boundaries, foreground, ...battleZones]

//Functions
function collisionDetection({ rectangle1, rectangle2 }) {

    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
function animate() {
    frame = 'animate'
    const animationId = window.requestAnimationFrame(animate) //Loops the animate function
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
        if (collisionDetection({
            rectangle1: player,
            rectangle2: boundary
        })) {
            console.log('col');
        }
    })

    battleZones.forEach((battleZone) => {
        battleZone.draw()
    })

    player.draw()
    foreground.draw()
    let moving = true
    player.animate = false

    if (battle.initiated) return
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlappingArea = (
                Math.min(
                    player.position.x + player.width,
                    battleZone.position.x + battleZone.width) -
                Math.max(player.position.x, battleZone.position.x))
                * (
                    Math.min(
                        player.position.y + player.height,
                        battleZone.position.y + battleZone.height) -
                    Math.max(
                        player.position.y, battleZone.position.y))

            if (
                collisionDetection({
                    rectangle1: player,
                    rectangle2: battleZone
                }) &&
                overlappingArea > (player.width * player.height) / 2.8
                && Math.random() < chanceEncounter
            ) {
                // console.log(overlappingArea);
                console.log('Battle Zone Collision');
                window.cancelAnimationFrame(animationId)
                battle.initiated = true
                gsap.to('#overlappingBattle', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingBattle', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                // c.fillStyle(0,0,0,0)
                                animateBattle()
                                gsap.to('#overlappingBattle', {
                                    opacity: 0,
                                    duration: 0.4,

                                })
                            }
                        })
                    }
                })
                break
            }
        }
    }


    if (keys.w.pressed && lastKey === 'w') {
        // playerImage.src = './img/playerUp.png'
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {

            player.animate = true
            const boundary = boundaries[i]
            if (
                collisionDetection({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                console.log('collidingggg');
                moving = false
                break
            }
        }

        if (moving)
            moveables.forEach((moveable) => {
                moveable.position.y += 3
            })
    }
    else if (keys.s.pressed && lastKey === 's') {
        // playerImage.src = './img/playerDown.png'
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            player.animate = true
            const boundary = boundaries[i]
            if (
                collisionDetection({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ) {
                console.log('collidingggg');
                moving = false
                break
            }
        }
        if (moving)
            moveables.forEach((moveable) => {
                moveable.position.y -= 3
            })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        // playerImage.src = './img/playerLeft.png'
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            player.animate = true
            const boundary = boundaries[i]
            if (
                collisionDetection({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log('collidingggg');
                moving = false
                break
            }
        }
        if (moving)
            moveables.forEach((moveable) => {
                moveable.position.x += 3
            })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.image = player.sprites.right
        // playerImage.src = './img/playerRight.png'
        for (let i = 0; i < boundaries.length; i++) {
            player.animate = true
            const boundary = boundaries[i]
            if (
                collisionDetection({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log('collidingggg');
                moving = false
                break
            }
        }
        if (moving)
            moveables.forEach((moveable) => {
                moveable.position.x -= 3
            })
    }
}

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
// animate();


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /**
     * Your drawings need to be inside this function otherwise they will be reset when 
     * you resize the browser window and the canvas goes will be cleared.
     */
    // window[frame]();
    window[requestAnimationFrame(frame)]();
}
// Listener events
// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, true);
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
    console.log(keys);
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

    }
    console.log(keys);
})


animateBattle()
// animate()


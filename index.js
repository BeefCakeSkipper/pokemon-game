//Initial Set up 
//Background image set up
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const image = new Image()
image.src = './img/Pellet Town.png'
console.log(image);

//PLayer Image Set up
const playerImage = new Image()
playerImage.src = './img/playerDown.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

const offset = {
    x: 30,
    y: -260
}



const boundaries = []
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



const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 8, //Actual coordinates of player
        y: canvas.height / 2 - (68 / 2)  //Actual coordinates of playerad
    },
    image: playerImage,
    frames: {
        max: 4
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


const moveables = [background, ...boundaries, foreground]

//Functions
function collisionDetection({ rectangle1, rectangle2 }) {

    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
function animate() {
    window.requestAnimationFrame(animate) //Loops the animate function
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
    player.draw()
    foreground.draw()
    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
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
        for (let i = 0; i < boundaries.length; i++) {
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
        for (let i = 0; i < boundaries.length; i++) {
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
        for (let i = 0; i < boundaries.length; i++) {
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

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    /**
     * Your drawings need to be inside this function otherwise they will be reset when 
     * you resize the browser window and the canvas goes will be cleared.
     */
    animate()
}


animate();
// Listener events
// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);
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






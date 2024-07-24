//Initial Set up 
//Background image set up
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth - 25
canvas.height = window.innerHeight
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './img/Pellet Town.png'
console.log(image);

//PLayer Image Set up
const playerImage = new Image()
playerImage.src = './img/playerDown.png'

//Classes
class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: 30,
        y: -200
    },
    image: image
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

//Functions
function animate() {
    window.requestAnimationFrame(animate) //Loops the animate function
    background.draw()

    c.drawImage(
        playerImage,
        0, //Cropping
        0, //Cropping
        playerImage.width / 4, //Cropping
        playerImage.height, //Cropping
        canvas.width / 2 - playerImage.width / 8, //Actual coordinates of player
        canvas.height / 2 - playerImage.height / 2,  //Actual coordinates of player
        playerImage.width / 4, //Actual coordinates of player 
        playerImage.height //Actual coordinates of player
    )
    if (keys.w.pressed && lastKey === 'w') background.position.y += 3
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
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






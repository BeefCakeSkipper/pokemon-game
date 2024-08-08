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
const enemyPos = {
  x: canvas.width*0.8,
  y: canvas.height*0.25
}

const playerPos = {
  x: canvas.width*0.32,
  y: canvas.height*0.65
}

const draggleImage = new Image()
draggleImage.src = '/img/draggleSprite.png'
const draggle = new Sprite({
    position: enemyPos,
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
})

const renderedSprites = [draggle, emby]
const button = document.createElement('button')
button.innerHTML = 'Fireball'
function animateBattle() {
    frame = 'animateBattle'
    window.requestAnimationFrame(animateBattle)
    c.drawImage(battleBackground.image, 0, 0, battleImage.width, battleImage.height, 0, 0, canvas.width, canvas.height)

    renderedSprites.forEach((sprite) => {
        sprite.draw()


    })

}
const queue = []

document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        button.disabled = true
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        console.log(emby.health);
        console.log(emby.maxHealth);
        emby.attack({
            attack: selectedAttack, 
            target: draggle,
            renderedSprites
        })
        console.log(renderedSprites);
        queue.push(() => {
          draggle.attack({
            attack: selectedAttack,
            target: emby,
            renderedSprites
          })
        })
    })
})

document.querySelector('#dialogueBox').addEventListener('click', (e)=> {
  if(queue.length > 0)
  {
    document.querySelectorAll('button').forEach((button) => {
      button.disabled = false
    })
    queue[0]()
    queue.shift()
  }
  else {
    e.currentTarget.style.display = 'none'
  }
})

animateBattle()

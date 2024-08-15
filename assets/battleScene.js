const battleImage = new Image()
battleImage.src = './img/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleImage
}
)


const draggle = new Sprite(monsters.Draggle)


const emby = new Sprite(monsters.Emby)

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

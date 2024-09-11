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

let draggle
let emby
let renderedSprites
let battleAnimationId
let queue

function battleEndTransition() {
  gsap.to('#overlappingBattle', {
    opacity: 1,
    onComplete: () => {
      cancelAnimationFrame(battleAnimationId)
      animate()
      document.querySelector('#UI').style.display = 'none'
      gsap.to('#overlappingBattle', {
        opacity: 0
      })
      battle.initiated = false
      // audio.Battle.stop()
      audio.Map.play()
    }
  })
}

function initBattle() {
  document.querySelector('#UI').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealth').style.width = '100%'
  document.querySelector('#playerHealth').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  draggle = new Monster(monsters.Draggle)
  emby = new Monster(monsters.Emby)
  renderedSprites = [draggle, emby]
  queue = []
  emby.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
  })

  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      button.disabled = true
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      emby.attack({
        attack: selectedAttack,
        target: draggle,
        renderedSprites
      })
      addEventListener('click', () => {
        if (draggle.health <= 0) {
          queue.push(() => {
            draggle.faint()
          })
          queue.push(() => {
            battleEndTransition()
          })
        }
        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint()
          })
          queue.push(() => {
            battleEndTransition()
          })
        }
      })
  



      // enemy attacks happening here
      const randAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

      queue.push(() => {
        draggle.attack({
          attack: randAttack,
          target: emby,
          renderedSprites
        })
      })
    })
    button.addEventListener('mouseover', (e) => {
      const hoverAttack = attacks[e.currentTarget.innerHTML]
      document.querySelector('#attackType').innerHTML = hoverAttack.type
      document.querySelector('#attackType').style.color = hoverAttack.color
      button.addEventListener('mouseleave', (e) => {
        document.querySelector('#attackType').innerHTML = 'Attack Type'
        document.querySelector('#attackType').style.color = 'black'
      })
    })
  })

}
function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  c.drawImage(battleBackground.image, 0, 0, battleImage.width, battleImage.height, 0, 0, canvas.width, canvas.height)

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}
animate()
// initBattle()
// animateBattle()


document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
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

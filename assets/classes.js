class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw() {
        c.fillStyle = 'rgba(255,0,0,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class Sprite {
    constructor({
        position,
        velocity,
        image, frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        slowdown = false,
        rotation = 0
    }) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.image.src = image.src
        this.animate = animate
        this.sprites = sprites
        this.slowdown = slowdown
        this.opacity = 1
        this.rotation = rotation

    }

    draw() {
        c.save()
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        c.rotate(this.rotation)
        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.val * this.width, //Cropping
            0, //Cropping
            this.image.width / this.frames.max, //Cropping
            this.image.height, //Cropping
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, //Actual coordinates of player 
            this.image.height //Actual coordinates of player
        )
        c.restore()
        if (!this.animate) return
        if (this.frames.max > 1 && this.slowdown === true) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}

class Monster extends Sprite {
    constructor({
        position,
        velocity,
        image, frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        slowdown = false,
        rotation = 0,
        isEnemy = false,
        maxHealth,
        name,
        displayName,
        attacks
    }) {
        super({
            position,
            velocity,
            image,
            frames,
            sprites,
            animate,
            slowdown,
            rotation,

        })
        this.maxHealth = maxHealth
        this.health = maxHealth
        this.isEnemy = isEnemy
        this.name = name
        this.displayName = name
        this.attacks = attacks
    }

    faint() {
        document.querySelector('#dialogueBox').innerHTML = this.displayName + ' has dieded! '
        audio.Battle.stop()
        audio.Victory.play()
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
    }

    attack({ attack, target, renderedSprites }) {
        //GLobal variables when attacking 
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.displayName + ' used ' + attack.name

        // wait_dialogue()
        // target.health -= attack.damage
        let movementDistance = 20
        if (this.isEnemy) movementDistance = -20
        let healthBar = '#enemyHealth'
        if (this.isEnemy) healthBar = '#playerHealth'
        let rotation = 1
        if (this.isEnemy) rotation = -2.5
        target.health -= attack.damage
        switch (attack.name) {
            case 'Fireball':
                const fireballImage = new Image()
                fireballImage.src = '/img/fireball.png'
                audio.InitFireball.play()
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    slowdown: true,
                    rotation: rotation
                })
                renderedSprites.splice(1, 0, fireball)
                gsap.to(fireball.position, {
                    x: target.position.x,
                    y: target.position.y,
                    onComplete: () => {
                        // Pokemon gets hit
                        audio.FireballHit.play()
                        gsap.to(healthBar, {
                            width: (target.health / target.maxHealth) * 100 + '%'
                        })
                        gsap.to(target.position, {
                            x: target.position.x + 10,
                            yoyo: true,
                            repeat: 4,
                            duration: 0.07,
                            onComplete() {

                                gsap.to(target.position,
                                    {
                                        x: target.position.x - 10
                                    }
                                )
                            }
                        })
                        gsap.to(target, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.07
                        })
                        renderedSprites.splice(1, 1)
                    }
                }
                )
                break
            case 'Tackle':
                const tl = gsap.timeline()
                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + (movementDistance * 3),
                    duration: 0.2,
                    onComplete: () => {

                        // Pokemon gets hit
                        audio.Tackle.play()
                        gsap.to(healthBar, {
                            width: (target.health / target.maxHealth) * 100 + '%'
                        })
                        gsap.to(target.position, {
                            x: target.position.x + 10,
                            yoyo: true,
                            repeat: 4,
                            duration: 0.07,
                            onComplete() {
                                gsap.to(target.position,
                                    {
                                        x: target.position.x - 10
                                    }
                                )
                            }
                        })
                        gsap.to(target, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.07
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
                break;
        }
    }
}
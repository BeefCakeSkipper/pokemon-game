class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw() {
        c.fillStyle = 'rgba(255,0,0,1)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class Sprite {
    constructor({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate = false, slowdown = false, maxHealth, health, isEnemy = false }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate = animate
        this.sprites = sprites
        this.slowdown = slowdown
        this.opacity = 1
        this.maxHealth = maxHealth
        this.health = maxHealth
        this.isEnemy = isEnemy
    }

    draw() {
        c.save()
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

    attack({ attack, target }) {
        switch (attack.name) {
            case 'Fireball':
                const fireballImage = new Image()
                fireballImage.src = '/img/fireball.png'
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage  
                })
                break
            case 'Tackle':
                const tl = gsap.timeline()
                this.health -= attack.damage
                let movementDistance = 20
                if (this.isEnemy) movementDistance = -20
                let healthBar = '#enemyHealth'
                if (this.isEnemy) healthBar = '#playerHealth'

                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + (movementDistance * 3),
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(healthBar, {
                            width: (this.health / this.maxHealth) * 100 + '%'
                        })
                        gsap.to(target.position, {
                            x: target.position.x + 10,
                            yoyo: true,
                            repeat: 4,
                            duration: 0.07
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

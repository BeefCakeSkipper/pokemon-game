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
    }}


class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites}) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0}
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false 
        this.sprites = sprites
    }   
    draw() {
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
        if (!this.moving) return
        // if (this.frames.max > 1){
        //     this.frames.elapsed++
        // }
        if (this.frames.elapsed % 15 === 0){
        if (this.frames.val < this.frames.max - 1 ) this.frames.val++
        else this.frames.val = 0
    }
}}

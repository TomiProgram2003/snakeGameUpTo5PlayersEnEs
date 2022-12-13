
class Food {
    constructor(cols, rows, matrix) {
        this.cols = cols
        this.rows = rows
        this.matrix = matrix
        this.setPosition()
    }

    setPosition = () => {
        let x = Math.floor(Math.random() * this.cols)
        let y = Math.floor(Math.random() * this.rows)
        
        if (this.matrix[y][x].element.classList.length == 2) {
            this.setPosition()

        } else {
            this.x = x
            this.y = y
        }
    }

    checkCollision = (player) => {
        if (player.x == this.x && player.y == this.y) {
            player.tailLength += 1
            this.setPosition()
        }
    }
}
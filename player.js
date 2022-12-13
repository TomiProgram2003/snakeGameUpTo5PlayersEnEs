
class Player {
    constructor(plyersQuantity, playerName, cols, rows) {
        this.setVars(playerName, cols, rows)
        this.positiontate(plyersQuantity)
    }

    setVars = (playerName, cols, rows) => {
        this.playerName = playerName
        this.cols = cols
        this.rows = rows
        this.movX = 0
        this.movY = 0
        this.tailLength = 0
        this.tail = []
        this.block = false
        this.dead = false
    }

    positiontate = (playersQuantity) => {
        if (this.playerName == 'p1') {
            this.x = Math.floor(this.cols / 2)
            this.y = Math.floor(this.rows / 2)

        } else {
            let modificator = ['p2', 'p3', 'p4', 'p5'].indexOf(this.playerName) + 1
            this.x = Math.floor(Math.random() * ((this.cols / (playersQuantity - modificator)) - (this.cols / ((playersQuantity - modificator) * 2)) + ((playersQuantity - 1) * 2)))
            this.y = Math.floor(Math.random() * ((this.rows / (playersQuantity - modificator)) - (this.rows / ((playersQuantity - modificator) * 2)) + ((playersQuantity - 1) * 2)))
        }
    }

    setDirection = (axis, value) => {
        if (!this.block) {
            if (axis == 'x') {
                if (this.movX != 0) {
                    return

                } else {
                    this.movX = value
                    this.movY = 0
                    this.block = true
                }

            } else if (axis == 'y') {
                if (this.movY != 0) {
                    return
                } else {
                    this.movY = value
                    this.movX = 0
                    this.block = true
                }
            }
        }
    }

    update = () => {
        this.updateTail()

        this.x += this.movX
        this.y += this.movY
        this.block = false

        if (this.x < 0 || this.x == this.cols || this.y < 0 || this.y == this.rows) this.dead = true
    }

    updateTail = () => {
        if (this.tail.length < this.tailLength) {
            this.tail.push({})
        }

        for (let i = this.tail.length - 1; i >= 0; i--) {
            if (i == 0) {
                this.tail[i].x = this.x
                this.tail[i].y = this.y

            } else {
                this.tail[i].x = this.tail[i - 1].x
                this.tail[i].y = this.tail[i - 1].y
            }
        }
    }

    kill = () => {
        this.x = null
        this.y = null
        this.movX = null
        this.movY = null
        this.tailLength = null
        this.tail = null
    }
}

class MatrixController {
    constructor(cols, rows, container, measure) {
        this.cols = cols
        this.rows = rows
        this.container = container
        this.generate(measure)
    }

    generate = (measure) => {
        this.matrix = new Array(this.rows)
        for (let y = 0; y < this.rows; y++) {
            this.matrix[y] = new Array(this.cols)
            for (let x = 0; x < this.cols; x++) {
                this.matrix[y][x] = new Cell(x, y, this.container, measure)
            }
        }
    }

    restart = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.matrix[y][x].element.classList.remove('p1', 'p2', 'p3', 'p4', 'p5', 'food')
            }
        }
    }

    deletePlayerNameOfCell(player) {
        this.matrix[player.y][player.x].element.innerText = ''
    }

    drawPlayer = (player) => {
        // draw player
        this.matrix[player.y][player.x].element.classList.add(player.playerName)

        // draw player tail
        player.tail.forEach(cell => {
            this.matrix[cell.y][cell.x].element.classList.add(player.playerName)
        })

        // set player name in the cell
        this.matrix[player.y][player.x].setPlayerHead(player.playerName)
    }

    drawFood = (food) => {
        this.matrix[food.y][food.x].element.classList.add('food')
    }

    clear = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.matrix[y][x].delete(this.container)
            }
        }
    }
}
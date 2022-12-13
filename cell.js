
class Cell {
    constructor(x, y, container, measure) {
        this.x = x
        this.y = y
        this.measure = measure
        this.generate(container)
    }

    generate = (container) => {
        this.element = document.createElement('span')
        this.element.classList.add('cell')
        this.element.style.width = `${this.measure}px`
        this.element.style.height = `${this.measure}px`
        container.appendChild(this.element)
    }

    setPlayerHead = (playerName) => {
        this.element.innerText = playerName.slice(1)
    }

    delete = (container) => {
        container.removeChild(this.element)
    }
}
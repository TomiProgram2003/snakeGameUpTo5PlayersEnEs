
class Game {
    constructor(screensData, gameData) {
        this.setGameData(gameData)
        this.configureScreen(screensData)
        this.configurePlayers()
        this.generateFood()
        this.generateCollisionsControl()
        this.addKeyEvents()
        this.addScreenButtonEvents()
        this.play()
    }

    setGameData = ({players, mapSize, velocity}) => {
        this.maxPlayers = players
        this.mapSize = mapSize
        this.velocity = velocity
        this.run = true
        this.pause = false
        this.pauseEnabled = true
    }

    configureScreen = ({gameScreen, pauseScreen, gameOverScreen, menu, mainMenu}) => {
        this.cols = 41 - (10 * this.mapSize)
        this.rows = 41 - (10 * this.mapSize)

        this.gameScreen = gameScreen
        this.pauseScreen = pauseScreen
        this.gameOverScreen = gameOverScreen

        this.menu = menu
        this.mainMenu = mainMenu


        this.gameContainer = this.gameScreen.querySelector('.gameContainer')
        
        this.gameScreen.classList.add('show')

        let widthMeasure = Math.floor(this.gameContainer.clientWidth / this.cols)
        let heightMeasure = Math.floor(this.gameContainer.clientHeight / this.rows)
        let measure = widthMeasure < heightMeasure ? widthMeasure : heightMeasure

        this.gameContainer.style.width = `${(this.cols + 1) * measure}px`
        this.gameContainer.style.height = `${(this.rows + 1) * measure}px`
        this.gameContainer.style.borderWidth = `${measure / 2}px`

        this.matrixController = new MatrixController(this.cols, this.rows, this.gameContainer, measure)
    }

    configurePlayers = () => {
        this.generatePlayers()
        this.setPlayersHeads()
    }

    generatePlayers = () => {
        this.players = new Array()
        for (let player = 1; player <= this.maxPlayers; player++) {
            this.players.push(new Player(this.maxPlayers, `p${player}`, this.cols, this.rows))

        }
    }

    setPlayersHeads = () => {
        this.players.forEach(player => {
            this.matrixController.matrix[player.y][player.x].setPlayerHead(player.playerName)
        })
    }

    generateFood = () => {
        this.food = new Food(this.cols, this.rows, this.matrixController.matrix)
    }

    generateCollisionsControl = () => {
        this.collisionController = new CollisionsController()
    }

    addKeyEvents = () => {
        window.addEventListener('keydown', this.eventKeysFunction)
    }

    eventKeysFunction = (event) => {
        if (this.run) {

            // Pause event
            if (event.keyCode == 27 && this.pauseEnabled) {
                this.setPause() // pause - 'esc'
            }

            // Player 1 key events
            if (event.keyCode == 38) {
                this.players[0].setDirection('y', -1) // up - 'arrow up'
            }
            if (event.keyCode == 40) {
                this.players[0].setDirection('y', 1) // down - 'arroow down'
            }
            if (event.keyCode == 39) {
                this.players[0].setDirection('x', 1) // right - 'arrow right'
            }
            if (event.keyCode == 37) {
                this.players[0].setDirection('x', -1) // left - 'arrow left'
            }

            try {
                // Player 2 key events
                if (event.keyCode == 87) {
                    this.players[1].setDirection('y', -1) // up - 'w'
                }
                if (event.keyCode == 83) {
                    this.players[1].setDirection('y', 1) // down - 's'
                }
                if (event.keyCode == 68) {
                    this.players[1].setDirection('x', 1) // right - 'd'
                }
                if (event.keyCode == 65) {
                    this.players[1].setDirection('x', -1) // left - 'a'
                }
            } catch(error) {
                console.log('Player 2 is not defined [Game]')
            }

            try {
                // Player 3 key events
                if (event.keyCode == 84) {
                    this.players[2].setDirection('y', -1) // up - 't'
                }
                if (event.keyCode == 71) {
                    this.players[2].setDirection('y', 1) // doown - 'g'
                }
                if (event.keyCode == 72) {
                    this.players[2].setDirection('x', 1) // right - 'h'
                }
                if (event.keyCode == 70) {
                    this.players[2].setDirection('x', -1) // left - 'f'
                }
            } catch(error) {
                console.log('Player 3 is not defined [Game]')
            }

            try {
                // Player 4 key events
                if (event.keyCode == 73) {
                    this.players[3].setDirection('y', -1) // up - 'i'
                }
                if (event.keyCode == 75) {
                    this.players[3].setDirection('y', 1) // down - 'k'
                }
                if (event.keyCode == 76) {
                    this.players[3].setDirection('x', 1) // right - 'l'
                }
                if (event.keyCode == 74) {
                    this.players[3].setDirection('x', -1) // left - 'j'
                }
            } catch(error) {
                console.log('Player 4 is not defined [Game]')
            }

            try {
                // Player 5 key events
                if (event.keyCode == 104) {
                    this.players[4].setDirection('y', -1) // up - 8 (numeric keybooard)
                }
                if (event.keyCode == 98) {
                    this.players[4].setDirection('y', 1) // down - 2 (numeric keybooard)
                }
                if (event.keyCode == 102) {
                    this.players[4].setDirection('x', 1) // right - 6 (numeric keybooard)
                }
                if (event.keyCode == 100) {
                    this.players[4].setDirection('x', -1) // left - 4 (numeric keybooard)
                }
            } catch(error) {
                console.log('Player 5 is not defined [Game]')
            }
        }
    }

    addScreenButtonEvents = () => {
        // Pause screen buttons
        this.returnButtonPause = this.pauseScreen.querySelector('.returnButton')
        this.restartButtonPause = this.pauseScreen.querySelector('.restartButton')
        this.homeButtonPause = this.pauseScreen.querySelector('.homeButton')

        // Pause - return button
        this.returnButtonPause.addEventListener('click', this.setPause)

        // Pause - restart button
        this.restartButtonPause.addEventListener('click', this.restartButtonFunction)

        // Pause - home button
        this.homeButtonPause.addEventListener('click', this.homeButtonFunction)

        // Game over buttons
        this.restartButtonGameOver = this.gameOverScreen.querySelector('.restartButton')
        this.homeButtonGameOver = this.gameOverScreen.querySelector('.homeButton')

        // Game over - restart button
        this.restartButtonGameOver.addEventListener('click', this.restartButtonFunction)

        // Game over - home button
        this.homeButtonGameOver.addEventListener('click', this.homeButtonFunction)
    }

    restartButtonFunction = (event) => {
        this.run = false

        let parent = event.target.parentElement.parentElement
        let elements = [...parent.querySelectorAll('button')]

        document.body.style.animationName = 'darken'

        elements.forEach(element => element.style.pointerEvents = 'none')

        document.querySelector('.musicButton').style.pointerEvents = 'none'

        setTimeout(() => {
            parent.classList.add('hidden')
            elements.forEach(element => {
                element.classList.add('hidden')
            })
            this.restart()
            this.run = false
        }, 1500)

        setTimeout(() => {
            parent.classList.remove('show', 'hidden')
            elements.forEach(element => {
                element.classList.remove('hidden')
                element.style.pointerEvents = 'all'
            })
        }, 2000)

        setTimeout(() => {
            document.querySelector('.musicButton').style.pointerEvents = 'all'
            document.body.style.animationName = ''
            this.run = true
        }, 3000)
    }

    homeButtonFunction = (event) => {
        this.run = false
        this.pause = false
        clearInterval(this.gameLoop)

        let parent = event.target.parentElement.parentElement
        let elements = [...parent.querySelectorAll('button')].filter(element => element != event.target)

        event.target.style.animationName = 'buttonClickEffect2'

        elements.forEach(element => element.style.pointerEvents = 'none')

        document.querySelector('.musicButton').style.pointerEvents = 'none'

        setTimeout(() => {
            this.gameScreen.classList.remove('show')
            parent.classList.add('hidden')
            elements.forEach(element => {
                element.classList.add('hidden')
            })
        }, 2000)

        setTimeout(() => {
            this.menu.classList.add('show')
            this.mainMenu.classList.add('show')
        }, 2500)

        setTimeout(() => {
            this.clearGame()
            event.target.style.animationName = ''
            elements.forEach(element => {
                element.classList.remove('hidden')
                element.style.pointerEvents = 'all'
            })
            parent.classList.remove('show', 'hidden')
            document.querySelector('.musicButton').style.pointerEvents = 'all'
        }, 3000)
    }

    play = () => {
        this.gameLoop = setInterval(() => {
            this.players.forEach(player => { if (!player.dead) this.matrixController.deletePlayerNameOfCell(player) })
            this.players.forEach(player => { if (!player.dead) player.update() })
            this.collisionController.check(this.players, this.food)
            this.players.every(player => player.dead == true) ? this.end() : this.continue()
        }, 1000 / [7, 12, 20][this.velocity])
    }

    continue = () => {
        this.matrixController.restart()
        this.players.forEach(player => { if (!player.dead) this.matrixController.drawPlayer(player) })
        this.matrixController.drawFood(this.food)
    }

    end = () => {
        this.continue()
        this.run = false
        clearInterval(this.gameLoop)
        this.gameOverScreen.classList.add('show')
    }

    restart = () => {
        this.run = true
        this.pause = false
        this.configurePlayers()
        this.generateFood()
        this.play()
    }

    setPause = () => {
        this.pause = !this.pause
        this.pauseEnabled = !this.pauseEnabled
        
        let content = this.pauseScreen.querySelector('.content')
        
        
        if (this.pause) {
            clearInterval(this.gameLoop)
            this.pauseScreen.classList.add('show')
            content.style.animationName = 'fadeDown'

        } else {
            content.style.animationName = 'fadeUp'
            setTimeout(() => {
                this.pauseScreen.classList.remove('show')
                this.play()
            }, 1000)
        }

        setInterval(() => {
            this.pauseEnabled = !this.pauseEnabled
        }, 1000)
    }

    clearGame = () => {
        // clear matrix
        this.matrixController.clear()

        // clear events
        window.removeEventListener('keydown', this.eventKeysFunction)
        this.returnButtonPause.removeEventListener('click', this.setPause)
        this.restartButtonPause.removeEventListener('click', this.restartButtonFunction)
        this.homeButtonPause.removeEventListener('click', this.homeButtonFunction)
        this.restartButtonGameOver.removeEventListener('click', this.restartButtonFunction)
        this.homeButtonGameOver.removeEventListener('click', this.homeButtonFunction)
    }
}
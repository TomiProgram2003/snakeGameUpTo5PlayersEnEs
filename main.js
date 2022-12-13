(function () {

    class App {
        constructor() {
            this.getElements()
            this.setConfigData()
            this.addMenuEvents()
            this.addPlayEvents()
            this.addConfigEvents()
            this.addAudioEvent()
            this.configurateTranslation()
        }

        getElements = () => {
            // Music button and icons
            this.musicButton = document.querySelector('.musicButton')
            this.audio = document.querySelector('audio')
            this.audioActivatedIcon = document.querySelector('.activated')
            this.audioDisabledIcon = document.querySelector('.disabled')
            this.audioPlay = false

            // Menus
            this.menu = document.querySelector('.menu')
            this.mainMenu = this.menu.querySelector('.mainMenu')
            this.playMenu = this.menu.querySelector('.playMenu')
            this.configMenu = this.menu.querySelector('.configMenu')
            this.controlsMenu = this.menu.querySelector('.controlsMenu')

            // Buttons - main menu
            this.playButton = document.querySelector('.playButton')
            this.configButton = document.querySelector('.configButton')
            this.controlsButton = document.querySelector('.controlsButton')

            // Buttons - play menu
            this.playersButtons = [...this.playMenu.querySelectorAll('.playerButton')]

            // Buttons - config menu - map size
            this.mapSizeLeftButton = document.querySelector('.mapSizeLeftButton')
            this.mapSizeRightButton = document.querySelector('.mapSizeRightButton')

            // Button - config menu - change languaje
            this.changeLanguajeButton = document.querySelector('.languajeButton')

            // Sizes - config menu
            this.sizeBig = document.querySelector('.mapSize.big')
            this.sizeNormal = document.querySelector('.mapSize.normal')
            this.sizeLittle = document.querySelector('.mapSize.little')

            // Buttons - config menu - velocities
            this.velocityLeftButton = document.querySelector('.velocityLeftButton')
            this.velocityRightButton = document.querySelector('.velocityRightButton')

            // Velocities - config menu
            this.velocitieNormal = document.querySelector('.velocity.normal')
            this.velocitieFast = document.querySelector('.velocity.fast')
            this.velocitieFlash = document.querySelector('.velocity.flash')

            // Buttons back
            this.buttonsBack = [...document.querySelectorAll('.buttonBack')]

            // Game screen
            this.gameScreen = document.querySelector('.gameScreen')

            // Pause screen
            this.pauseScreen = document.querySelector('.pause')

            // Game over screen
            this.gameOverScreen = document.querySelector('.gameOver')
        }

        setConfigData = () => {
            // Map sizes
            this.mapSizes = [
                this.sizeBig,
                this.sizeNormal,
                this.sizeLittle
            ]
            this.mapSizeIndex = 0

            // Velocities
            this.velocities = [
                this.velocitieNormal,
                this.velocitieFast,
                this.velocitieFlash
            ]
            this.velocityIndex = 0

            // Players
            this.players = 0
        }

        setObjectsData = () => {
            this.screensData = {
                gameScreen: this.gameScreen,
                pauseScreen: this.pauseScreen,
                gameOverScreen: this.gameOverScreen,
                menu: this.menu,
                mainMenu: this.mainMenu
            }

            this.gameData = {
                players: this.players,
                mapSize: this.mapSizeIndex,
                velocity: this.velocityIndex
            }
        }

        addMenuEvents = () => {
            // Play button menu
            this.playButton.addEventListener('click', () => {
                let elements = [...this.mainMenu.querySelectorAll('*')].filter(element => element != this.playButton)
                
                this.playButton.style.animationName = 'buttonClickEffect'

                elements.forEach(element => element.style.pointerEvents = 'none')

                this.musicButton.style.pointerEvents = 'none'

                setTimeout(() => {
                    elements.forEach(element => element.classList.add('hidden'))
                }, 2000)

                setTimeout(() => {
                    this.playMenu.classList.add('show')
                }, 2500)

                setTimeout(() => {
                    this.mainMenu.classList.remove('show')
                    this.playButton.style.animationName = ''
                    elements.forEach(element => {
                        element.classList.remove('hidden')
                        element.style.pointerEvents = 'all'
                    })
                    this.musicButton.style.pointerEvents = 'all'
                }, 3000)
            })

            // Configuration button menu
            this.configButton.addEventListener('click', () => {
                let elements = [...this.mainMenu.querySelectorAll('*')].filter(element => element != this.configButton)

                this.configButton.style.animationName = 'buttonClickEffect'

                elements.forEach(element => element.style.pointerEvents = 'none')

                this.musicButton.style.pointerEvents = 'none'

                setTimeout(() => {
                    elements.forEach(element => element.classList.add('hidden'))
                }, 2000)

                setTimeout(() => {
                    this.configMenu.classList.add('show')
                }, 2500)

                setTimeout(() => {
                    this.mainMenu.classList.remove('show')
                    this.configButton.style.animationName = ''
                    elements.forEach(element => {
                        element.classList.remove('hidden')
                        element.style.pointerEvents = 'all'
                    })
                    this.musicButton.style.pointerEvents = 'all'
                }, 3000)
            })

            // Controls Button Menu
            this.controlsButton.addEventListener('click', () => {
                let elements = [...this.mainMenu.querySelectorAll('*')].filter(element => element != this.controlsButton)

                this.controlsButton.style.animationName = 'buttonClickEffect'

                elements.forEach(element => element.style.pointerEvents = 'none')

                this.musicButton.style.pointerEvents = 'none'

                setTimeout(() => {
                    elements.forEach(element => element.classList.add('hidden'))
                }, 2000)

                setTimeout(() => {
                    this.controlsMenu.classList.add('show')
                }, 2500)

                setTimeout(() => {
                    this.mainMenu.classList.remove('show')
                    this.controlsButton.style.animationName = ''
                    elements.forEach(element => {
                        element.classList.remove('hidden')
                        element.style.pointerEvents = 'all'
                    })
                    this.musicButton.style.pointerEvents = 'all'
                }, 3000)
            })

            // Back button
            this.buttonsBack.forEach(button => {
                button.addEventListener('click', () => {

                    let elements = [...button.parentNode.querySelectorAll('*')].filter(element => element != button)

                    elements.forEach(element => element.style.pointerEvents = 'none')

                    this.musicButton.style.pointerEvents = 'none'

                    button.style.animationName = 'buttonClickEffect'

                    setTimeout(() => {
                        elements.forEach(element => element.classList.add('hidden'))
                    }, 2000)

                    setTimeout(() => {
                        this.mainMenu.classList.add('show')
                    }, 2500)

                    setTimeout(() => {
                        this.playMenu.classList.remove('show')
                        this.configMenu.classList.remove('show')
                        this.controlsMenu.classList.remove('show')
                        button.style.animationName = ''
                        elements.forEach(element => {
                            element.classList.remove('hidden')
                            element.style.pointerEvents = 'all'
                        })
                        this.musicButton.style.pointerEvents = 'all'
                    }, 3000)
                })
            })
        }

        addPlayEvents = () => {
            this.playersButtons.forEach(button => button.addEventListener('click', () => {
                this.players = Number(button.getAttribute('players'))

                let elements = [...button.parentNode.querySelectorAll('*')].filter(element => element != button)

                elements.forEach(element => element.style.pointerEvents = 'none')

                this.musicButton.style.pointerEvents = 'none'

                button.style.animationName = 'buttonClickEffect'

                setTimeout(() => {
                    elements.forEach(element => element.classList.add('hidden'))
                }, 2000)

                setTimeout(() => {
                    this.start()
                }, 2500)

                setTimeout(() => {
                    this.playMenu.classList.remove('show')
                    this.menu.classList.remove('show')    
                    button.style.animationName = ''
                    elements.forEach(element => {
                        element.classList.remove('hidden')
                        element.style.pointerEvents = 'all'
                    })
                    this.musicButton.style.pointerEvents = 'all'
                }, 3000)
            }))
        }

        addConfigEvents = () => {
            // Languaje button
            this.changeLanguajeButton.addEventListener('click', this.changeLanguaje)

            // Map size buttons
            this.mapSizeLeftButton.addEventListener('click', () => this.changeSize(-1))
            this.mapSizeRightButton.addEventListener('click', () => this.changeSize(1))

            // Velocity buttons
            this.velocityLeftButton.addEventListener('click', () => this.changeVelocity(-1))
            this.velocityRightButton.addEventListener('click', () => this.changeVelocity(1))
        }

        addAudioEvent = () => {
            this.musicButton.addEventListener('click', () => {
                this.audioPlay = !this.audioPlay
                this.audioActivatedIcon.classList.toggle('show')
                this.audioDisabledIcon.classList.toggle('show')
                this.audioPlay ? this.audio.play() : this.audio.pause()
            })
        }

        configurateTranslation = () => {
            this.getTranslationElements()
            this.setLanguaje()
            this.translate()
        }

        setLanguaje = (languaje = 'en') => {
            if (!localStorage.getItem('languaje')) localStorage.setItem('languaje', 'en')
            this.languaje = localStorage.getItem('languaje')
        }

        getTranslationElements = () => {
            this.translationELements = [...document.querySelectorAll('*[txtID]')]
        }

        translate = () => {
            this.translationELements.forEach(element => {

                if (element.getAttribute('HTMLCode') != null) {
                    let id = Number(element.getAttribute('txtID'))
                    let HTMLCode = translator[id][this.languaje]
                    element.innerHTML = HTMLCode

                } else {
                    let id = Number(element.getAttribute('txtID'))
                    let text = translator[id][this.languaje]
                    element.textContent = text
                }
            })
        }

        changeLanguaje = () => {
            this.languaje = this.languaje == 'en' ? 'es' : 'en'
            localStorage.setItem('languaje', this.languaje)
            this.translate()
        }

        changeSize = (mov) => {
            if (this.mapSizeIndex + mov < 0) {
                this.mapSizes[this.mapSizeIndex].classList.remove('selected')
                this.mapSizeIndex = this.mapSizes.length + mov
                this.mapSizes[this.mapSizeIndex].classList.add('selected')

            } else if (this.mapSizeIndex + mov == this.mapSizes.length) {
                this.mapSizes[this.mapSizeIndex].classList.remove('selected')
                this.mapSizeIndex = 0
                this.mapSizes[this.mapSizeIndex].classList.add('selected')
            } else {
                this.mapSizes[this.mapSizeIndex].classList.remove('selected')
                this.mapSizeIndex += mov
                this.mapSizes[this.mapSizeIndex].classList.add('selected')
            }
        }

        changeVelocity = (mov) => {
            if (this.velocityIndex + mov < 0) {
                this.velocities[this.velocityIndex].classList.remove('selected')
                this.velocityIndex = this.velocities.length + mov
                this.velocities[this.velocityIndex].classList.add('selected')

            } else if (this.velocityIndex + mov == this.velocities.length) {
                this.velocities[this.velocityIndex].classList.remove('selected')
                this.velocityIndex = 0
                this.velocities[this.velocityIndex].classList.add('selected')
            } else {
                this.velocities[this.velocityIndex].classList.remove('selected')
                this.velocityIndex += mov
                this.velocities[this.velocityIndex].classList.add('selected')
            }
        }

        start = () => {
            this.setObjectsData()
            this.game = new Game(this.screensData, this.gameData)
        }
    }


    const app = new App()

}())
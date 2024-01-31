const nodeArraySquare = document.querySelectorAll("#square")
const restart = document.getElementById("restart")
const arraySquare = Array.from(nodeArraySquare)
let remainingBombs = 10
let bombs = 10
let flags = 10
const timer = document.querySelector("[texto-tempo]")
const bandeiras = document.querySelector("[texto-bandeira]")
let contador = 0
const xGame = 9
const yGame = 7
let isPlaying = false
let idIntervalo = 0
let arraydeBombas = generateBomb()
let arrayNumeros;

function generateBomb() {
    let isBomb
    const arrayBombs = arraySquare.map(e => {
        isBomb = Math.random()
        if (bombs > 0) {
            if (isBomb >= 0.8) {
                bombs--
                return e = 1
            } else {
                return e = 0
            }
        } else {
            return e = 0
        }
    })
    return arrayBombs
}

function flagsSystem() {
    arraySquare.forEach((e,id) => {
        e.addEventListener("contextmenu", ev => {
            ev.preventDefault()
            if (!e.classList.contains("revealed")) {
                if (flags > 0 && !e.classList.contains("flaged")) {
                    e.classList.add("flaged")
                    e.innerHTML = '<i class="fa-solid fa-check fa-beat"></i>'
                    bandeiras.innerHTML = `${--flags}`
                    if(arraydeBombas[id] == 1) remainingBombs--
                    if (flags == 0 && remainingBombs == 0) {
                        alert("Parabéns! Você Ganhou!")
                        restartGame()
                    } 
                    console.log(`Acertou uma bandeira na bomba! -1: ${remainingBombs} \nBandeiras restantes: ${flags}`)
                } else if (e.classList.contains("flaged")) {
                    e.classList.remove("flaged")
                    e.innerHTML = ''
                    bandeiras.innerHTML = `${++flags}`
                    remainingBombs++
                } else {
                    alert("Acabou as bandeira malucao!")
                }
            }
        })
    })
}


function game() {
    arraySquare.forEach((el, id) => {
        el.addEventListener("click", (e, idElemento) => {
            if (!el.classList.contains("flaged")) {
                if (isPlaying === false) {
                    let i = 0
                    isPlaying = true
                    console.log(isPlaying)
                    idIntervalo = setInterval(() => {
                        ++i
                        timer.innerHTML = `${i}`
                    }, 1000)
                }
                if (arraydeBombas[id] == 0) {
                    if (!el.classList.contains("revealed")) {
                        el.classList.add("revealed")
                    }
                    console.log(arraydeBombas)
                    arrayNumeros = searchForBombs(arraydeBombas)
                    console.log("array de numeros corretos: ", arrayNumeros)
                    if (id % 2 == 0) {
                        e.target.style.backgroundColor = "#d7b899"
                    } else {
                        e.target.style.backgroundColor = "#e6c29e"
                    }

                    switch (arrayNumeros[id]) {
                        case 1:
                            e.target.style.color = "#1976d2"
                            e.target.innerText = '1'
                            break
                        case 2:
                            e.target.style.color = "#388e3c"
                            e.target.innerText = '2'
                            break
                        case 3:
                            e.target.style.color = "#d32f2f"
                            e.target.innerText = '3'
                            break
                        case 4:
                            e.target.style.color = "#7b1fa2"
                            e.target.innerText = '4'
                            break
                        case 5:
                            e.target.style.color = "#000"
                            e.target.innerText = '5'
                            break
                        default:
                            console.log('zero')
                    }
                }
                else {
                    //gameover()
                }
            }
        })
    })
}

function gameover() {
    alert("GAME OVER!")
    restartGame()
}

function searchForBombs(array) {
    let bombsNear = 0
    const arrayNumeros = []
    for (let i = 0; i < array.length; i++) {
        if (i % xGame == 0 || i == 0) { // canto esquerdo da tela
            if (array[i - 9] == 1) bombsNear++
            if (array[i - 8] == 1) bombsNear++
            if (array[i + 1] == 1) bombsNear++
            if (array[i + 9] == 1) bombsNear++
            if (array[i + 10] == 1) bombsNear++
            arrayNumeros[i] = bombsNear
            bombsNear = 0
        } else if ((i + 1) % xGame == 0) { // canto direito da tela 
            if (array[i - 10] == 1) bombsNear++
            if (array[i - 9] == 1) bombsNear++
            if (array[i - 1] == 1) bombsNear++
            if (array[i + 8] == 1) bombsNear++
            if (array[i + 9] == 1) bombsNear++
            arrayNumeros[i] = bombsNear
            bombsNear = 0
        } else { // meio da tela
            if (array[i - 10] == 1) bombsNear++
            if (array[i - 9] == 1) bombsNear++
            if (array[i - 8] == 1) bombsNear++
            if (array[i - 1] == 1) bombsNear++
            if (array[i + 1] == 1) bombsNear++
            if (array[i + 8] == 1) bombsNear++
            if (array[i + 9] == 1) bombsNear++
            if (array[i + 10] == 1) bombsNear++
            arrayNumeros[i] = bombsNear
            bombsNear = 0
        }

    }
    return arrayNumeros
}

function restartGame() {
    arraySquare.forEach((e, id) => {
        if (id % 2 == 0) { // par
            e.style.backgroundColor = ""
        } else { // impar
            e.style.backgroundColor = ""
        }
        e.classList.remove("revealed")
        e.classList.remove("flaged")
        e.innerHTML = ""
    })
    clearInterval(idIntervalo)
    isPlaying = false
    bombs = 10
    flags = 10
    bandeiras.innerHTML = bombs
    timer.innerHTML = "000"
    arraydeBombas = generateBomb()
}

game()
restart.addEventListener("click", restartGame)
flagsSystem()
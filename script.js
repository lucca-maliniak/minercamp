const nodeArraySquare = document.querySelectorAll("#square")
const restart = document.getElementById("restart")
const arraySquare = Array.from(nodeArraySquare)
let bombs = 10
let flags = 10
const timer = document.querySelector("[texto-tempo]")
const bandeiras = document.querySelector("[texto-bandeira]")
let contador = 0
const xGame = 9
const yGame = 7

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
    arraySquare.forEach(e => {
        e.addEventListener("contextmenu", ev => {
            ev.preventDefault()
            if (flags > 0 && !(e.classList.contains("flaged"))) {
                e.classList.add("flaged")
                ev.target.style.backgroundColor = "#f00"
                bandeiras.innerHTML = `${--flags}`
            } else if (e.classList.contains("flaged")) {
                e.classList.remove("flaged")
                ev.target.style.backgroundColor = ""
                bandeiras.innerHTML = `${++flags}`
            } else {
                alert("Acabou as bandeira malucao!")
            }
        })
    })
}

const arraydeBombas = generateBomb()

function game() {
    arraySquare.forEach((e, id) => {
        e.addEventListener("click", e => {
            if (arraydeBombas[id] == 0) {
                const arrayNumeros = searchForBombs(id, arraydeBombas)
                e.target.style.backgroundColor = "#e5c29f"
                const numero = arrayNumeros.reduce((acc, value) => acc + value)
                let x = e.target.style.color
                console.log(numero, x)
                switch (numero) {
                    case 1:
                        x = "#1976d2"
                        break
                    case 2:
                        x = "#388e3c"
                        break
                    case 3:
                        x = "#d32f2f"
                        break
                    case 4:
                        x = "#7b1fa2"
                        break
                }
                console.log(numero, x)
            }
            else {
                console.log("bomba: \n " + arraydeBombas)
            }
        })
    })
}

function searchForBombs(idElem, array) {
    let bombsNear = 0
    const arrayNumeros = []
    for (let i = 0; i <= array.length; i++) {
        if (array[idElem - 10] == 1) bombsNear++
        if (array[idElem - 9] == 1) bombsNear++
        if (array[idElem - 8] == 1) bombsNear++
        if (array[idElem - 1] == 1) bombsNear++
        if (array[idElem + 1] == 1) bombsNear++
        if (array[idElem + 8] == 1) bombsNear++
        if (array[idElem + 9] == 1) bombsNear++
        if (array[idElem + 10] == 1) bombsNear++
        arrayNumeros[idElem] = bombsNear
        bombsNear = 0
    }
    return arrayNumeros
}

function restartGame() {
    arraySquare.forEach((e, id) => {
        if (id % 2 == 0) { // par
            e.style.backgroundColor = "#a2d149"
        } else { // impar
            e.style.backgroundColor = "#aad751"
        }
    })
    bombs = 10
    flags = 10
    bandeiras.innerHTML = bombs
    timer.innerHTML = "000"
}

flagsSystem()
game()
restart.addEventListener("click", restartGame)
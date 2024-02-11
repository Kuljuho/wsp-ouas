document.querySelector('#container').addEventListener('click', () => {
    const diceImage = document.querySelector('#dice img')
    const randomNumber = randomDiceNumber()
    diceImage.src = `./images/${randomNumber}.png`;
})

function randomDiceNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

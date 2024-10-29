console.log('connected');
let incorrectGuesses = 0;
let winCount = 0; // Move winCount to a higher scope

document.addEventListener('DOMContentLoaded', function () {
    const rawWordObjectElement = document.getElementById('1a');

    // Check if the element is found
    if (!rawWordObjectElement) {
        console.error("Element with id '1a' not found.");
        return;
    }

    // Declare the handleButtonClick function
    function handleButtonClick(letter, boxId, rawWordObjectElement) {
        var button = document.getElementById(letter);
        button.addEventListener('click', function () {
            var box = document.getElementById(boxId);

            if (box && !box.classList.contains('guessed') && incorrectGuesses < 7) {
                box.style.color = 'black';
                box.innerHTML = letter;

                // Handle guess
                theWord(letter);
                handleGuess(letter, box, rawWordObjectElement);

                box.classList.add('guessed');

            }

            if (incorrectGuesses === 7) {
                var allButtons = document.querySelectorAll('.gameButton');
                allButtons.forEach(function (button) {
                    button.disabled = true;
                });

                var link = document.getElementById('link');
                var gameOverStatement = document.getElementById('statement')
                link.style.color = 'black';
                link.innerHTML = 'Play Again?';
                gameOverStatement.style.color = 'black'
                gameOverStatement.innerHTML = `The word was <span>${currentWord}`;
                document.getElementById('linkButton').style.display = 'block';
            }
            
        });
    }

    // You can use a loop to simplify the repetitive code
    const allBoxes = document.querySelectorAll('.gameTag');
    const wordObject = document.getElementById('1a').textContent.toLowerCase();

    for (let i = 65; i <= 90; i++) {
        // Convert ASCII code to letter
        let letter = String.fromCharCode(i);
        console.log(letter);
        const boxId = (i - 65) * 100 + 100; // Calculate the corresponding box ID
        console.log(boxId);
        // Add event listener only if the game is still ongoing
        
        if (incorrectGuesses < 7) {
            handleButtonClick(letter, boxId.toString(), rawWordObjectElement);
        }
    }

    randomWord();
    drawHead();
    drawNeck();
    drawTorso();
    drawLeftArm();
    drawRightArm();
    drawLeftLeg();
    drawRightLeg();
});

let currentWord = '';

function randomWord() {
    fetch('https://random-word-api.vercel.app/api?words=10')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                currentWord = data[0].toLowerCase();
                console.log("Word =", currentWord);
                theRandomWord(currentWord, 'randomWordDisplay');
            } else {
                console.error('Failed to get a random word.');
            }
        })
        .catch(error => {
            console.error('Error fetching word:', error);
        });
}

function theRandomWord(word) {
    let displayWord = word.toLowerCase().replace(/./g, '<span class="dashes">_</span>');
    var div = document.getElementById('1a');
    div.style.color = 'black';
    div.style.fontSize = '40px'; // Set the desired font size here
    div.innerHTML = displayWord;
    console.log("displayed word:",displayWord)
}

function isCorrectGuess(letter) {
    const wordObject = document.getElementById('1a').textContent.toLowerCase();
    return wordObject.includes(letter.toLowerCase());
}

function handleGuess(letter, box, word) {
    let myWord = currentWord.toLocaleLowerCase()
    const wordObject =  document.getElementById('1a').textContent.toLowerCase(); // Clean up non-alphabetic characters
    const hr = document.createElement('hr');

    console.log('Current Word:', currentWord);
    console.log('Cleaned-up wordObject:', wordObject);
    console.log('Clicked letter:', letter.toLowerCase());

    if (myWord.includes(letter.toLowerCase())) {
        console.log('Correct Guess: ' + letter.toLowerCase());
        box.appendChild(hr);
        theWord(letter);
    } else {
        console.log('Incorrect Guess: ' + letter.toLowerCase());
        incorrectGuesses++;
        box.appendChild(hr);
        updateHangManDisplay();
    }
    console.log(hr);
}

function drawHead() {
    const canvas = document.getElementById('headCanvas');
    const ctx = canvas.getContext('2d');

    const headRadius = 50;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, headRadius, headRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
}

function drawNeck() {
    const canvas = document.getElementById('neckCanvas');
    const ctx = canvas.getContext('2d');
    const neckWidth = 20;

    ctx.beginPath();
    ctx.rect(canvas.width / 2 - neckWidth / 2, 0, neckWidth, 30);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
}

function drawTorso() {
    const canvas = document.getElementById('torsoCanvas');
    const ctx = canvas.getContext('2d');

    const torsoWidth = 60;
    const torsoHeight = 100;

    ctx.beginPath();
    ctx.rect(canvas.width / 2 - torsoWidth / 2, 30, torsoWidth, torsoHeight);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
    return drawTorso
}

function drawLeftArm() {
    const canvas = document.getElementById('leftArmCanvas');
    const ctx = canvas.getContext('2d');

    const armWidth = 20;
    const armLength = 70;
    const torsoWidth = 60;
    ctx.beginPath();
    ctx.rect(canvas.width / 2 - torsoWidth / 2 - armWidth, 30, armWidth, armLength);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
}

function drawRightArm() {
    const canvas = document.getElementById('rightArmCanvas');
    const ctx = canvas.getContext('2d');

    const armWidth = 20;
    const armLength = 70;
    const torsoWidth = 60;

    ctx.beginPath();
    ctx.rect(canvas.width / 2 + torsoWidth / 2, 30, armWidth, armLength);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
    if(bodyParts.includes(drawRightArm)){
        console.log("I got my right arm")
    }else{
        ctx.fillStyle = null
        console.log("Sorry")
    }
}

function drawLeftLeg() {
    const canvas = document.getElementById('leftLegCanvas');
    const ctx = canvas.getContext('2d');

    const legWidth = 30;
    const legLength = 100;
    const torsoWidth = 60

    ctx.beginPath();
    ctx.rect(canvas.width / 2 + torsoWidth / 2, 30, legWidth, legLength);
    ctx.fillStyle = 'lightgreen';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
    
}

function drawRightLeg() {
    const canvas = document.getElementById('rightLegCanvas');
    const ctx = canvas.getContext('2d');

    const legWidth = 30;
    const legLength = 100;
    const torsoWidth = 60;

    ctx.beginPath();
    ctx.rect(canvas.width / 2 + torsoWidth / 2, 30, legWidth, legLength);
    ctx.fillStyle = 'lightgreen'
    ctx.fill()
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
}

const bodyParts = [drawHead, drawNeck, drawTorso, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg]

function updateHangManDisplay() {
    if (incorrectGuesses === 1) {
        clearCanvas('leftLegCanvas');
    } else if(incorrectGuesses === 2) {
        clearCanvas('rightArmCanvas');
    } else if(incorrectGuesses === 3){ 
        clearCanvas('leftArmCanvas');
    } else if(incorrectGuesses === 4){
        clearCanvas('rightLegCanvas');
    } else if(incorrectGuesses === 5){
        clearCanvas('torsoCanvas');
    } else if(incorrectGuesses === 6){
        clearCanvas('neckCanvas');
    } else if(incorrectGuesses === 7){
        clearCanvas('headCanvas');
        console.log("Game Over");
    }
}

function clearCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function theWord(letter) {
    let charArray = currentWord.split("");
    let dashes = document.getElementsByClassName("dashes");
    // let endGameButton = document.getElementById('link')
    charArray.forEach((char, index) => {
        if (char.toLowerCase() === letter.toLowerCase()) {
            dashes[index].innerText = char;
           winCount+= .5
        }
    });

    console.log('WinCount:', winCount)
    console.log('charArray:', charArray)
    if (winCount === charArray.length) {
        var allButtons = document.querySelectorAll('.gameButton');
        allButtons.forEach(function (button) {
            button.disabled = true;
        });

        var link = document.getElementById('link');
        var gameOverStatement = document.getElementById('statement')
        link.style.color = 'black';
        link.innerHTML = 'Play Again?';
        gameOverStatement.style.color = 'black'
        gameOverStatement.innerHTML = `You Win The word was <span>${currentWord}`;
         document.getElementById('linkButton').style.display = 'block';
         console.log("Ay Matey")
        } else if (winCount == charArray.length) {
        console.log("It's not there ");
        document.getElementById('linkButton').style.display = 'none';

        updateHangManDisplay();
    }
}

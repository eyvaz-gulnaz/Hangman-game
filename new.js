document.addEventListener('DOMContentLoaded', function startGame() {
var container = document.querySelector(".container")

setTimeout(() => {
    container.style.display = "block"

    var guessingWord = document.querySelector(".guessing-word");
    var options = document.querySelector(".options");
    var letters = document.querySelectorAll(".letter");
    var popUp = document.querySelector('.pop-up');
    var winLose = document.querySelector('.win-lose-alert');
    var startAgainbtn = document.querySelector('.start-again');
    var hanger = document.querySelector(".img");
    var wordArray = [];
    var selectedCategory = "";

    var words = {
        "Countries": ['azerbaijan', 'switzerland', 'germany', 'italy', 'bahrain'],
        "Fruit": ['apple', 'banana', 'orange', 'peach', 'raspberry'],
        "Animals": ['cat', 'dog', 'lion', 'elephant', 'giraffe']
    };

    var hangman = ["head", "body", "leftHand", "rightHand", "leftLeg", "rightLeg"];
    var counter = 0;
    var bodyPart; 
    var guessedLetters = [];

    function chooseRandomWord(category) {
        var categoryWords = words[category];
        return categoryWords[Math.floor(Math.random() * categoryWords.length)];
    }

    options.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            selectedCategory = event.target.textContent;
            guessingWord.textContent = '';
            var randomWord = chooseRandomWord(selectedCategory);
            wordArray = randomWord.split('');
            guessedLetters = []; 

            for (var i = 0; i < wordArray.length; i++) {
                guessingWord.innerHTML += '<span class="guessLetter">_</span>';
            }
        }
    });

    letters.forEach(function (letter, i) {
        letter.addEventListener("click", function () {
            if (selectedCategory && wordArray.length > 0) {
                var guessedLetter = letter.textContent;
                if (guessedLetters.includes(guessedLetter)) {
                    return; 
                }
                var found = false;
                guessedLetters.push(guessedLetter);

                for (var j = 0; j < wordArray.length; j++) {
                    if (wordArray[j] === guessedLetter) {
                        guessingWord.querySelectorAll(".guessLetter")[j].textContent = guessedLetter;
                        found = true;
                    }
                }

                if (!found && counter < hangman.length) {
                    bodyPart = document.createElement("div");
                    bodyPart.classList.add(hangman[counter]);
                    hanger.append(bodyPart);
                    console.log(hangman[counter]);
                    counter++;
                }

                if (guessingWord.textContent === wordArray.join('')) {
                    winLose.innerText = "You win!"
                    popUp.style.visibility = "visible"
                    startAgainbtn.onclick = function () {
                        resetGame();
                    }
                } else if (counter === hangman.length) {
                    winLose.innerText = "You lost ";
                    popUp.style.visibility = "visible";
                    startAgainbtn.onclick = function () {
                        resetGame();
                    }
                }
            }
        });
    });

    function resetGame() {
        guessingWord.textContent = '';
        counter = 0;
        selectedCategory = "";
        wordArray = [];
        popUp.style.visibility = "hidden";
        guessedLetters = [];
        while (hanger.firstChild) {
            hanger.removeChild(hanger.firstChild);
        }
    }
}, 2000);
});

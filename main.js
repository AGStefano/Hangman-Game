const app = document.getElementById('app');

let userPressedLetters = '';

const correctlyGuessedLetters = [];
var errors = 0;
var lose = false;
var allBoxs = 0;

const randomWord = () => {
    const words = ["cat", "dog", "elephant", "bird", "fish", "turtle", "lion", "parrot", "hamster", "butterfly"];
    const randomIndex = Math.floor(Math.random() * 4);
    const randomWord = words[randomIndex];
    const randomChosenWordSize = randomWord.length;

    return {
        randomChosenWordSize,
        randomWord
    };
};

const createTextBox = (number) => {
    Array(number.randomChosenWordSize).fill().forEach(function (element, index) {
        const box = document.createElement('div');
        box.className = 'textBox';
        box.setAttribute('data-position', index);
        box.setAttribute('data-set', 0);

        app.appendChild(box);
    });
};

const detectPressedLetter = (event) => {
    if (lose) return;

    var pressedKey = event.key;
    userPressedLetters = pressedKey.toLowerCase();

    return pressedKey;
};

const detectWordsameLettersPressed = (random) => {
    const splitRandomWord = random.randomWord.split('');

    const hasKeyOnRandomWord = random.randomWord.includes(userPressedLetters);

    if (!hasKeyOnRandomWord) {
        errors += 1;
        if (errors == 6) {
            youLoseWin('lose');
        };
        stickFigure();
    };

    splitRandomWord.forEach((e, i) => {
        if (userPressedLetters == e) {
            allBoxs += 1

            correctlyGuessedLetters.push({
                letter: e, position: i
            });
        };
    });
    getBoxAndFill();

    if (splitRandomWord.length == allBoxs) {
        setTimeout(() => {
            youLoseWin('win');
        }, 500);
    };
};

const getBoxAndFill = () => {
    const box = document.getElementsByClassName('textBox');
    for (let i = 0; i < box.length; i++) {
        const positionBox = box[i].getAttribute('data-position');
        if (correctlyGuessedLetters) {
            for (let a = 0; a < correctlyGuessedLetters.length; a++) {
                if (positionBox == correctlyGuessedLetters[a].position) {
                    box[i].style.backgroundColor = 'green';
                    box[i].innerHTML = correctlyGuessedLetters[a].letter;
                    box[i].setAttribute('data-set', 1);
                };

            };
        };
    };

};

const stickFigure = () => {
    const figure = document.getElementsByClassName('figure');

    for (let i = 0; i < figure.length; i++) {

        const attriute = figure[i].getAttribute('data-set');
        if (attriute == 0) {
            figure[i].style.display = 'block';
            figure[i].setAttribute('data-set', 1);
            break;
        };
    };
};

const youLoseWin = (status) => {
    lose = true;
    const modal = document.getElementsByClassName('modal')[0];
    const backgroundModal = document.getElementsByClassName('backgroundModal')[0];

    const modalTxt = document.createElement("div");
    modalTxt.innerHTML = status == 'lose' ? "You Lose!" : 'You Win!';
    modalTxt.className = "modalDiv";

    backgroundModal.style.display = 'block';
    modal.style.display = 'block';

    const btn = document.createElement("button");
    btn.id = 'reload';
    btn.innerHTML = 'Reload';

    btn.addEventListener('click', (e) => {
        location.reload();
    })

    modal.appendChild(modalTxt);
    modal.appendChild(btn);
};

const main = () => {
    const random = randomWord();
    createTextBox(random);

    document.addEventListener('keypress', (event) => {
        detectPressedLetter(event);
        detectWordsameLettersPressed(random);
    });

}

main();




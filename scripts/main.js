const mainTopWordContainer = document.querySelector('.main-top-word');
const mainTopWordDefinitionItself = document.querySelector('.main-top-definition-itself');
const mainBottom = document.querySelector('.main-bottom');
const englishAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const buttonTexts = '';
let enteredInputByPlayer = [];
let chosenWordCounter = 0;
let chosenWord;
let chosenWordDefinition = [];
let randomWord;

// CREATING 26 BUTTONS FOR LETTERS

for (let i = 0; i < englishAlphabet.length; i++) {
    const mainButton = document.createElement('button');
    mainButton.type = 'button';
    mainButton.title = englishAlphabet[i];
    mainButton.classList.add('main-bottom-button');
    mainButton.textContent = englishAlphabet[i];
    mainButton.value = englishAlphabet[i].toLowerCase();
    mainButton.accessKey = englishAlphabet[i];

    mainBottom.appendChild(mainButton);

    mainButton.addEventListener('click', () => {
        enteringValue();
    });

    function enteringValue() {
        if (enteredInputByPlayer.length < chosenWord.length) {
            enteredInputByPlayer.push(mainButton.value);

            mainTopWordContainer.children[chosenWordCounter].textContent = mainButton.value; 
            chosenWordCounter++;
        };

        if (enteredInputByPlayer.length === chosenWord.length) {
            const valueEnteredByPlayer = enteredInputByPlayer.join(',').replaceAll(',', '');

            if (valueEnteredByPlayer === chosenWord) {
                // RESETTING EVERYTHING
                enteredInputByPlayer = [];
                chosenWordDefinition = [];
                chosenWordCounter = 0;
                for (const button of mainBottom.children) {
                    button.disabled = true;
                };
                for (const wordContainer of mainTopWordContainer.children) {
                    wordContainer.classList.add('main-top-word-itself-correct');
                };

                setTimeout(() => {
                    getRandomWordFromTheJsonData();
                    for (const button of mainBottom.children) {
                        button.disabled = false;
                    };
                }, 1500);
            } else {
                for (const wordContainer of mainTopWordContainer.children) {
                    wordContainer.classList.add('main-top-word-itself-incorrect');
                }; 
            };
        };
    };
};

// CREATING THE ENTER AND REMOVE BUTTONS

function removeButton() {
    const removeButton = document.createElement('button');
    removeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
            <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`
    ;
    removeButton.type = 'button';
    removeButton.title = 'Remove';
    removeButton.classList.add('main-bottom-button');
    mainBottom.appendChild(removeButton);

    // REMOVING A WORD
    removeButton.addEventListener('click', () => {
        if (enteredInputByPlayer.length > 0) {
            enteredInputByPlayer.pop();
            chosenWordCounter--;
            mainTopWordContainer.children[chosenWordCounter].textContent = '';
        };
        for (const wordContainer of mainTopWordContainer.children) {
            wordContainer.classList.remove('main-top-word-itself-incorrect');
        }; 
    });
};

removeButton();

// GET RANDOM WORD FROM THE JSON DATA

const getRandomWordFromTheJsonData = () => {
    fetch('../data/words-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            };

            return response.json();
        })
        .then(data => {
            randomWord = data.words[Math.floor(Math.random() * data.words.length)];

            retrieveTheData();
        })
        .catch(error => {
            console.log(error);
        });
};

getRandomWordFromTheJsonData();

// RETRIEVE THE DATA

async function retrieveTheData() {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);

        if (!response.ok) {
            throw new Error(response.status);
        };

        const data = await response.json();

        // CHOSEN WORD
        chosenWord = data[0].word.toLowerCase();
        // CHOSEN WORD DEFINITION/DEFINITIONS
        for (let i = 0; i < data[0].meanings[0].definitions.length; i++) {
            chosenWordDefinition.push(data[0].meanings[0].definitions[i].definition);
        };

        mainTopWordDefinitionItself.textContent = chosenWordDefinition[0];

        mainTopWordContainer.innerHTML = '';
        // ELEMENTS TO DISPLAY THE CHOSEN WORD
        for (let i = 0; i < data[0].word.length; i++) {
            const mainTopWordItself = document.createElement('div');
            mainTopWordItself.classList.add('main-top-word-itself');

            mainTopWordContainer.appendChild(mainTopWordItself);
        };
    } catch (error) {
        console.error(error);
    };
};
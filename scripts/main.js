const mainTopWordContainer = document.querySelector('.main-top-word');
const mainBottom = document.querySelector('.main-bottom');
const englishAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

console.log(mainBottom.childElementCount, englishAlphabet);

// CREATING 26 BUTTONS

for (let i = 0; i < englishAlphabet.length; i++) {
    function creatingButton() {
        const mainButton = document.createElement('button');
        mainButton.type = 'button';
        mainButton.classList.add('main-bottom-button');
        mainButton.textContent = englishAlphabet[i];

        mainBottom.appendChild(mainButton);
    };

    creatingButton();
};

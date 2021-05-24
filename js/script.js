let keypadButtons = document.querySelectorAll(".calc-keypad-button");
let isNum = /[0 - 9]/;
let comma = ","
keypadButtons.forEach(keypadButton => {
    function buttonPressed() {
        let screenText = document.querySelector(".calc-screen-text");
        let key = keypadButton.textContent;
        console.log(screenText.textContent.length)
        if (isNum.exec(key) && Number(screenText.textContent) === 0) {
            screenText.textContent = key.trim();
            console.log(screenText.textContent.length)
        }
        else if (isNum.exec(key) && Number(screenText.textContent) !== 0 && screenText.textContent.length <= 2) {
            screenText.textContent = screenText.textContent.trim() + key.trim();
            console.log(screenText.textContent.length)
        }
        else if (isNum.exec(key) && screenText.textContent.length == 3) {
            screenText.textContent = screenText.textContent.trim() + comma.trim() + key.trim();
            console.log(screenText.textContent.length)
        }
        else if (isNum.exec(key) && screenText.textContent.length <= 6 && screenText.textContent.length > 3) {
            screenText.textContent = screenText.textContent.trim() + key.trim();
            console.log(screenText.textContent.length)
        }
    }
    keypadButton.addEventListener("click", buttonPressed);
});
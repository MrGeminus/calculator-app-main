let keypadButtons = document.querySelectorAll(".calc-keypad-button");
let themes = document.querySelectorAll('input[name="themes"]');
let isPlus = /[+]/;
let isMinus = /[-]/;
let isTimes = /[x]/;
let isSlash = /[/]/;
let isDot = /[.]/;
let isEqual = /[=]/;
let isReset = /RESET/;
let isDelete = /DEL/
let fistValue = "";
let secondValue = "";
let result = "";
let mathOperatinActive = false;
let additionChosen = false;
let subtractionChosen = false;
let multiplicationChosen = false;
let divisionChosen = false;
keypadButtons.forEach(keypadButton => {
    function buttonPressed() {
        let screenText = document.querySelector(".calc-screen-text");
        let key = keypadButton.textContent;
        if (!isReset.test(key) && !isDelete.test(key) && !isPlus.test(key) && !isMinus.test(key) && !isTimes.test(key) && !isSlash.test(key) && !isEqual.test(key) && screenText.textContent == 0) {
            if (mathOperatinActive == false) {
                fistValue = key.trim();
                screenText.textContent = fistValue;
            }
            else {
                secondValue = key.trim();
                screenText.textContent = secondValue;
            }
        }
        else if (!isReset.test(key) && !isDelete.test(key) && !isPlus.test(key) && !isMinus.test(key) && !isTimes.test(key) && !isSlash.test(key) && !isEqual.test(key) && screenText.textContent != 0) {
            if (mathOperatinActive == false) {
                fistValue = fistValue + key.trim();
                screenText.textContent = fistValue;
            }
            else {
                secondValue = secondValue + key.trim();
                screenText.textContent = secondValue;
            }
        }
        else if (isReset.test(key) && !isDelete.test(key)) {
            screenText.textContent = 0;
            mathOperatinActive = false;
            additionChosen = false;
            subtractionChosen = false;
            multiplicationChosen = false;
            divisionChosen = false;
            fistValue = "";
            secondValue = "";
        }
        else if (isDelete.test(key)) {
            oldSreenValue = screenText.textContent.trim()
            let screenTextArray = [];
            for (let i = 0; i < oldSreenValue.length; i++) {
                screenTextArray.push(oldSreenValue.substr(i, 1));
            }
            screenTextArray.pop();
            let newSreenValue = "";
            for (let i = 1; i <= screenTextArray.length; i++) {
                newSreenValue += screenTextArray[i - 1];
            }
            if (newSreenValue.length != 0) {
                screenText.textContent = newSreenValue;
            }
            else {
                screenText.textContent = 0;
            }
        }
        else if (isPlus.test(key) && mathOperatinActive == false) {
            additionChosen = true;
            screenText.textContent = 0;
            mathOperatinActive = true;
        }
        else if (isMinus.test(key) && mathOperatinActive == false) {
            subtractionChosen = true;
            screenText.textContent = 0;
            mathOperatinActive = true;
        }
        else if (isTimes.test(key) && mathOperatinActive == false) {
            multiplicationChosen = true;
            screenText.textContent = 0;
            mathOperatinActive = true;
        }
        else if (isSlash.test(key) && mathOperatinActive == false) {
            divisionChosen = true;
            screenText.textContent = 0;
            mathOperatinActive = true;
        }
        else if (isEqual.test(key)) {
            if (additionChosen == true) {
                result = Number(fistValue) + Number(secondValue);
                screenText.textContent = result;
            }
            else if (subtractionChosen == true) {
                result = Number(fistValue) - Number(secondValue);
                screenText.textContent = result;
            }
            else if (multiplicationChosen == true) {
                result = Number(fistValue) * Number(secondValue);
                screenText.textContent = result;
            }
            else if (divisionChosen == true) {
                result = Number(fistValue) / Number(secondValue);
                screenText.textContent = result;
            }
        }
    }
    keypadButton.addEventListener("click", buttonPressed);
});
themes.forEach(theme => {
    function changeTheme() {
        selectedTheme = theme.getAttribute("id");
        currentTheme = document.documentElement.getAttribute("data-theme");
        if (selectedTheme != currentTheme) {
            trans();
            moveBall(selectedTheme, currentTheme);
            document.documentElement.setAttribute('data-theme', `${selectedTheme}`);
        }
    }
    theme.addEventListener("click", changeTheme);
});
let trans = () => {
    document.documentElement.classList.add('theme-transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 1000)
}
let moveBall = (selectedTheme, currentTheme) => {
    let ball = document.querySelector(".selector-ball");
    if (selectedTheme == "default" && currentTheme == "white") {
        ball.style.transform = "translateX(" + 0 + "rem)";
    }
    else if (selectedTheme == "default" && currentTheme == "purple") {
        ball.style.transform = "translateX(" + 0 + "rem)";
    }
    else if (selectedTheme == "white" && currentTheme == "default") {
        ball.style.transform = "translateX(" + 1.3 + "rem)";
    }
    else if (selectedTheme == "white" && currentTheme == "purple") {
        ball.style.transform = "translateX(" + 1.3 + "rem)";
    }
    else if (selectedTheme == "purple" && currentTheme == "default") {
        ball.style.transform = "translateX(" + 2.6 + "rem)";
    }
    else if (selectedTheme == "purple" && currentTheme == "white") {
        ball.style.transform = "translateX(" + 2.6 + "rem)";
    }
}
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
let fistValue = "0";
let secondValue = "0";
let result = "";
let mathOperatinActive = false;
let additionChosen = false;
let subtractionChosen = false;
let multiplicationChosen = false;
let divisionChosen = false;
let calculationDone = false;
let firstIsDecimalNum = false;
let secondIsDecimalNum = false;
keypadButtons.forEach(keypadButton => {
    function buttonPressed() {
        let screenText = document.querySelector(".calc-screen-text");
        let key = keypadButton.textContent;
        if (!isReset.test(key) && !isDelete.test(key) && !isDot.test(key) && !isPlus.test(key) && !isMinus.test(key) && !isTimes.test(key) && !isSlash.test(key) && !isEqual.test(key) && /^[0]/.test(screenText.textContent) && !/^[0][.]/.test(screenText.textContent)) {
            if (mathOperatinActive == false && calculationDone == false) {
                fistValue = key.trim();
                screenText.textContent = fistValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
            else {
                secondValue = key.trim();
                screenText.textContent = secondValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
        }
        else if (!isReset.test(key) && !isDelete.test(key) && !isDot.test(key) && !isPlus.test(key) && !isMinus.test(key) && !isTimes.test(key) && !isSlash.test(key) && !isEqual.test(key) && (!/^[0][0-9]/.test(screenText.textContent) || /^[0][.]/.test(screenText.textContent))) {
            if (mathOperatinActive == false && calculationDone == false) {
                fistValue = fistValue + key.trim();
                screenText.textContent = fistValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
            else {
                secondValue = secondValue + key.trim();
                screenText.textContent = secondValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
        }
        else if (isReset.test(key) && !isDelete.test(key)) {
            screenText.textContent = 0;
            mathOperatinActive = false;
            additionChosen = false;
            subtractionChosen = false;
            multiplicationChosen = false;
            divisionChosen = false;
            firstIsDecimalNum = false;
            secondIsDecimalNum = false;
            calculationDone = false;
            fistValue = "0";
            secondValue = "0";
        }
        else if (isDot.test(key) && calculationDone == false) {
            if (firstIsDecimalNum == false) {
                fistValue = fistValue + key.trim();
                screenText.textContent = fistValue;
                firstIsDecimalNum = true;
            }
            else if (secondIsDecimalNum == false && mathOperatinActive == true) {
                secondValue = secondValue + key.trim();
                screenText.textContent = secondValue;
                secondIsDecimalNum = true;
            }
        }
        else if (isDelete.test(key)) {
            oldSreenValue = screenText.textContent.trim()
            let screenTextArray = [];
            for (let i = 0; i < oldSreenValue.length; i++) {
                screenTextArray.push(oldSreenValue.substr(i, 1));
            }
            screenTextArray.pop();
            if (screenTextArray[screenTextArray.length - 1] == ".") {
                screenTextArray.pop();
            }
            let newSreenValue = "";
            for (let i = 1; i <= screenTextArray.length; i++) {
                if (screenTextArray[i - 1] != ',') {
                    newSreenValue += screenTextArray[i - 1];
                }
            }
            if (newSreenValue.length != 0) {
                screenText.textContent = newSreenValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                if (mathOperatinActive == false && calculationDone == false) {
                    fistValue = newSreenValue;
                }
                else {
                    secondValue = newSreenValue;
                }
            }
            else {
                screenText.textContent = 0;
                if (mathOperatinActive == false && calculationDone == false) {
                    fistValue = "0";
                }
                else {
                    secondValue = "0";
                }
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
                screenText.textContent = result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                fistValue = result;
                secondValue = "0"
                mathOperatinActive = false;
                additionChosen = false;
                calculationDone = true;
            }
            else if (subtractionChosen == true) {
                result = Number(fistValue) - Number(secondValue);
                screenText.textContent = result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                fistValue = result;
                secondValue = "0"
                mathOperatinActive = false;
                subtractionChosen = false;
                calculationDone = true;
            }
            else if (multiplicationChosen == true) {
                result = Number(fistValue) * Number(secondValue);
                screenText.textContent = result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                fistValue = result;
                secondValue = "0"
                mathOperatinActive = false;
                multiplicationChosen = false;
                calculationDone = true;
            }
            else if (divisionChosen == true) {
                result = Number(fistValue) / Number(secondValue);
                screenText.textContent = result.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                fistValue = result;
                secondValue = "0"
                mathOperatinActive = false;
                divisionChosen = false;
                calculationDone = true;
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
    if (screen.width > 550) {
        if (selectedTheme == "default" && currentTheme == "white") {
            ball.style.transform = "translateX(" + 0 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "default" && currentTheme == "purple") {
            ball.style.transform = "translateX(" + 0 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "white" && currentTheme == "default") {
            ball.style.transform = "translateX(" + 1.3 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "white" && currentTheme == "purple") {
            ball.style.transform = "translateX(" + 1.3 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "purple" && currentTheme == "default") {
            ball.style.transform = "translateX(" + 2.6 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "purple" && currentTheme == "white") {
            ball.style.transform = "translateX(" + 2.6 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
    }
    else {
        if (selectedTheme == "default" && currentTheme == "white") {
            ball.style.transform = "translateX(" + 0.04 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "default" && currentTheme == "purple") {
            ball.style.transform = "translateX(" + 0.04 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "white" && currentTheme == "default") {
            ball.style.transform = "translateX(" + 1.42 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "white" && currentTheme == "purple") {
            ball.style.transform = "translateX(" + 1.42 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "purple" && currentTheme == "default") {
            ball.style.transform = "translateX(" + 2.9 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
        else if (selectedTheme == "purple" && currentTheme == "white") {
            ball.style.transform = "translateX(" + 2.9 + "rem)";
            localStorage.setItem("preferredTheme", `${selectedTheme}`);
        }
    }
}
function preferredTheme() {
    let ball = document.querySelector(".selector-ball");
    if (localStorage.getItem("preferredTheme") != undefined && screen.width > 550) {
        document.documentElement.setAttribute('data-theme', `${localStorage.getItem("preferredTheme")}`);
        if (localStorage.getItem("preferredTheme") == "white") {
            ball.style.transform = "translateX(" + 1.3 + "rem)";
        }
        else if (localStorage.getItem("preferredTheme") == "purple") {
            ball.style.transform = "translateX(" + 2.6 + "rem)";
        }
        else if (localStorage.getItem("preferredTheme") == "default") {
            ball.style.transform = "translateX(" + 0 + "rem)";

        }
    }
    if (localStorage.getItem("preferredTheme") != undefined && screen.width <= 550) {
        document.documentElement.setAttribute('data-theme', `${localStorage.getItem("preferredTheme")}`);
        if (localStorage.getItem("preferredTheme") == "white") {
            ball.style.transform = "translateX(" + 1.42 + "rem)";
        }
        else if (localStorage.getItem("preferredTheme") == "purple") {
            ball.style.transform = "translateX(" + 2.9 + "rem)";
        }
        else if (localStorage.getItem("preferredTheme") == "default") {
            ball.style.transform = "translateX(" + 0.04 + "rem)";

        }
    }
}
preferredTheme();


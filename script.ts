let currentValue: any;
let displayedHistory: any;
let firstValue: string;
let secondValue: string;
let result: string
let chooseMathOperation: string;

firstValue = "";
secondValue = "";
result = "";
chooseMathOperation = "";

let themes = document.querySelectorAll(".calc-top__theme");

// Selecting all the buttons

let calculatorButtons = document.querySelectorAll(".calc-keypad-button");

// Selecting the current display value

currentValue = document.querySelector(".calc-screen__current-value");

// Selecting the display history

displayedHistory = document.querySelector(".calc-screen__history");

// Looping through all buttons and listening for a click event

calculatorButtons.forEach(calculatorButton => {
    calculatorButton.addEventListener("click", pressedButton);
});

themes.forEach(theme => {
    theme.addEventListener("click", changeTheme)
});

setTheme();

// Checking which button has been pressed

function pressedButton(event: any) {
    let buttonValue = event.target.textContent.trim()
    let displayValue = removePreviousFormatting(currentValue.textContent.trim());

    /* If the pressed button value is 0-9 and the displayed value is
    0, then set the displayed value to button value */

    if (/^[0-9]$/.test(buttonValue) && /^[0]$/.test(displayValue)) {
        currentValue.textContent = buttonValue;
    }

    /* If the pressed button value is 0-9 and the displayed value 
    starts with 1-9 or 0-9 followed by a . concat that value to the
    displayed value*/

    if (/^[0-9]$/.test(buttonValue) && /^[1-9]|[0-9][.]/.test(displayValue) && displayValue.length < 15) {
        currentValue.textContent = formatString(displayValue + buttonValue);
    }

    /* If the pressed button value is DEL, then convert the displayed 
    value to an array, remove the last item, convert the the array back
    to a string and format and output the new string*/

    if (/^DEL$/.test(buttonValue)) {
        let numbers = displayValue.split("")
        numbers.pop();
        displayValue = numbers.join().replace(/,/g, "")
        currentValue.textContent = formatString(displayValue)
    }

    /* If the pressed button value is RESET, then reset the displayed value
    to 0 */

    if (/^RESET$/.test(buttonValue)) {
        currentValue.textContent = "0"
        displayedHistory.textContent = ""
    }

    /* If the pressed button value is ., then reset the displayed value
    to 0 */

    if (/^[.]$/.test(buttonValue) && !(/[.]/.test(displayValue))) {
        currentValue.textContent = formatString(displayValue + buttonValue)
    }

    /* If the pressed buttom value is +, then update the chooseMathOperation,
    set the firstValue to the displayed value and reset the displayed value 
    to 0 */

    if (/^[+]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        displayedHistory.textContent = displayValue + buttonValue;
        currentValue.textContent = "0";
    }

    /* If the pressed buttom value is - */

    if (/^[-]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        displayedHistory.textContent = displayValue + buttonValue;
        currentValue.textContent = "0";
    }

    /* If the pressed buttom value is x */

    if (/^[x]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        displayedHistory.textContent = displayValue + buttonValue;
        currentValue.textContent = "0";
    }

    /* If the pressed buttom value is /, then set */

    if (/^[/]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        displayedHistory.textContent = displayValue + buttonValue;
        currentValue.textContent = "0";
    }

    /* If the pressed buttom value is =, then perform the previously
    chosen math operation and display the result */

    if (/^[=]$/.test(buttonValue) && !(chooseMathOperation === "")) {
        secondValue = displayValue;
        if (chooseMathOperation === "+") {
            result = performAddition(Number(firstValue), Number(secondValue));
        }
        if (chooseMathOperation === "-") {
            result = performSubtraction(Number(firstValue), Number(secondValue));
        }
        if (chooseMathOperation === "*") {
            result = performMultiplication(Number(firstValue), Number(secondValue));
        }
        if (chooseMathOperation === "/") {
            result = performDivision(Number(firstValue), Number(secondValue));
        }
        currentValue.textContent = formatString(result);
        chooseMathOperation = "";

    }
}

// A function that performs addition and returns the result

function performAddition(firstValue: number, secondValue: number): string {
    return (firstValue + secondValue).toString();
}

// A function that performs subtraction and returns the result

function performSubtraction(firstValue: number, secondValue: number): string {
    return (firstValue - secondValue).toString();
}

// A function that performs multiplication and returns the result

function performMultiplication(firstValue: number, secondValue: number): string {
    return (firstValue * secondValue).toString();
}

// A function that performs division and returns the result

function performDivision(firstValue: number, secondValue: number): string {
    return (firstValue / secondValue).toString();
}

// A function that removes the previous formatting

function removePreviousFormatting(value: string): string {
    return value.replace(/[,]/g, "")
}

// A function that returns a formatted string

function formatString(value: string): string {
    return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// A function that changes the theme

function changeTheme(event: any) {
    let selectedTheme = event.target.id;
    localStorage.theme = selectedTheme;
    setTheme();
}

function setTheme() {
    if (localStorage.theme == undefined || localStorage.theme == null) {
        localStorage.theme = 'blue';
    }
    document.documentElement.setAttribute('data-theme', `${localStorage.theme}`);
    applyTransition();
    moveToggler(localStorage.theme)
}

// A function that moves the theme toggler

function moveToggler(currentTheme: any) {
    let slider: any
    slider = document.querySelector(".calc-top__slider");
    if (currentTheme === 'gray') {
        slider.style.transform = "translateX(" + 1.5 + "rem)";
    }
    if (currentTheme === 'violet') {
        slider.style.transform = "translateX(" + 3 + "rem)";
    }
    if (currentTheme === 'blue') {
        slider.style.transform = "translateX(" + 0 + "rem)";
    }
}

// 

function applyTransition() {
    document.documentElement.classList.add('theme-transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 300)
}
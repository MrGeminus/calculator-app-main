// Defining variables

let currentValue: any;
let displayHistory: any;
let firstValue: string;
let secondValue: string;
let result: string
let chooseMathOperation: string;

firstValue = "";
secondValue = "";
result = "";
chooseMathOperation = "";

// Selecting all checkboxes with the class name calc-top__theme

let themes = document.querySelectorAll(".calc-top__theme");

// Selecting all the keypad buttons with the class name calc-keypad-button

let calculatorButtons = document.querySelectorAll(".calc-keypad-button");

// Selecting the current display value

currentValue = document.querySelector(".calc-screen__current-value");

// Selecting the display history

displayHistory = document.querySelector(".calc-screen__history");

// Looping through all keypad buttons and listening for a click event

calculatorButtons.forEach(calculatorButton => {
    calculatorButton.addEventListener("click", pressedButton);
});

// Looping through all checkboxes and listening for a click event

themes.forEach(theme => {
    theme.addEventListener("click", changeTheme)
});

// When the document loads call the function that set the theme

setTheme();

// Checking which button has been pressed and acting appropriately

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
        if (numbers.length == 0) {
            numbers.push('0')
        }
        displayValue = numbers.join().replace(/,/g, "")
        currentValue.textContent = formatString(displayValue)
    }

    /* If the pressed button value is RESET, then reset the displayed value
    to 0 */

    if (/^RESET$/.test(buttonValue)) {
        currentValue.textContent = "0"
        displayHistory.textContent = ""
        chooseMathOperation = ""
        firstValue = ""
        secondValue = ""
        result = ""
    }

    // If the pressed button value is .

    if (/^[.]$/.test(buttonValue) && !(/[.]/.test(displayValue))) {
        currentValue.textContent = formatString(displayValue + buttonValue)
    }

    // If the pressed buttom value is +

    if (/^[+]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        displayHistory.textContent = displayValue + buttonValue;
        currentValue.textContent = "0";
    }

    // If the pressed buttom value is -

    if (/^[-]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        displayHistory.textContent = displayValue + buttonValue;
        currentValue.textContent = "0";
    }

    // If the pressed buttom value is x

    if (/^[x]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        displayHistory.textContent = displayValue + buttonValue;
        currentValue.textContent = "0";
    }

    // If the pressed buttom value is /

    if (/^[/]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        displayHistory.textContent = displayValue + buttonValue;
        currentValue.textContent = "0";
    }

    /* If the pressed buttom value is =, then perform the previously
    chosen math operation, display the result and reset the math 
    operation variable to empty string */

    if (/^[=]$/.test(buttonValue) && !(chooseMathOperation === "")) {
        secondValue = displayValue;
        displayHistory.textContent = displayHistory.textContent + secondValue + buttonValue;
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

// A function that returns a string without thousand separators

function removePreviousFormatting(value: string): string {
    return value.replace(/[,]/g, "")
}

// A function that returns a string with the thousand separators

function formatString(value: string): string {
    return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// A function that changes the theme

function changeTheme(event: any) {
    let selectedTheme = event.target.id;
    localStorage.theme = selectedTheme;
    setTheme();
}

// A function that actually sets the theme

function setTheme() {
    let radioBtn: any
    if (localStorage.theme == undefined || localStorage.theme == null) {
        localStorage.theme = 'blue';
    }
    document.documentElement.setAttribute('data-theme', `${localStorage.theme}`);
    radioBtn = document.getElementById(`${localStorage.theme}`)
    radioBtn.checked = true;
    applyTransition();
    moveSlider(localStorage.theme)
}

// A function that changes the position of the slider on the track

function moveSlider(currentTheme: any) {
    let slider: any
    slider = document.querySelector(".calc-top__slider");
    if (currentTheme === 'gray') {
        slider.style.transform = "translateX(" + 1.45 + "rem)";
    }
    if (currentTheme === 'violet') {
        slider.style.transform = "translateX(" + 2.9 + "rem)";
    }
    if (currentTheme === 'blue') {
        slider.style.transform = "translateX(" + 0 + "rem)";
    }
}

/* A function that applies the transition class for 300ms to the 
document for a smooth theme switch */

function applyTransition() {
    document.documentElement.classList.add('theme-transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 300);
}
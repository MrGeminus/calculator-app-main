var display;
var firstValue;
var secondValue;
var result;
var chooseMathOperation;
firstValue = "";
secondValue = "";
result = "";
chooseMathOperation = "";
// Selecting all the buttons
var calculatorButtons = document.querySelectorAll(".calc-keypad-button");
// Selecting the display value
display = document.querySelector(".calc-screen__displayed-value");
// Looping through all buttons and listening for a click event
calculatorButtons.forEach(function (calculatorButton) {
    calculatorButton.addEventListener("click", pressedButton);
});
// Checking which button has been pressed
function pressedButton(event) {
    var buttonValue = event.target.textContent.trim();
    var displayValue = removePreviousFormatting(display.textContent.trim());
    /* If the pressed button value is 0-9 and the displayed value is
    0, then set the displayed value to button value */
    if (/^[0-9]$/.test(buttonValue) && /^[0]$/.test(displayValue)) {
        display.textContent = buttonValue;
    }
    /* If the pressed button value is 0-9 and the displayed value
    starts with 1-9 or 0-9 followed by a . concat that value to the
    displayed value*/
    if (/^[0-9]$/.test(buttonValue) && /^[1-9]|[0-9][.]/.test(displayValue) && displayValue.length < 15) {
        display.textContent = formatString(displayValue + buttonValue);
    }
    /* If the pressed button value is DEL, then convert the displayed
    value to an array, remove the last item, convert the the array back
    to a string and format and output the new string*/
    if (/^DEL$/.test(buttonValue)) {
        var numbers = displayValue.split("");
        numbers.pop();
        displayValue = numbers.join().replace(/,/g, "");
        display.textContent = formatString(displayValue);
    }
    /* If the pressed button value is RESET, then reset the displayed value
    to 0 */
    if (/^RESET$/.test(buttonValue)) {
        display.textContent = "0";
    }
    /* If the pressed button value is ., then reset the displayed value
    to 0 */
    if (/^[.]$/.test(buttonValue) && !(/[.]/.test(displayValue))) {
        display.textContent = formatString(displayValue + buttonValue);
    }
    /* If the pressed buttom value is +, then update the chooseMathOperation,
    set the firstValue to the displayed value and reset the displayed value
    to 0 */
    if (/^[+]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        display.textContent = "0";
    }
    /* If the pressed buttom value is - */
    if (/^[-]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        display.textContent = "0";
    }
    /* If the pressed buttom value is x */
    if (/^[x]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        display.textContent = "0";
    }
    /* If the pressed buttom value is /, then set */
    if (/^[/]$/.test(buttonValue) && chooseMathOperation === "") {
        chooseMathOperation = buttonValue;
        firstValue = displayValue;
        display.textContent = "0";
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
        display.textContent = formatString(result);
        chooseMathOperation = "";
    }
}
// A function that performs addition and returns the result
function performAddition(firstValue, secondValue) {
    return (firstValue + secondValue).toString();
}
// A function that performs subtraction and returns the result
function performSubtraction(firstValue, secondValue) {
    return (firstValue - secondValue).toString();
}
// A function that performs multiplication and returns the result
function performMultiplication(firstValue, secondValue) {
    return (firstValue * secondValue).toString();
}
// A function that performs division and returns the result
function performDivision(firstValue, secondValue) {
    return (firstValue / secondValue).toString();
}
// A function that removes the previous formatting
function removePreviousFormatting(value) {
    return value.replace(/[,]/g, "");
}
// A function that returns a formatted string
function formatString(value) {
    return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
// A function that changes the theme
function changeTheme() {
}
function setTheme() {
    document.documentElement.setAttribute('data-theme', "" + localStorage.theme);
}
// A function that moves the theme toggler
function moveToggler() {
}
// 

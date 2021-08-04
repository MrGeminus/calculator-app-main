var display;
var firstValue;
var secondValue;
var chooseOperation;
chooseOperation = "";
// Selecting all the buttons
var calculatorButtons = document.querySelectorAll(".keypad-button");
// Selecting the display value
display = document.querySelector(".calc-screen-text");
// Looping through all buttons and listening for a click event
calculatorButtons.forEach(function (calculatorButton) {
    calculatorButton.addEventListener("click", pressedButton);
});
// Checking which button has been pressed
function pressedButton(event) {
    var buttonValue = event.target.textContent.trim();
    var displayValue = display.textContent.trim();
    /* If the button value is 0-9 and the displayed
    value is 0, then set the displayed value to button value */
    if (/^[0-9]$/.test(buttonValue) && /^[0]$/.test(displayValue)) {
        display.textContent = buttonValue;
    }
    /* If the button value is 0-9 and the displayed
    value starts with 1-9 */
    if (/^[0-9]$/.test(buttonValue) && /^[1-9]/.test(displayValue) && displayValue.length < 15) {
        display.textContent = displayValue + buttonValue;
    }
    /* If the button value is DEL, then convert the displayed value
    to an array, remove the last item, and convert the the array back
    to a string */
    if (/^DEL$/.test(buttonValue)) {
        var numbers = displayValue.split("");
        numbers.pop();
        display.textContent = numbers.join().replace(/,/g, "");
    }
    /* If the button value is RESET, then reset the displayed value
    to 0 */
    if (/^RESET$/.test(buttonValue)) {
        display.textContent = "0";
    }
    /*  */
    if (/^[+]$/.test(buttonValue) && chooseOperation === "") {
        chooseOperation = "+";
        firstValue = displayValue;
        display.textContent = "0";
    }
    /*  */
    if (/^[-]$/.test(buttonValue) && chooseOperation === "") {
        chooseOperation = "-";
        firstValue = displayValue;
        display.textContent = "0";
    }
    /*  */
    if (/^[x]$/.test(buttonValue) && chooseOperation === "") {
        chooseOperation = "x";
        firstValue = displayValue;
        display.textContent = "0";
    }
    /*  */
    if (/^[/]$/.test(buttonValue) && chooseOperation === "") {
        chooseOperation = "/";
        firstValue = displayValue;
        display.textContent = "0";
    }
    /*  */
    if (/^[=]$/.test(buttonValue)) {
        var result = void 0;
        result = "";
        if (chooseOperation === "+") {
            result = performAddition(parseInt(firstValue), parseInt(secondValue));
        }
        if (chooseOperation === "-") {
            result = performSubtraction(parseInt(firstValue), parseInt(secondValue));
        }
        if (chooseOperation === "*") {
            result = performMultiplication(parseInt(firstValue), parseInt(secondValue));
        }
        if (chooseOperation === "/") {
            result = performDivision(parseInt(firstValue), parseInt(secondValue));
        }
        firstValue = result;
        chooseOperation = "";
    }
}
// function that addition
function performAddition(firstValue, secondValue) {
    return (firstValue + secondValue).toString();
}
// function that addition
function performSubtraction(firstValue, secondValue) {
    return (firstValue - secondValue).toString();
}
// function that addition
function performMultiplication(firstValue, secondValue) {
    return (firstValue * secondValue).toString();
}
// function that addition
function performDivision(firstValue, secondValue) {
    return (firstValue / secondValue).toString();
}

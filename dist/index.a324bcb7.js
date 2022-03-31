const rootElement = document.querySelector("html");
const themeRadioButtons = document.querySelectorAll("[data-theme-option]");
const keypadButtons = document.querySelectorAll("[data-button-key]");
const currentOperandElement = document.querySelector("[data-current-operand]");
const previousOperandElement = document.querySelector("[data-previous-operand]");
let currentOperand = "0";
let previousOperand = "";
let operation = null;
const formatDisplayValue = (value)=>{
    return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
const setDisplayValues = (key)=>{
    if (currentOperand.includes(".") && key === ".") return;
    if (currentOperand === "0" && key !== ".") currentOperand = key;
    else currentOperand += key;
};
const performCalculation = ()=>{
    let result;
    const privious = Number(previousOperand);
    const current = Number(currentOperand);
    if (isNaN(privious) || isNaN(current)) return;
    switch(operation){
        case "+":
            result = privious + current;
            break;
        case "-":
            result = privious - current;
            break;
        case "*":
            result = privious * current;
            break;
        case "/":
            result = privious / current;
            break;
        default:
            return;
    }
    currentOperand = result.toString();
    operation = null;
    previousOperand = "";
};
const setOperation = (key)=>{
    if (currentOperand === "0") return;
    if (previousOperand !== "") performCalculation();
    operation = key;
    previousOperand = currentOperand;
    currentOperand = "0";
};
const deleteLastCharacter = ()=>{
    let undoValue = currentOperand;
    if (undoValue.length === 1) undoValue = "0";
    else undoValue = undoValue.slice(0, -1);
    currentOperand = undoValue;
};
const clearDisplay = ()=>{
    currentOperand = "0";
    previousOperand = "";
    operation = null;
};
const updateDisplay = ()=>{
    currentOperandElement.textContent = formatDisplayValue(currentOperand);
    if (operation !== null) previousOperandElement.textContent = `${formatDisplayValue(previousOperand)} ${operation}`;
    else previousOperandElement.textContent = "";
};
const handleSelectedKey = (key)=>{
    if (/[+]|[-]|[/]|[*]/.test(key)) {
        setOperation(key);
        updateDisplay();
    }
    if (/[0-9]|[.]/.test(key)) {
        setDisplayValues(key);
        updateDisplay();
    }
    if (/[=]/.test(key) || key === 'Enter') {
        performCalculation();
        updateDisplay();
    }
    if (key === 'Backspace') {
        deleteLastCharacter();
        updateDisplay();
    }
    if (key === 'Delete') {
        clearDisplay();
        updateDisplay();
    }
};
keypadButtons.forEach((keypadButton)=>{
    keypadButton.addEventListener("click", (event)=>{
        const selectedButton = event.target;
        const buttonKey = selectedButton.dataset.buttonKey;
        handleSelectedKey(buttonKey);
    });
});
document.addEventListener("keydown", (event)=>{
    const selectedKey = event.key;
    handleSelectedKey(selectedKey);
});
const applyTheme = (selectedTheme)=>{
    // set theme of the page
    rootElement.dataset.theme = selectedTheme;
    // save theme to local storage
    localStorage.setItem("theme", selectedTheme);
};
const moveSlider = (selectedTheme, currentTheme)=>{};
themeRadioButtons.forEach((themeRadioButton)=>{
    themeRadioButton.addEventListener("click", (event)=>{
        const selectedRadioButton = event.target;
        const selecetedTheme = selectedRadioButton.dataset.themeOption;
        const currentTheme = rootElement.dataset.theme;
        moveSlider(selecetedTheme, currentTheme);
        applyTheme(selecetedTheme);
    });
});
const setInitialTheme = ()=>{
    let theme;
    let storedTheme = localStorage.getItem("theme");
    // check if theme is stored in local storage
    if (storedTheme !== null) theme = storedTheme;
    else theme = "blue";
    applyTheme(theme);
};
setInitialTheme();

//# sourceMappingURL=index.a324bcb7.js.map

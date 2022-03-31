const rootElement: HTMLElement = document.querySelector("html");
const themeRadioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll("[data-theme-option]");
const keypadButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("[data-button-key]");
const currentOperandElement: HTMLParagraphElement = document.querySelector("[data-current-operand]");
const previousOperandElement: HTMLParagraphElement = document.querySelector("[data-previous-operand]");

let currentOperand: string = "0";
let previousOperand: string = "";
let operation: string | null = null;

const formatDisplayValue = (value: string): string => {
    return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

const setDisplayValues = (key: string): void => {
    if (currentOperand.includes(".") && key === ".") return
    if (currentOperand === "0" && key !== ".") currentOperand = key;
    else currentOperand += key;
}

const performCalculation = (): void => {
    let result: number
    const privious: number = Number(previousOperand)
    const current: number = Number(currentOperand);
    if (isNaN(privious) || isNaN(current)) return
    switch (operation) {
        case ("+"):
            result = (privious + current)
            break;
        case ("-"):
            result = (privious - current)
            break;
        case ("*"):
            result = (privious * current)
            break;
        case ("/"):
            result = (privious / current)
            break;
        default:
            return
    }
    currentOperand = result.toString()
    operation = null
    previousOperand = ""
}

const setOperation = (key: string): void => {
    if (currentOperand === "0") return
    if (previousOperand !== "") {
        performCalculation()
    }
    operation = key;
    previousOperand = currentOperand;
    currentOperand = "0";
}

const deleteLastCharacter = (): void => {
    let undoValue: string = currentOperand;
    if (undoValue.length === 1) undoValue = "0"
    else undoValue = undoValue.slice(0, -1);
    currentOperand = undoValue;
}

const clearDisplay = (): void => {
    currentOperand = "0";
    previousOperand = "";
    operation = null;
}

const updateDisplay = (): void => {
    currentOperandElement.textContent = formatDisplayValue(currentOperand);
    if (operation !== null) previousOperandElement.textContent = `${formatDisplayValue(previousOperand)} ${operation}`;
    else previousOperandElement.textContent = "";
}

const handleSelectedKey = (key: string): void => {
    if ((/[+]|[-]|[/]|[*]/).test(key)) {
        setOperation(key);
        updateDisplay();
    }
    if ((/[0-9]|[.]/).test(key)) {
        setDisplayValues(key);
        updateDisplay();
    }
    if ((/[=]/).test(key) || key === 'Enter') {
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
}

keypadButtons.forEach((keypadButton: HTMLButtonElement) => {
    keypadButton.addEventListener("click", (event: Event) => {
        const selectedButton = event.target as HTMLButtonElement
        const buttonKey: string = selectedButton.dataset.buttonKey;
        handleSelectedKey(buttonKey)
    })
})

document.addEventListener("keydown", (event: KeyboardEvent): void => {
    const selectedKey: string = event.key;
    handleSelectedKey(selectedKey)
})

const applyTheme = (selectedTheme: string): void => {
    // set theme of the page
    rootElement.dataset.theme = selectedTheme
    // save theme to local storage
    localStorage.setItem("theme", selectedTheme)
}

const moveSlider = (selectedTheme, currentTheme): void => {

}

themeRadioButtons.forEach((themeRadioButton: HTMLInputElement) => {
    themeRadioButton.addEventListener("click", (event: Event) => {
        const selectedRadioButton = event.target as HTMLInputElement
        const selecetedTheme: string = selectedRadioButton.dataset.themeOption;
        const currentTheme: string = rootElement.dataset.theme;
        moveSlider(selecetedTheme, currentTheme)
        applyTheme(selecetedTheme);
    })
})

const setInitialTheme = (): void => {
    let theme: string
    let storedTheme: string | null = localStorage.getItem("theme")
    // check if theme is stored in local storage
    if (storedTheme !== null) {
        theme = storedTheme;
    }
    // if not, use default blue theme
    else {
        theme = "blue";
    }
    applyTheme(theme);
}

setInitialTheme()
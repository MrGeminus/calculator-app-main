let keypadButtons = document.querySelectorAll(".calc-keypad-button");
let themes = document.querySelectorAll('input[name="themes"]');
let isNum = /[0 - 9]/;
let isReset = 'RESET';
let isDelete = 'DEL'
keypadButtons.forEach(keypadButton => {
    function buttonPressed() {
        let screenText = document.querySelector(".calc-screen-text");
        let key = keypadButton.textContent;
        if (isNum.test(key) && Number(screenText.textContent) === 0) {
            screenText.textContent = key.trim();
        }
        else if (isNum.test(key) && Number(screenText.textContent) !== 0) {
            let newNum = screenText.textContent.trim() + key.trim();
            screenText.textContent = addComma(newNum);
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
let array = [1, 5, 5, 5];
for (let i = 1; i < array.length; i += 3) {
    if (array[i] != ",") {
        array.push(",")
        console.log(array)
    }
}
[1, ",", 5, 5, 5]
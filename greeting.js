const form = document.querySelector(".js_form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js_greetings");

const USER_NAME = "currentUser",
    SHOWING_CN ="showing";

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    localStorage.setItem("currentUser", currentValue);
    paintGreeting(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello, ${text}!`;
}
    
function loadName() {
    const currentUser = localStorage.getItem(USER_NAME);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}


function init() {
    loadName();
}

init();
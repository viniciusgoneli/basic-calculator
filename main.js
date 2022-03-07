const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('[data-number]');

numberButtons.forEach(btn => btn.onclick = _ => appendNumber(btn.textContent));

function appendNumber(number){
    display.textContent += number;
}
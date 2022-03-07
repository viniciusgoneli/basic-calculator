const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const dotButton = document.querySelector('[data-dot]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

numberButtons.forEach(btn => btn.onclick = _ => appendNumber(btn.textContent));
operatorButtons.forEach(btn => btn.onclick = _ => appendOperator(btn.textContent));
dotButton.onclick = _ => appendDot(dotButton.textContent);
clearButton.onclick = clearDisplay;
deleteButton.onclick = deleteLastChar;
equalsButton.onclick = _ => display.textContent = calculate();

function calculate(){
    try{
        const formatedExpression = display.textContent.replaceAll('÷', '/');
        return eval(formatedExpression);
    }
    catch(e){
        return "Erro de formatação!";
    }
}

function appendNumber(number){
    display.textContent += number;
}

function appendOperator(operator){
    if(operator === '*' || operator === '÷' || operator === '+'){
        if(display.textContent === '' || isLastCharAnOperator() && display.textContent.length === 1) return
    }
    if(isLastCharAnOperator()) deleteLastChar();
    
    display.textContent += operator;
}

function isLastCharAnOperator(){
    const lastChar = display.textContent.charAt(display.textContent.length - 1);
    return lastChar === '+' || lastChar === '-' || lastChar === '÷' || lastChar === '*';
}

function deleteLastChar(){
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
}

function appendDot(dot){
    if(isDotAllowed(dot)) display.textContent += dot;
}

function isDotAllowed(dot){
    const operands = display.textContent.split(/\+|\-|\÷|\*/);
    const lastOperand = operands[operands.length - 1];
    if(lastOperand.includes(dot)) return false;
    return true;
}

function clearDisplay(){
    display.textContent = '';
}
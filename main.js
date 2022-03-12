const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const dotButton = document.querySelector('[data-dot]');
const resetButton = document.querySelector('[data-reset]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

numberButtons.forEach(btn => btn.onclick = _ => appendNumber(btn.textContent));
operatorButtons.forEach(btn => btn.onclick = _ => appendOperator(btn.textContent));
dotButton.onclick = _ => appendDot(dotButton.textContent);
resetButton.onclick = resetDisplay;
deleteButton.onclick = deleteLastChar;
equalsButton.onclick = _ => display.textContent = calculate();

const operatorsRegex = /\+|\-|\÷|\*|\//g

function calculate(){
    try{
        const formatedExpression = formatExpressionToCalculate();
        return eval(formatedExpression);
    }
    catch(e){
        return display.textContent;
    }
}

function appendNumber(number){
    if(display.textContent === '0') deleteLastChar();
    display.textContent += number;
}

function appendOperator(operator){
    if(operator === '*' || operator === '÷' || operator === '+'){
        if(display.textContent === '0') return
    }
    const lastChar = display.textContent.charAt(display.textContent.length - 1);

    if(operator === lastChar) return
    if(lastChar === '+' && operator === '-' || lastChar === '-' && operator === '+'
    || lastChar === '÷' && operator === '*' || lastChar === '*' && operator === '÷') deleteLastChar();
    if(display.textContent === '0') deleteLastChar();

    display.textContent += operator;
}

function deleteLastChar(){
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
}

function appendDot(dot){
    if(isDotAllowed(dot)) display.textContent += dot;
}

function isDotAllowed(dot){
    const operands = getOperands();
    const lastOperand = operands[operands.length - 1];
    if(lastOperand.includes(dot)) return false;
    return true;
}

function resetDisplay(){
    display.textContent = '0';
}

function formatExpressionToCalculate(){
    let newExpression = display.textContent;

    newExpression = removeLeadingZeros();
    newExpression = newExpression.replaceAll('÷', '/');

    return newExpression;
}

function removeLeadingZeros(){
    const operands = getOperands();
    const operators = display.textContent.match(operatorsRegex);

    const formatedOperands = operands.map(operand => {
        for(let i=0; i < operand.length; i++){
            if(operand[i] != '0') return operand.slice(i);
        }
        return '';
    })

    const formatedExpression = joinOperandsWithOperators(formatedOperands, operators)
    return formatedExpression;
}

function joinOperandsWithOperators(operands, operators){
    let formatedExpression = '';
    operands.forEach((operand, index) => {
        formatedExpression += operators[index] === undefined ? operand : operand + operators[index];
    })
    return formatedExpression;
}

const getOperands = _ => display.textContent.split(operatorsRegex);
/* CALCULATOR.js */


/* CONSTANTS AND VARIABLES */

// Operators allowed
const calculatorOperators = ['+', '-', '*', '/', '%'];

// DOM element references
const numberButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.non-numerical.operators');
const equalToButton = document.querySelector('.non-numerical.equal-to');
const resetButton = document.querySelector('.non-numerical.reset');
const decimalDotButton = document.querySelector('.non-numerical.decimal-point');
const backSpaceButton = document.querySelector('.non-numerical.backspace');
const firstDisplay = document.querySelector('.display.display-1');


// Variables to store and track operands before and after an operator
let firstOperand = '0';
let secondOperand = '';
let operandIndex = 0;

// Variabe to fetch the current operator choice of user
let currentOperator = '';

// Flag to determine if next input after result should reset the display.
let resetByDefault = false;

/* FUNCTIONS */

// Arithematic functions
function add(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
    return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
    if (secondOperand === 0) {
        alert("Division by zero is undefined");
        return;
    }
    return firstOperand / secondOperand;
}

function remainder(firstOperand, secondOperand) {
    return firstOperand % secondOperand;
}

// Function that checks if last input is an operator
function checkOperatorValidity(operator, lastValue) {

    // Convert traditional symbol of multiplication and division to its mathematical symbol
    // for operational convenience
    if (lastValue === '×') lastValue = '*';
    else if (lastValue === '÷') lastValue = '/';

    // Disallow user from entering more than one operator consecutively
    if (calculatorOperators.includes(operator) && 
        calculatorOperators.includes(lastValue))
    {            
        return false;
    }

    // Disallow user from entering operator if the operand is incomplete after decimal dot 
    if (lastValue === '.') return;

    return true;
}

// Function that fetch operands and operator to operate
function operate(firstOperand, secondOperand, currentOperator) {
    switch(currentOperator) {

        case '+': return add(firstOperand, secondOperand);
        case '-': return subtract(firstOperand, secondOperand);
        case '×': return multiply(firstOperand, secondOperand);
        case '÷': return divide(firstOperand, secondOperand);
        case '%': return remainder(firstOperand, secondOperand);

        default: alert("Something went wrong!");
                 resetCalculator();
    }
}

// Appends the current digit to the active operand based on the operandIndex flag.
function updateActiveOperand(operandIndex, currentDigit) {
    // In case of first operand
    if (!operandIndex)
    {
        firstDisplay.textContent += currentDigit;
        firstOperand += currentDigit;
    }
    // In case of second operand
    else
    {
        firstDisplay.textContent += currentDigit;
        secondOperand += currentDigit;
    }
}

function getDigit(digit) {

    // If user enters a number instead of operator immediately after operation result,
    // the calculator will be reset automatically.
    if (resetByDefault) {
        resetCalculator();
        resetByDefault = false;
    }
        
    // Prevent multiple leading zeroes
    if (firstOperand[0] === '0' && digit === '0') {
        return;
    }

    // Replace leading zero with non-zero digit unless its decimal of 0
    else if (firstOperand[0] === '0' && digit !== '0' && firstOperand[1] !== '.') {
        firstOperand = '';
        firstDisplay.textContent = firstOperand;
        updateActiveOperand(operandIndex, digit);
    }

    // Append digit otherwise
    else {
        updateActiveOperand(operandIndex, digit);
    }        

    return;
}

function getOperator(operator) {

    if (currentOperator !== '') getResult();
    
    const lastValue = firstDisplay.textContent.slice(-1);

    // Check to prevent consecutive entry of operators
    if (!checkOperatorValidity(operator, lastValue)) {
        return;
    }

    if (operator === '*') {
        currentOperator = '×'
    }
    else if (operator === '/') {
        currentOperator = '÷';
    }
    else {
        currentOperator = operator;
    }
        
    // Display the user's operator choice
    firstDisplay.textContent += currentOperator;

    // Use the operandIndex to point next operand after operator
    operandIndex = 1;

    resetByDefault = false;
}

function getResult() {
    
    // Prevent operation if operands or operator is incomplete.
    if (secondOperand.slice(-1) === '.' || !secondOperand || !currentOperator) return;

    // Compute the result of the operation
    const result = operate(Number(firstOperand), Number(secondOperand), currentOperator);
    
    // Round the result to 2 decimal places and store as firstOperand for further calculations.
    firstOperand = String(result.toFixed(2));

    // Clear the second operand to make space for next operand.
    secondOperand = '';

    // Print the result on the display.
    firstDisplay.textContent = firstOperand;

    currentOperator = '';

    resetByDefault = true;
       
}

function getdecimalDot(decimalPoint) {

    // Reset calculator if user tried to enter '.' immediately after result
    if (resetByDefault) {
        resetCalculator();
        resetByDefault = false;
    }

    // Check if there's decimal dot button in each operands before appending it.
    if (!operandIndex) {

        if (firstOperand.includes('.')) return;

        firstOperand += decimalPoint;
    }
    else {

        if (secondOperand.includes('.')) return;

        secondOperand += decimalPoint;
    }

    firstDisplay.textContent += decimalPoint;

}

function backSpace() {

    // In case of user backspaces operator
    if (calculatorOperators.includes(firstDisplay.textContent.slice(-1))) {
        firstDisplay.textContent = firstDisplay.textContent.slice(0, -1);
        currentOperator = '';
    }

    // In case of user backspaces first operand
    else if (!operandIndex) {
        firstOperand = firstOperand.slice(0, -1);
        firstDisplay.textContent = firstDisplay.textContent.slice(0, -1);
    }

    // In case of user backspaces second operand
    else {
        secondOperand = secondOperand.slice(0, -1);
        firstDisplay.textContent = firstDisplay.textContent.slice(0, -1);
    }

    // Calculator resets if user backspaces everything
    if (firstDisplay.textContent === '') {
        resetCalculator();
    }
}

// Resets the calculator
function resetCalculator() {
    firstOperand = '0';
    secondOperand = '';
    operandIndex = 0;
    currentOperator = '';
    firstDisplay.textContent = firstOperand;
}

/* EVENT LISTENERS */

// Number button click handler
numberButtons.forEach(button =>
    button.addEventListener('click', () => getDigit(button.value))
);


// Operator button click handler
operatorButtons.forEach(button => 
    button.addEventListener('click', () => getOperator(button.value))
);

// Equal-to button handler
equalToButton.addEventListener('click', getResult);

// Reset button handler
resetButton.addEventListener('click', resetCalculator);

// Decimal dot (.) button handler
decimalDotButton.addEventListener('click', () => getdecimalDot(decimalDotButton.value));

// Backspace (⌫) button handler
backSpaceButton.addEventListener('click', backSpace);

// Keyboard keys handler
document.addEventListener('keydown', (e) => {

    const keyPressed = e.key;

    // Shift + R resets the calculator
    if (e.shiftKey && keyPressed.toUpperCase() === 'R') return resetCalculator();

    // Handle digit keys (0 - 9)
    if (/^\d$/.test(keyPressed)) return getDigit(keyPressed);

    // Handle operator keys (+, -, *, /, %)
    if (calculatorOperators.includes(keyPressed)) return getOperator(keyPressed);

    // Handle dot (.) button
    if (keyPressed === '.') return getdecimalDot(keyPressed);

    // Handle equal (=) or Enter (↵) keys
    if (keyPressed === '='|| keyPressed === 'Enter') return getResult();
    
    // Handle backspace (←) key
    if (keyPressed === 'Backspace') return backSpace();
});


// Initialize display with first operand
firstDisplay.textContent = firstOperand;
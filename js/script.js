// Calculator 

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
function checkOperatorValidity(currentOperator, lastValue) {

    if (calculatorOperators.includes(currentOperator) && 
        calculatorOperators.includes(lastValue))
    {            
        return false;
    }

    return true;
}

// Appends the current digit to the active operand based on the operandIndex flag.
function updateActiveOperand(operandIndex, currentDigit) 
{
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

// Function that fetch operands and operator to operate
function operate(firstOperand, secondOperand, currentOperator) {
    switch(currentOperator) {

        case '+': return add(firstOperand, secondOperand);
        case '-': return subtract(firstOperand, secondOperand);
        case '×': return multiply(firstOperand, secondOperand);
        case '/': return divide(firstOperand, secondOperand);
        case '%': return remainder(firstOperand, secondOperand);

        default: alert("Something went wrong!");
                 resetCalculator();
    }
}

// Resets the calculator
function resetCalculator(){
    firstOperand = '0';
    secondOperand = '';
    operandIndex = 0;
    firstDisplay.textContent = firstOperand;
    decimalDot.disabled = false;
}


// DOM element references
const numberButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.non-numerical.operators');
const equalToButton = document.querySelector('.non-numerical.equal-to');
const resetButton = document.querySelector('.non-numerical.reset');
const decimalDot = document.querySelector('.non-numerical.decimal-point');
const backSpace = document.querySelector('.non-numerical.backspace');
const firstDisplay = document.querySelector('.display.display-1');


// Operators allowed
const calculatorOperators = ['+', '-', '×', '/', '%'];

// Variables to store and track operands before and after an operator
let firstOperand = '0';
let secondOperand = '';
let operandIndex = 0;

// Variabe to fetch the current operator choice of user
let currentOperator = '';

// Flag to determine if next input after result should reset the display.
let resetByDefault = false;

// Initialize display with first operand
firstDisplay.textContent = firstOperand;

// Number button click handler
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        // If user enters a number instead of operator immediately after operation result,
        // the calculator will be reset automatically.
        if (resetByDefault) {
            resetCalculator();
            resetByDefault = false;
        }

        const currentValue = button.value;
        
        // Prevent multiple leading zeroes
        if (firstOperand[0] === '0' && currentValue === '0') {
            return;
        }

        // Replace leading zero with non-zero digit
        else if (firstOperand[0] === '0' && currentValue !== '0') {
            firstOperand = '';
            firstDisplay.textContent = firstOperand;
            updateActiveOperand(operandIndex, currentValue);
        }

        // Append digit otherwise
        else {
            updateActiveOperand(operandIndex, currentValue);
        }        
        
    })

});


// Operator button click handler
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {

        currentOperator = button.value;

        const lastValue = firstDisplay.textContent.slice(-1);

        // Check to prevent consecutive entry of operators
        if (!checkOperatorValidity(currentOperator, lastValue))
        {
            return;
        }

        // Display the user's operator choice
        firstDisplay.textContent += currentOperator;

        // Use the operandIndex to point next operand after operator
        operandIndex = 1;

        // Enable decimal dot after operation
        decimalDot.disabled = false;

        resetByDefault = false;
    })
});

// Equal-to button handler
equalToButton.addEventListener('click', () => {

    // Fetch result from the operation of two operands, and
    // assign the result of operation to first operand for further operation.
    firstOperand = operate(Number(firstOperand), Number(secondOperand), currentOperator);

    // Clear the second operand to make space for next operand
    secondOperand = '';

    // Print the result on the display
    firstDisplay.textContent = firstOperand;

    resetByDefault = true;

    // Enable decimal dot after operator
    decimalDot.disabled = false;
});

// Reset button handler
resetButton.addEventListener('click', resetCalculator);

// Decimal dot (.) button handler
decimalDot.addEventListener('click', () => {
    
    firstDisplay.textContent += decimalDot.value;

    // Disable decimal dot after every once while entering an operand.
    if (!operandIndex) {
        firstOperand += decimalDot.value;
        decimalDot.disabled = true;
    }
    else {
        secondOperand += decimalDot.value;
        decimalDot.disabled = true;
    }
});

// Backspace (⌫) button handler
backSpace.addEventListener('click', () => {

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

});
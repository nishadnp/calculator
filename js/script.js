// Calculator 

function checkOperatorValidity(currentOperator, lastValue) {


    // Operators allowed
    const calculatorOperators = ['+', '-', '×', '/', '%'];

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
        firstOperand += currentDigit;
    }
    // In case of second operand
    else
    {
        secondOperand += currentDigit;
    }
}

function operate(firstOperand, secondOperand, currentOperator) {
    switch(currentOperator) {

        case '+': return firstOperand + secondOperand;
        case '-': return firstOperand - secondOperand;
        case '×': return firstOperand * secondOperand;
        case '/': return firstOperand / secondOperand;
        case '%': return firstOperand % secondOperand;

        default: alert("Something went wrong!");
    }
}

function resetCalculator(){
    firstOperand = '';
    secondOperand = '';
    operandIndex = 0;
    firstDisplay.textContent = 0;
    decimalDot.disabled = false;
}


// DOM element references
const numberButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.non-numerical.operators');
const equalToButton = document.querySelector('.non-numerical.equal-to');
const resetButton = document.querySelector('.non-numerical.reset');
const decimalDot = document.querySelector('.non-numerical.decimal-point');
const firstDisplay = document.querySelector('.display.display-1');

// Initialize display
firstDisplay.textContent = 0;

// Variables to store and track operands before and after an operator
let firstOperand = '';
let secondOperand = '';
let operandIndex = 0;

// Variabe to fetch the current operator choice of user
let currentOperator = '';

// Flag to determine if next input after result should reset the display.
let resetByDefault = 0;

// Number button click handler
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        // If user enters a number instead of operator immediately after operation result,
        // the calculator will be reset automatically.
        if (resetByDefault) {
            resetCalculator();
            resetByDefault = 0;
        }

        const currentValue = button.value;
        
        // Prevent multiple leading zeroes
        if (firstDisplay.textContent[0] === '0' && currentValue === '0') {
            return;
        }

        // Replace leading zero with non-zero digit
        else if (firstDisplay.textContent[0] === '0' && currentValue !== '0') {
            firstDisplay.textContent = currentValue;
        }

        // Append digit otherwise
        else {
            firstDisplay.textContent += currentValue;
        }        

        updateActiveOperand(operandIndex, currentValue);
        
    })

});


// Operator button click handler
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {

        const lastValue = firstDisplay.textContent.slice(-1);

        if (!checkOperatorValidity(button.value, lastValue))
        {
            return;
        }

        firstDisplay.textContent += button.value;

        currentOperator = button.value;

        operandIndex = 1;

        // Enable decimal dot after operation
        decimalDot.disabled = false;

        resetByDefault = 0;
    })
});

// Equal-to button handler
equalToButton.addEventListener('click', () => {

    // Fetch result from the operation of two operands
    const operationResult = operate(Number(firstOperand), Number(secondOperand), currentOperator);

    // Print the result on the display
    firstDisplay.textContent = operationResult;

    // Assign the result of operation to first operand for further operation
    firstOperand = operationResult.toString();
    // Clear the second operand to make space for next operand
    secondOperand = '';

    resetByDefault = 1;

    // Enable decimal dot after operator
    decimalDot.disabled = false;
});

// Reset button handler
resetButton.addEventListener('click', () => {
    resetCalculator();
});

// Decimal dot (.) button handler
decimalDot.addEventListener('click', () => {

    
    firstDisplay.textContent += decimalDot.value;

    // Disable decimal dot after every once while entering a number.
    if (!operandIndex) {
        firstOperand += decimalDot.value;
        decimalDot.disabled = true;
    }
    else {
        secondOperand += decimalDot.value;
        decimalDot.disabled = true;
    }
});
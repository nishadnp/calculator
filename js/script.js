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


// DOM element references
const numberButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.non-numerical.operators');
const firstDisplay = document.querySelector('.display.display-1');

// Initialize display
firstDisplay.textContent = 0;

// Variables to store and track operands before and after an operator
let firstOperand = '';
let secondOperand = '';
let operandIndex = 0;

// Number button click handler
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

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

        operandIndex = 1;
    })
});


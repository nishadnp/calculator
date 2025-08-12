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

/* function operate(firstNumber, secondNumber, givenOperator) {
    switch (givenOperator) 
    {
        case '+': 
            return firstNumber + secondNumber;

        case '-': 
            return firstNumber - secondNumber;
        
        case '×': 
            return firstNumber * secondNumber;

        case '/': 
            return firstNumber / secondNumber;

        case '%': 
            return firstNumber % secondNumber;
        
    }
}

*/

// DOM element references
const numberButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.non-numerical.operators');
const firstDisplay = document.querySelector('.display.display-1');

// Initialize display
firstDisplay.textContent = 0;



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

    })
});


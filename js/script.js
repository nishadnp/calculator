// Calculator 

function checkOperatorValidity(currentOperator, lastValue) {

    const calculatorOperators = ['+', '-', '×', '/', '%'];

    if (calculatorOperators.includes(currentOperator) && 
        calculatorOperators.includes(lastValue))
        {            
            return false;
        }

        return true;
}


const numberButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.non-numerical.operators');

const firstDisplay = document.querySelector('.display.display-1');
firstDisplay.textContent = 0;


// Button event for numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        const currentValue = button.value;
        
        if (firstDisplay.textContent[0] === '0' && currentValue === '0') {
            return;
        }
        else if (firstDisplay.textContent[0] === '0' && currentValue !== '0') {
            firstDisplay.textContent = '';
            firstDisplay.textContent = firstDisplay.textContent + currentValue;
            return;
        }
        
        firstDisplay.textContent += currentValue;
        
    })

});


// Button event for operators
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


// Calculator 

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
        const currentValue = button.value;

        firstDisplay.textContent += currentValue;

    })
});




/*
function checkOperatorValidity(currentOperator, lastOperator) {

    const calculatorOperators = ['+', '-', '×', '/', '%'];

    if (calculatorOperators.includes(currentOperator) && 
        calculatorOperators.includes(lastOperator))
        {            
            return false;
        }

        return true;

} 




*/
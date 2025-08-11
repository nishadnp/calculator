// Calculator 

const numberButtons = document.querySelectorAll('.numerical');
const operatorButtons = document.querySelectorAll('.non-numerical.operators');

const firstDisplay = document.querySelector('.display.display-1');



// Button event for numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        const currentValue = button.value;
        
        
        
        firstDisplay.textContent = firstDisplay.textContent + currentValue;
        
    })

});


// Button event for operators
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentValue = button.value;

        firstDisplay.textContent = firstDisplay.textContent + currentValue;

    })
});





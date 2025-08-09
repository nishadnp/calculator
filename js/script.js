// Calculator 


const buttons = document.querySelectorAll('.numerical, .non-numerical');
const firstDisplay = document.querySelector('.display.display-1');



buttons.forEach(button => {
    button.addEventListener('click', () => {
        firstDisplay.textContent = firstDisplay.textContent + button.value;
    })
});
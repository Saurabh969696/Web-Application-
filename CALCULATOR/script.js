const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('button');
let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.innerText;

        if (buttonText === 'ENTER') {
            try {
                const result = eval(expression.replace('x', '*').replace('÷', '/'));
                resultDisplay.innerText = result;
                expression = result.toString();
            } catch {
                resultDisplay.innerText = 'Error';
                expression = '';
            }
        } else if (buttonText === 'clear') {
            expression = '';
            expressionDisplay.innerText = '';
            resultDisplay.innerText = '';
        } else if (buttonText === 'del') {
            expression = expression.slice(0, -1);
            expressionDisplay.innerText = expression;
        } else {
            expression += buttonText;
            expressionDisplay.innerText = expression;
        }
    });
});
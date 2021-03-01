//Known issue:
// My parenthesis are treated as numbers and don't serve a function. I'm working on fixing.

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    };

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    };

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    };

    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
          this.calculate()
      };
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    };

    calculate() {
        let calculation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        switch (this.operation) {
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case '*':
                calculation = prev * current
                break
            case '÷':
                calculation = prev / current
                break
            case '%':
                calculation = prev % current
                break
            default:
                return 
        };
        this.currentOperand = calculation;
        this.operation = undefined;
        this.previousOperand = '';
    };

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    };
};

//Select all elements I need to manipulate. 
const numberButtons = document.querySelectorAll('.data-number');
const operationsButtons = document.querySelectorAll('.data-operation');
const equalsButton = document.querySelector('.data-equals');
const allClearButton = document.querySelector('.data-all-clear');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    });
});

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    });
});

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
});

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});


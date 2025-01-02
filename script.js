class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
      this.previousOperandElement = previousOperandElement;
      this.currentOperandElement = currentOperandElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      if (this.currentOperand === '0' && number !== '.') {
        this.currentOperand = number;
      } else {
        this.currentOperand = this.currentOperand + number;
      }
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '×':
          computation = prev * current;
          break;
        case '÷':
          if (current === 0) {
            this.currentOperand = 'Error';
            return;
          }
          computation = prev / current;
          break;
        case '^':
          computation = Math.pow(prev, current);
          break;
        default:
          return;
      }
      this.currentOperand = this.formatNumber(computation);
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    formatNumber(number) {
      if (isNaN(number)) return 'Error';
      if (!isFinite(number)) return 'Error';
      let result = number.toPrecision(12);
      result = parseFloat(result).toString();
      return result;
    }
  
    scientificOperation(operation) {
      const current = parseFloat(this.currentOperand);
      let result;
      if (isNaN(current)) return;
      
      if (operation === 'xʸ') {
        this.operation = '^';
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        return;
      }
      
      switch (operation) {
        case 'x²':
          result = Math.pow(current, 2);
          break;
        case '√':
          if (current < 0) {
            this.currentOperand = 'Error';
            return;
          }
          result = Math.sqrt(current);
          break;
        case '∛':
          result = Math.cbrt(current);
          break;
        case 'sin':
          result = Math.round(Math.sin(current * (Math.PI / 180)) * 1e10) / 1e10;
          break;
        case 'cos':
          result = Math.round(Math.cos(current * (Math.PI / 180)) * 1e10) / 1e10;
          break;
        case 'tan':
          if (current === 45) {
            result = 1;
          } else if (current === 0) {
            result = 0;
          } else if (current % 90 === 0 && current % 180 !== 0) {
            this.currentOperand = 'Error';
            return;
          } else {
            result = Math.round(Math.tan(current * (Math.PI / 180)) * 1e10) / 1e10;
          }
          break;
        case 'log':
          if (current <= 0) {
            this.currentOperand = 'Error';
            return;
          }
          result = Math.log10(current);
          break;
        default:
          return;
      }
      this.currentOperand = this.formatNumber(result);
    }
  
    convertToPercentage() {
      const current = parseFloat(this.currentOperand);
      if (isNaN(current)) return;
      this.currentOperand = this.formatNumber(current / 100);
    }
  
    toggleSign() {
      if (this.currentOperand === '0') return;
      this.currentOperand = this.formatNumber(parseFloat(this.currentOperand) * -1);
    }
  
    updateDisplay() {
      this.currentOperandElement.textContent = this.currentOperand;
      if (this.operation != null) {
        if (this.operation === '^') {
          this.previousOperandElement.textContent = `${this.previousOperand}^`;
        } else {
          this.previousOperandElement.textContent = `${this.previousOperand} ${this.operation}`;
        }
      } else {
        this.previousOperandElement.textContent = '';
      }
    }
  }
  
  const previousOperandElement = document.querySelector('.previous-operand');
  const currentOperandElement = document.querySelector('.current-operand');
  const calculator = new Calculator(previousOperandElement, currentOperandElement);
  
  document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.textContent);
      calculator.updateDisplay();
    });
  });
  
  document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.textContent);
      calculator.updateDisplay();
    });
  });
  
  document.querySelectorAll('.scientific').forEach(button => {
    button.addEventListener('click', () => {
      calculator.scientificOperation(button.dataset.operation || button.textContent);
      calculator.updateDisplay();
    });
  });
  
  document.querySelector('.equals').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  document.querySelector('.clear').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  document.querySelector('.percentage').addEventListener('click', () => {
    calculator.convertToPercentage();
    calculator.updateDisplay();
  });
  
  document.querySelector('.plusMinus').addEventListener('click', () => {
    calculator.toggleSign();
    calculator.updateDisplay();
  });
  
  document.querySelector('.expand').addEventListener('click', () => {
    document.querySelector('.calculator').classList.toggle('expanded');
  });
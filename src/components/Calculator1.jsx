import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Calculator1.css';

const Calculator1 = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator && !waitingForOperand) {
      const currentValue = prevValue || 0;
      let newValue = 0;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          if (inputValue !== 0) {
            newValue = currentValue / inputValue;
          } else {
            setDisplay('Error');
            setPrevValue(null);
            setOperator(null);
            setWaitingForOperand(true);
            return;
          }
          break;
        case '%':
          newValue = currentValue % inputValue;
          break;
        default:
          break;
      }

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    if (nextOperator === '=') {
      setPrevValue(null);
      setOperator(null);
    } else {
      setOperator(nextOperator);
    }
    
    setWaitingForOperand(true);
  };

  return (
    <div> Vishal Patel</div>
    <div className="calculator1-container">
      <h1>Calculator - Style 1</h1>
      <div className="calculator1">
        <div className="calculator1-display">{display}</div>
        <div className="calculator1-keypad">
          <div className="calculator1-row">
            <button onClick={clearAll} className="calculator1-key calculator1-key-clear">AC</button>
            <button onClick={() => setDisplay(display.charAt(0) === '-' ? display.substr(1) : '-' + display)} className="calculator1-key calculator1-key-sign">+/-</button>
            <button onClick={() => performOperation('%')} className="calculator1-key calculator1-key-percent">%</button>
            <button onClick={() => performOperation('÷')} className="calculator1-key calculator1-key-operator">÷</button>
          </div>
          <div className="calculator1-row">
            <button onClick={() => inputDigit(7)} className="calculator1-key">7</button>
            <button onClick={() => inputDigit(8)} className="calculator1-key">8</button>
            <button onClick={() => inputDigit(9)} className="calculator1-key">9</button>
            <button onClick={() => performOperation('×')} className="calculator1-key calculator1-key-operator">×</button>
          </div>
          <div className="calculator1-row">
            <button onClick={() => inputDigit(4)} className="calculator1-key">4</button>
            <button onClick={() => inputDigit(5)} className="calculator1-key">5</button>
            <button onClick={() => inputDigit(6)} className="calculator1-key">6</button>
            <button onClick={() => performOperation('-')} className="calculator1-key calculator1-key-operator">-</button>
          </div>
          <div className="calculator1-row">
            <button onClick={() => inputDigit(1)} className="calculator1-key">1</button>
            <button onClick={() => inputDigit(2)} className="calculator1-key">2</button>
            <button onClick={() => inputDigit(3)} className="calculator1-key">3</button>
            <button onClick={() => performOperation('+')} className="calculator1-key calculator1-key-operator">+</button>
          </div>
          <div className="calculator1-row">
            <button onClick={() => inputDigit(0)} className="calculator1-key calculator1-key-zero">0</button>
            <button onClick={inputDecimal} className="calculator1-key">.</button>
            <button onClick={() => performOperation('=')} className="calculator1-key calculator1-key-operator">=</button>
          </div>
        </div>
        <div className="navigation-button">
          <Link to="/todo" className="next-page-btn">Go to Todo App</Link>
        </div>
      </div>
    </div>
  );
};

export default Calculator1; 
